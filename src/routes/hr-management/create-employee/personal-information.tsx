import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import CreateEmployeeSteps from '@/components/create-employee/create-employee-steps'
import { PersonalInformation } from '@/lib/types/employee.types'
import { useEmployeeStore } from '@/stores/employee.store'
import { Input } from '@/components/ui/input'
import { Image } from '@unpic/react'
import { PersonalInformationSchema } from '@/lib/validators/employee.validator'

export const Route = createFileRoute(
  '/hr-management/create-employee/personal-information',
)({
  component: PersonalInformationPage,
  notFoundComponent: () => <div>Personal Information Not Found</div>,
})

function PersonalInformationPage() {
  const naviagte = useNavigate()

  const employeeData = useEmployeeStore(
    (state) => state.formData.personalInformation,
  )
  const updateFormData = useEmployeeStore((state) => state.updateFormData)

  // Form Data
  const form = useForm<PersonalInformation>({
    resolver: zodResolver(PersonalInformationSchema),
    defaultValues: {
      fullName: employeeData.fullName || '',
      image: employeeData.image || null,
      imgUrl: null,
      officeEmail: employeeData.officeEmail || '',
      personalEmail: employeeData.personalEmail || '',
      officeNumber: employeeData.officeNumber || '',
      personalNumber: employeeData.personalNumber || '',
      employeeType: employeeData.employeeType || '',
      employeeStatus: employeeData.employeeStatus || '',
      gender: employeeData.gender || 'Male',
      nationality: employeeData.nationality || '',
      religion: employeeData.religion || '',
      joiningDesignation: employeeData.joiningDesignation || '',
      currentDesignation: employeeData.currentDesignation || '',
      dateOfBirth: employeeData.dateOfBirth || new Date(),
      dateOfConfirmation: employeeData.dateOfConfirmation || new Date(),
      disability: employeeData.disability || false,
    },
  })

  const onSubmit = (data: PersonalInformation) => {
    updateFormData('personalInformation', data)

    return naviagte({
      to: '/hr-management/create-employee/additional-information',
    })
  }

  const image = form.watch('image')

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={1} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Personal Information
        </CardTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Full Name Input */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="officeEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personalEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@personal.com"
                        {...field}
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
                name="officeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personalNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="employeeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
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
                          <SelectValue placeholder="Select gender" />
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
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Bangladesh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="islam">Islam</SelectItem>
                        <SelectItem value="hinduism">Hinduism</SelectItem>
                        <SelectItem value="christianity">
                          Christianity
                        </SelectItem>
                        <SelectItem value="buddhism">Buddhism</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                name="joiningDesignation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joining Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentDesignation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Lead Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                name="dateOfConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Confirmation</FormLabel>
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
            </div>
            <div className="upload-field flex flex-col md:flex-row gap-5">
              {/* Images */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Image</FormLabel>
                    <Card>
                      <CardContent className="space-y-2 mt-2 min-h-48">
                        <div className="flex-start space-x-2">
                          {image ? (
                            <div className="flex flex-col gap-2 items-start">
                              <Image
                                src={URL.createObjectURL(image)}
                                alt="Employee Image"
                                className="w-40 h-40 object-cover object-center rounded-sm "
                                width={100}
                                height={100}
                              />
                              <Button
                                size="sm"
                                onClick={() => form.setValue('image', null)}
                              >
                                Remove Image
                              </Button>
                            </div>
                          ) : (
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  field.onChange(file)
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                              />
                            </FormControl>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="disability"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Has Disability</FormLabel>
                </FormItem>
              )}
            />
            {/* Navigation Buttons */}
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
