'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FileText, Download, Printer } from 'lucide-react'
import { useState } from 'react'

export interface LeaveRecord {
  id: number
  employeeName: string
  leaveType: string
  leaveFrom: string
  leaveTo: string
  totalDays: number
  remarks: string
  status: 'On Approval' | 'Approved' | 'Rejected'
}

const sampleData: LeaveRecord[] = [
  {
    id: 1,
    employeeName: 'MD. JALAL UDDIN SHAHALAL',
    leaveType: 'Sick Leave',
    leaveFrom: '09-Jul-2025',
    leaveTo: '09-Jul-2025',
    totalDays: 1.0,
    remarks: 'Sick leave',
    status: 'On Approval',
  },
  {
    id: 2,
    employeeName: 'MD. JALAL UDDIN SHAHALAL',
    leaveType: 'Sick Leave',
    leaveFrom: '24-Jun-2025',
    leaveTo: '24-Jun-2025',
    totalDays: 1.0,
    remarks: 'leave apply to see Doctor and medical',
    status: 'On Approval',
  },
  {
    id: 3,
    employeeName: 'MD. JALAL UDDIN SHAHALAL',
    leaveType: 'Sick Leave',
    leaveFrom: '19-Jan-2025',
    leaveTo: '19-Jan-2025',
    totalDays: 1.0,
    remarks: '',
    status: 'Approved',
  },
  {
    id: 4,
    employeeName: 'MD. JALAL UDDIN SHAHALAL',
    leaveType: 'Sick Leave',
    leaveFrom: '05-Nov-2024',
    leaveTo: '05-Nov-2024',
    totalDays: 1.0,
    remarks: 'Cold fever & weekness suddenly',
    status: 'Approved',
  },
  {
    id: 5,
    employeeName: 'MD. JALAL UDDIN SHAHALAL',
    leaveType: 'Sick Leave',
    leaveFrom: '23-Oct-2024',
    leaveTo: '23-Oct-2024',
    totalDays: 1.0,
    remarks: 'Sick leave due to reason of digestion and weekness suddenly s',
    status: 'Approved',
  },
]

export function LeaveRegisterTable() {
  const [pageSize, setPageSize] = useState('10')
  const [searchTerm, setSearchTerm] = useState('')

  const statusColors = {
    'On Approval': 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  }

  const filteredData = sampleData.filter((record) =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leave Register</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                variant="default"
              >
                <FileText className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                variant="default"
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                variant="default"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>

            <div>
              <Input
                type="text"
                placeholder="Search:"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-semibold">SL</TableHead>
                  <TableHead className="font-semibold">Employee Name</TableHead>
                  <TableHead className="font-semibold">Type of Leave</TableHead>
                  <TableHead className="font-semibold">Leave from</TableHead>
                  <TableHead className="font-semibold">Leave To</TableHead>
                  <TableHead className="font-semibold">Total Days</TableHead>
                  <TableHead className="font-semibold">Leave Remarks</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-gray-50">
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.leaveType}</TableCell>
                      <TableCell>{record.leaveFrom}</TableCell>
                      <TableCell>{record.leaveTo}</TableCell>
                      <TableCell>{record.totalDays}</TableCell>
                      <TableCell className="text-xs">
                        {record.remarks}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                            statusColors[record.status]
                          }`}
                        >
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell className='space-x-2'>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No data available in table
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing 1 to{' '}
              {Math.min(filteredData.length, Number.parseInt(pageSize))} of{' '}
              {filteredData.length} entries
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
