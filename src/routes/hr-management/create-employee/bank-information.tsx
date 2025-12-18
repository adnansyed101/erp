import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { BankInformationSchema } from '@/lib/validators/employee.validator'
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
import { useEmployeeStore } from '@/stores/employee.store'
import { toast } from 'sonner'
import { BankInformation } from '@/lib/types/employee.types'
import ConfirmationModal from '@/components/create-employee/bank-information/confirmation-modal'
import { useState } from 'react'

export const Route = createFileRoute(
  '/hr-management/create-employee/bank-information',
)({
  component: BankInformationPage,
})

function BankInformationPage() {
  const [isConfirmed, setIsConfirmed] = useState(false)

  const employeeInformation = useEmployeeStore(
    (state) => state.formData.bankInformation,
  )
  const updateFormData = useEmployeeStore((state) => state.updateFormData)

  const form = useForm<BankInformation>({
    resolver: zodResolver(BankInformationSchema),
    defaultValues: {
      bankName: employeeInformation.bankName || '',
      branchName: employeeInformation.branchName || '',
      accountNumber: employeeInformation.accountNumber || '',
      walletType: employeeInformation.walletType || '',
      walletNumber: employeeInformation.walletNumber || '',
    },
  })

  const onSubmit = (data: BankInformation) => {
    updateFormData('bankInformation', data)

    return setIsConfirmed(true)
  }

  const handleResetButton = () => {
    return toast.success('Data is cleared.')
  }
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CreateEmployeeSteps current={7} />
      <Card className="px-4 flex-1">
        <CardTitle className="text-2xl font-semibold">
          Bank Information
        </CardTitle>
        <Form {...form}>
          {/* Put (e) => console.log(e) in form not working */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Bank Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="branchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Account Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="walletType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Type (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select wallet type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bkash">bKash</SelectItem>
                        <SelectItem value="nagad">Nagad</SelectItem>
                        <SelectItem value="rocket">Rocket</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="walletNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Wallet Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-x-2">
              {isConfirmed ? (
                <ConfirmationModal
                  setIsConfirmed={setIsConfirmed}
                  resetForm={form.reset}
                />
              ) : (
                <Button type="submit">Confirm</Button>
              )}
              <Button
                type="button"
                variant="destructive"
                onClick={handleResetButton}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
