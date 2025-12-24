'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Download, Printer } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AttendanceWithEmployeeData } from '@/lib/types/attendance.type'
import { format } from 'date-fns'
import { useSearch } from '@tanstack/react-router'
import Pagination from '@/components/shared/pagination'
import { toast } from 'sonner'
import { formatId } from '@/lib/utils'

type ResponseType = {
  success: boolean
  message: string
  totalPages: number
  data: AttendanceWithEmployeeData[]
}

export function AttendanceTable() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10)
  const queryClient = useQueryClient()
  const { page } = useSearch({
    from: '/hr-management/attendance/manual-attendance',
  })

  // Get the employees
  const {
    data: attendances,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['attendances-list', limit, page],
    queryFn: async (): Promise<ResponseType> => {
      const response = await fetch(
        `/api/hr-management/attendance?limit=${limit}&page=${page}`,
      )
      if (!response.ok) throw new Error('Failed to fetch attendances')
      return response.json()
    },
  })

  // Create new attendance
  const { mutate } = useMutation({
    mutationKey: ['employee-checkout'],
    mutationFn: async (
      updateAttendance: Partial<AttendanceWithEmployeeData>,
    ) => {
      const response = await fetch(
        `/api/hr-management/attendance?id=${updateAttendance.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateAttendance),
        },
      )
      if (!response.ok) {
        return toast.error('Error occured in checking out employee.')
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['attendances-list'] })
      return toast.success(data.message)
    },
    onError: (error) => {
      alert(`Error in checking out attendance: ${error.message}`)
    },
  })

  const handleExcel = () => {
    console.log('Export to Excel')
  }

  const handleCSV = () => {
    console.log('Export to CSV')
  }

  const handlePrint = () => {
    window.print()
  }

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleExcel}
            variant="outline"
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-white border-none gap-1"
          >
            <FileText className="w-4 h-4" />
            Excel
          </Button>
          <Button
            onClick={handleCSV}
            variant="outline"
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white border-none gap-1"
          >
            <Download className="w-4 h-4" />
            CSV
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-white border-none gap-1"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>

        <div>
          <span className="text-sm text-gray-600 mr-2">Search:</span>
          <Input
            type="text"
            placeholder="Search..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Employee Id</TableHead>
              <TableHead className="font-semibold">Employee Name</TableHead>
              <TableHead className="font-semibold">Designation</TableHead>
              <TableHead className="font-semibold">Office Email</TableHead>
              <TableHead className="font-semibold">Login Date</TableHead>
              <TableHead className="font-semibold">Login Time</TableHead>
              <TableHead className="font-semibold">Out Time</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendances?.data.length === 0 || isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              attendances?.data.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{formatId(attendance.id)}</TableCell>
                  <TableCell>
                    {attendance.employee.personalInformation.fullName}
                  </TableCell>
                  <TableCell>
                    {attendance.employee.personalInformation.currentDesignation}
                  </TableCell>
                  <TableCell>
                    {attendance.employee.personalInformation.officeEmail}
                  </TableCell>
                  <TableCell>
                    {format(attendance.checkIn, 'dd/mm/yyyy')}
                  </TableCell>
                  <TableCell>{format(attendance.checkIn, 'hh:mm a')}</TableCell>
                  <TableCell>
                    {attendance.checkOut
                      ? format(attendance.checkOut, 'hh:mm aa')
                      : 'In'}
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={attendance.status === 'Out'}
                      onClick={() => {
                        mutate({
                          id: attendance.id,
                          checkOut: new Date(),
                          status: 'Out',
                        })
                      }}
                    >
                      Check Out
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        {(attendances?.totalPages ?? 0) > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={attendances?.totalPages ?? 0}
          />
        )}
      </div>
    </div>
  )
}
