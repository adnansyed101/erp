import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { applyLeaveSchema } from '@/lib/validators/leave.validator'
import type { ApplyLeave } from '@/lib/types/leave.types'
import { addDays, differenceInDays, format, isAfter } from 'date-fns'
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
      leaveFrom: addDays(new Date(), 2),
      leaveTo: addDays(new Date(), 3),
      totalDays: 1,
      purposeOfLeave: '',
      addressDuringLeave: '',
      emergencyContactNumber: '',
      approved: 'pending',
      approverId: '',
      employeeId: customUserData.employeeId,
    },
  })

  // Get the Employees
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
    mutationFn: async (payload: ApplyLeave) => {
      const response = await fetch('/api/hr-management/leave-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Failed to apply leave')
      return response.json()
    },
    onSuccess: (data: ResponseType) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['leaves-list'] })
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    },
  })

  const onSubmit = (values: ApplyLeave) => {
    if (isAfter(values.leaveFrom, values.leaveTo))
      return toast.error('Leave From cannot come after leave to.')

    const payload: ApplyLeave = {
      ...values,
      totalDays: differenceInDays(values.leaveTo, values.leaveFrom),
    }

    return mutate(payload)
    // return console.log(payload)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">LEAVE INFO</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Leave Type */}
            <Controller
              name="leaveType"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Type of Leave <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="earned">Earned Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Leave From */}
            <Controller
              name="leaveFrom"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Leave From <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {format(field.value, 'PP')}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: addDays(new Date(), 2) }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Leave To */}
            <Controller
              name="leaveTo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Leave To <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {format(field.value, 'PP')}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: addDays(new Date(), 3) }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Total Days (Computed) */}
            <Field>
              <FieldLabel>Total Days</FieldLabel>

              <Input
                disabled
                value={
                  differenceInDays(
                    form.watch('leaveTo'),
                    form.watch('leaveFrom'),
                  ) <= 0
                    ? 0
                    : differenceInDays(
                        form.watch('leaveTo'),
                        form.watch('leaveFrom'),
                      )
                }
              />
            </Field>

            {/* Purpose */}
            <Controller
              name="purposeOfLeave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Purpose Of Leave</FieldLabel>

                  <Input placeholder="Purpose" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Address */}
            <Controller
              name="addressDuringLeave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Address During Leave</FieldLabel>

                  <Input placeholder="Address" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Emergency Contact */}
            <Controller
              name="emergencyContactNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Emergency Contact Number</FieldLabel>

                  <Input placeholder="Emergency Contact Number" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Approver */}
          <Controller
            name="approverId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Reliever's Employee Name</FieldLabel>
                <SearchDropdown
                  items={employees?.data ?? []}
                  isLoading={isLoading}
                  search={search}
                  setSearch={setSearch}
                  onSelect={(emp) => field.onChange(emp.id)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
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
      </CardContent>
    </Card>
  )
}
