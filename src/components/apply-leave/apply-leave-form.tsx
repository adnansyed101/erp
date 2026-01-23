import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { applyLeaveSchema } from '@/lib/validators/leave.validator'
import type { ApplyLeave } from '@/lib/types/leave.types'
import { addDays, differenceInDays, format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { EmployeeWithId } from '@/lib/types/employee.types'
import { SearchDropdown } from '../shared/search-dropdown'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useDebounce from '@/hooks/useDebouncer'
import { toast } from 'sonner'
import { useCustomUserStore } from '@/stores/user.store'

type ResponseType = {
  success: boolean
  message: string
  data: EmployeeWithId[]
}

export function ApplyLeaveForm() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const queryClient = useQueryClient()
  const customUserData = useCustomUserStore((data) => data.userData)

  const form = useForm<ApplyLeave>({
    resolver: zodResolver(applyLeaveSchema),
    defaultValues: {
      leaveType: 'casual',
      leaveFrom: new Date(),
      leaveTo: addDays(new Date(), 1),
      totalDays: '1',
      purposeOfLeave: '',
      addressDuringLeave: '',
      emergencyContactNumber: '',
      approved: 'pending',
      approverId: '',
      employeeId: customUserData.employeeId,
    },
  })

  // Get the attendances
  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees-search', debouncedSearch],
    queryFn: async (): Promise<ResponseType> => {
      const response = await fetch(
        `/api/hr-management/employees?limit=5&search=${debouncedSearch}`,
      )
      if (!response.ok) throw new Error('Failed to fetch employees')
      return response.json()
    },
  })

  const { mutate } = useMutation({
    mutationKey: ['apply-leave'],
    mutationFn: async (newLeave: ApplyLeave) => {
      const response = await fetch('/api/hr-management/leave-management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeave),
      })
      if (!response.ok) {
        throw new Error('Failed to apply leave')
      }
      return response.json()
    },
    onSuccess: (data: ResponseType) => {
      if (data.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['leaves-list'],
        })
        return toast.success(data.message)
      } else if (data.data === null && data.success === false) {
        return toast.error(data.message)
      } else {
        return toast.error(data.message)
      }
    },
  })

  const onSubmit = async (values: ApplyLeave) => {
    const payload: ApplyLeave = {
      ...values,
      totalDays: differenceInDays(
        form.watch('leaveTo'),
        form.watch('leaveFrom'),
      ).toString(),
    }
    return mutate(payload)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">LEAVE INFO</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Left Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type of Leave<span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select One" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="casual">Casual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="earned">Earned Leave</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leaveFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Leave From<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? format(field.value, 'PP')
                              : 'Select date'}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            showOutsideDays
                            disabled={{ before: new Date() }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leaveTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Leave To<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? format(field.value, 'PP')
                              : 'Select date'}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            showOutsideDays
                            disabled={{ before: addDays(new Date(), 1) }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalDays"
                render={() => (
                  <FormItem>
                    <FormLabel>Total Days</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Total Days"
                        disabled
                        value={differenceInDays(
                          form.watch('leaveTo'),
                          form.watch('leaveFrom'),
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purposeOfLeave"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose Of Leave</FormLabel>
                    <FormControl>
                      <Input placeholder="Purpose" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressDuringLeave"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address During Leave</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Emergency Contact Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="approverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reliever's Employee Name</FormLabel>
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
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
