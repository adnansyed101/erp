import { createFileRoute } from '@tanstack/react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { SpouseInformationSchema } from '@/lib/validators/employee.validator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardTitle } from '@/components/ui/card'
import CreateEmployeeSteps from '@/components/create-employee/create-employee-steps'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useEmployeeStore } from '@/stores/employee.store'
import { SpouseInformation } from '@/lib/types/employee.types'

export const Route = createFileRoute(
  '/hr-management/create-employee/spouse-information',
)({
  component: SpouseInformationPage,
})

function SpouseInformationPage() {
  const navigate = useNavigate()
  const isSingle = useEmployeeStore(
    (state) => state.formData.additionalInformation.maritalStatus,
  )
  const employeeData = useEmployeeStore(
    (state) => state.formData.spouseInformation,
  )

  const updateFormData = useEmployeeStore((state) => state.updateFormData)
  const form = useForm<SpouseInformation>({
    resolver: zodResolver(SpouseInformationSchema),
    defaultValues: {
      fullName: employeeData?.fullName || '',
      dateOfBirth: employeeData?.dateOfBirth || new Date(),
      gender: employeeData?.gender || 'Female',
      occupation: employeeData?.occupation || '',
      nid: employeeData?.nid || '',
      mobileNumber: employeeData?.mobileNumber || '',
      email: employeeData?.email || '',
    },
  })

  if (isSingle === 'Single') {
    return navigate({ to: '/hr-management/create-employee/emergency-contact' })
  }

  const onSubmit = (data: SpouseInformation) => {
    updateFormData('spouseInformation', data)

    return navigate({ to: '/hr-management/create-employee/emergency-contact' })
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={5} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Spouse Information
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Spouse full name"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Male" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Job title"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="National ID"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+880"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="spouse@email.com"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
