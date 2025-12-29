import ActivityCard from '@/components/shared/activity-card'
import { createFileRoute } from '@tanstack/react-router'
import {
  Briefcase,
  BookOpen,
  Settings,
  ArrowRight,
  Check,
  XCircle,
  Calendar,
  RotateCcw,
  X,
} from 'lucide-react'

export const Route = createFileRoute('/hr-management/leave/leave-management')({
  component: AttendanceManagementPage,
})

function AttendanceManagementPage() {
  const activities = [
    {
      id: 'apply',
      icon: Briefcase,
      title: 'Apply Leave',
      link: '/hr-management/leave/apply-leave',
    },
    {
      id: 'list',
      icon: BookOpen,
      title: 'Leave List',
      link: '/hr-management/leave/list',
    },
    {
      id: 'pending',
      icon: Settings,
      title: 'Pending',
      link: '/hr-management/leave/pending',
    },
    {
      id: 'approved',
      icon: ArrowRight,
      title: 'Approved',
      link: '/hr-management/leave/approved',
    },
    {
      id: 'availed',
      icon: Check,
      title: 'Availed',
      link: '/hr-management/leave/availed',
    },
    {
      id: 'cancel',
      icon: XCircle,
      title: 'Cancel Leave',
      link: '/hr-management/leave/cancel',
    },
    {
      id: 'status',
      icon: Calendar,
      title: 'Leave Status',
      link: '/hr-management/leave/status',
    },
    {
      id: 'return',
      icon: RotateCcw,
      title: 'Return',
      link: '/hr-management/leave/return',
    },
    {
      id: 'reject',
      icon: X,
      title: 'Reject',
      link: '/hr-management/leave/reject',
    },
  ]

  return (
    <main>
      <div className="">
        {/* Header */}
        <h1 className="text-4xl font-bold text-foreground mb-4">
          My Leave
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </div>
    </main>
  )
}
