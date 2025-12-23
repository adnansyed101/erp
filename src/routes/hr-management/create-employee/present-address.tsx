import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEmployeeStore } from '@/stores/employee.store'
import { PermanentAddress } from '@/lib/types/employee.types'
import { PermanentAddressSchema } from '@/lib/validators/employee.validator'
import CreateEmployeeSteps from '@/components/create-employee/create-employee-steps'
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
import { Button } from '@/components/ui/button'

export const Route = createFileRoute(
  '/hr-management/create-employee/present-address',
)({
  component: PresentAddressPage,
})

function PresentAddressPage() {
  const router = useNavigate()
  const employeeData = useEmployeeStore(
    (state) => state.formData.presentAddress,
  )
  const updateFormData = useEmployeeStore((state) => state.updateFormData)

  const form = useForm<PermanentAddress>({
    resolver: zodResolver(PermanentAddressSchema),
    defaultValues: {
      division: employeeData.division || '',
      district: employeeData.district || '',
      upazilaOrThana: employeeData.upazilaOrThana || '',
      postOffice: employeeData.postOffice || '',
      postCode: employeeData.postCode || '',
      block: employeeData.block || '',
      houseNoOrVillage: employeeData.houseNoOrVillage || '',
      roadNo: employeeData.roadNo || '',
    },
  })

  const onSubmit = (data: PermanentAddress) => {
    updateFormData('presentAddress', data)

    return router({ to: '/hr-management/create-employee/spouse-information' })
  }
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={4} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Present Address
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="upazilaOrThana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upazila/Thana</FormLabel>
                    <FormControl>
                      <Input placeholder="Mirpur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postOffice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Office</FormLabel>
                    <FormControl>
                      <Input placeholder="Mirpur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder="1216" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="houseNoOrVillage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House No./Village</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="roadNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Road No. (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Road 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Block (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
