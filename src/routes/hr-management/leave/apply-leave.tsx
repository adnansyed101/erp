import { ApplyLeaveForm } from '@/components/apply-leave/apply-leave-form'
import { ApprovalMatrixPanel } from '@/components/apply-leave/approval-matrix-panel'
import { LeaveBalancePanel } from '@/components/apply-leave/leave-balance-panel'
import { LeaveRegisterTable } from '@/components/apply-leave/leave-register-table'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Employee } from '@/lib/types/employee.types'
import { authClient } from '@/lib/auth-cilent'
import { authMiddleware } from '@/middleware/auth'
import DefaultLoadingComponent from '@/components/shared/default-loading-component'

export const Route = createFileRoute('/hr-management/leave/apply-leave')({
  server: {
    middleware: [authMiddleware],
  },
  component: ApplyLeavePage,
})

function ApplyLeavePage() {
  const approverInfo = {
    name: 'MD. JAFAR IQBAL',
    designation: 'Managing Director & CEO',
  }

  const { data: session } = authClient.useSession()

  const {
    data: employee,
    isPending,
    error,
  } = useQuery({
    queryKey: ['employee-leave-search'],
    queryFn: async (): Promise<{
      success: boolean
      message: string
      data: Employee
    }> => {
      const response = await fetch(
        `/api/hr-management/employee/${session?.user.id}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch employee by id.')
      }

      return response.json()
    },
    enabled: !!session?.user.id,
  })

  if (error) return 'An error has occurred: ' + error.message

  if (isPending) {
    return <DefaultLoadingComponent />
  }

  return (
    <main>
      {/* Header */}
      <h1 className="text-4xl font-bold text-foreground mb-4">Apply Leave</h1>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Form and Info Panels */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ApplyLeaveForm />
          </div>
          <div className="space-y-6">
            <LeaveBalancePanel leaves={employee.data.remainingLeave} />
            <ApprovalMatrixPanel approver={approverInfo} />
          </div>
        </div>

        {/* Leave Register Table */}
        <LeaveRegisterTable />
      </div>
    </main>
  )
}
