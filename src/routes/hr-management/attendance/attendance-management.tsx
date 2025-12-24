import ActivityCard from '@/components/shared/activity-card'
import { createFileRoute } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'

export const Route = createFileRoute(
  '/hr-management/attendance/attendance-management',
)({
  component: AttendanceManagementPage,
})

function AttendanceManagementPage() {
  const entryActivities = [
    {
      title: 'Manual Attendance',
      icon: UserPlus,
      link: '/hr-management/attendance/manual-attendance',
    },
  ]

  return (
    <main className="min-h-screen bg-background pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Attendance Entry
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {entryActivities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </div>
    </main>
  )
}
