import { Links } from '@/lib/types/general.types'
import MainLayout from '@/providers/main-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ArrowLeftToLine, Home, ListCheck, Logs, User } from 'lucide-react'

export const Route = createFileRoute('/hr-management')({
  component: RouteComponent,
})

function RouteComponent() {
  const links: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          title: 'Home',
          url: '/home',
          icon: Home,
        },
        {
          title: 'Dashboard',
          url: '/hr-management/dashboard',
          icon: Logs,
        },
        {
          title: 'Personal Information Management',
          url: '/hr-management/personal-information-management',
          icon: User,
        },
        {
          title: 'Attendance Management',
          url: '/hr-management/attendance/attendance-management',
          icon: ListCheck,
        },
        {
          title: 'Leave Management',
          url: '/hr-management/leave/leave-management',
          icon: ArrowLeftToLine,
        },
      ],
    },
  ]

  return (
    <MainLayout links={links}>
      <Outlet />
    </MainLayout>
  )
}
