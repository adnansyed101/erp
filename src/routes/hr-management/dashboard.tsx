import { StatCard } from '@/components/hr-dashboard/stat-card'

import { Users, Clock, Calendar, DollarSign } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'
import { AttendanceChart } from '@/components/hr-dashboard/attendance-chart'
import { QuickActions } from '@/components/hr-dashboard/quick-actions'
import { PendingApprovals } from '@/components/hr-dashboard/pending-approvals'
import { RecentActivity } from '@/components/hr-dashboard/recent-activity'
import { UpcomingEvents } from '@/components/hr-dashboard/upcoming-events'

export const Route = createFileRoute('/hr-management/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <main>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value="156"
          change={{ value: 2.5, label: 'vs last month' }}
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Present Today"
          value="142"
          change={{ value: -1.2, label: 'vs yesterday' }}
          icon={Clock}
          variant="success"
        />
        <StatCard
          title="On Leave"
          value="8"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Payroll Due"
          value="$285K"
          change={{ value: 5.3, label: 'vs last month' }}
          icon={DollarSign}
          variant="info"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <AttendanceChart />
          <PendingApprovals />
        </div>

        {/* Right Column - Activity & Actions */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
          <UpcomingEvents />
        </div>
      </div>
    </main>
  )
}
