import ActivityCard from '@/components/shared/activity-card'
import { createFileRoute } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'

export const Route = createFileRoute(
  '/hr-management/personal-information-management',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const activities = [
    {
      title: 'Create Employee',
      icon: UserPlus,
      link: '/hr-management/create-employee/personal-information',
    },
    {
      title: 'Employee List',
      icon: UserPlus,
      link: '/hr-management/employee-list',
    },
  ]

  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Personal information Management System
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.title} {...activity} />
        ))}
      </div>
    </main>
  )
}
