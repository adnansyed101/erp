import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EmployeeWithId } from '@/lib/types/employee.types'
import { LogIn, LogOut, Clock, ChevronDownIcon } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SearchDropdown } from './search-dropdown'
import { Attendance } from '@/lib/types/attendance.type'
import { toast } from 'sonner'
import { formatTime } from '@/lib/utils'
import { useState } from 'react'

const attendanceSchema = z.object({
  employeeId: z.string().min(1, 'Employee name is required'),
  status: z.enum(['In', 'Out']),
  checkInDate: z.date(),
  checkInTime: z.string().min(1, 'Login time is required'),
  preferableInTime: z.string(),
})

type AttendanceFormData = z.infer<typeof attendanceSchema>

type ResponseType = {
  success: boolean
  message: string
  data: EmployeeWithId[]
}

export function ManualAttendanceForm() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  // Create the form
  const form = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      employeeId: '',
      status: 'In',
      checkInDate: new Date(),
      checkInTime: format(new Date(), 'HH:mm'),
      preferableInTime: '10:00',
    },
  })

  // Get the attendances
  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees-search', search],
    queryFn: async (): Promise<ResponseType> => {
      const response = await fetch(
        `/api/hr-management/employees?limit=5&search=${search}`,
      )
      if (!response.ok) throw new Error('Failed to fetch employees')
      return response.json()
    },
  })

  // Create new attendance
  const { mutate } = useMutation({
    mutationKey: ['create-attendance'],
    mutationFn: async (newAttendance: Attendance) => {
      const response = await fetch(
        `/api/hr-management/attendance?employeeId=${
          form.getValues().employeeId
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAttendance),
        },
      )
      if (!response.ok) {
        return toast.error('Error occured in creating employee.')
      }

      return response.json()
    },
    onSuccess: (data: ResponseType) => {
      if (data.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['attendances-list'],
        })
        return toast.success(data.message)
      } else if (data.data === null && data.success === false) {
        return toast.error(data.message)
      } else {
        return toast.error(data.message)
      }
    },
    onError: (error) => {
      alert(`Error creating attendance: ${error.message}`)
    },
  })

  // Handle submit
  const onSubmit = (values: AttendanceFormData) => {
    const checkInTime = formatTime(values.checkInTime, values.checkInDate)

    const preferableTime = formatTime(
      values.preferableInTime,
      values.checkInDate,
    )

    return mutate({
      checkIn: checkInTime,
      preferableInTime: preferableTime,
      employeeId: values.employeeId,
      status: values.status,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="secondary" className="bg-slate-600 text-white gap-2">
            <LogIn className="w-4 h-4" /> Log In Time
          </Button>
          <Button className="bg-green-500 text-white gap-2">
            <LogOut className="w-4 h-4" /> Log Out Time
          </Button>
          <Button className="bg-cyan-500 text-white gap-2">
            <Clock className="w-4 h-4" /> Both Time
          </Button>
        </div>

        {/* Employee Name */}
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Name</FormLabel>
              <FormControl>
                <SearchDropdown
                  items={employees?.data ? employees.data : []}
                  onSelect={(emp) => field.onChange(emp.id)}
                  search={search}
                  setSearch={setSearch}
                  isLoading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Login Date */}
        <FormField
          control={form.control}
          name="checkInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {field.value
                      ? field.value.toLocaleDateString()
                      : 'Select date'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    disabled
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Login Time */}
        <FormField
          control={form.control}
          name="checkInTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferable In Time */}
        <FormField
          control={form.control}
          name="preferableInTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferable In Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" className="bg-green-500 text-white gap-2">
            💾 Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
