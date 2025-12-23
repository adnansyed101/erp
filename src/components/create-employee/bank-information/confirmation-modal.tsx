import { useEmployeeStore } from '@/stores/employee.store'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Employee } from '@/lib/types/employee.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

type ConfirmationModalProps = {
  setIsConfirmed: Dispatch<SetStateAction<boolean>>
  resetForm: () => void
}

const ConfirmationModal = ({
  setIsConfirmed,
  resetForm,
}: ConfirmationModalProps) => {
  const employeeData = useEmployeeStore((state) => state.formData)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationKey: ['employees'],
    mutationFn: async (newEmployee: Employee) => {
      const response = await fetch(`/api/hr-management/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      })
      if (!response.ok) {
        return toast.error('Error occured in creating employee.')
      }

      return response
    },
    onSuccess: () => {
      // Invalidate and refetch queries after a successful mutation
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee created')
    },
    onError: (error) => {
      alert(`Error creating post: ${error.message}`)
    },
  })

  const handleContinue = async () => {
    mutate(employeeData)

    toast.success(`Employee Created Successfully.`)

    resetForm()
    useEmployeeStore.persist.clearStorage()
    useEmployeeStore.setState(useEmployeeStore.getInitialState())
    setIsConfirmed(false)

    return navigate({ to: '/hr-management/employee-list' })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Submit Data</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deleteyour
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationModal
