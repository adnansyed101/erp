import { ApplyLeaveForm } from '@/components/apply-leave/apply-leave-form'
import { ApprovalMatrixPanel } from '@/components/apply-leave/approval-matrix-panel'
import { LeaveBalancePanel } from '@/components/apply-leave/leave-balance-panel'
import { LeaveRegisterTable } from '@/components/apply-leave/leave-register-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hr-management/leave/apply-leave')({
  component: ApplyLeavePage,
})

function ApplyLeavePage() {
  const leaveBalances = [
    { leaveType: 'Casual Leave', yearlyLeave: 14.0, taken: 0.0, balance: 14.0 },
    { leaveType: 'Sick Leave', yearlyLeave: 10.0, taken: 1.0, balance: 9.0 },
  ]

  const approverInfo = {
    name: 'MD. JAFAR IQBAL',
    designation: 'Managing Director & CEO',
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
            <LeaveBalancePanel leaves={leaveBalances} />
            <ApprovalMatrixPanel approver={approverInfo} />
          </div>
        </div>

        {/* Leave Register Table */}
        <LeaveRegisterTable />
      </div>
    </main>
  )
}
