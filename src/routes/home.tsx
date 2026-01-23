import ActivityCard from '@/components/shared/activity-card'
import DefaultLoadingComponent from '@/components/shared/default-loading-component'
import { authClient } from '@/lib/auth-cilent'
import { EmployeeWithId } from '@/lib/types/employee.types'
import type { Links } from '@/lib/types/general.types'
import { authMiddleware } from '@/middleware/auth'
import MainLayout from '@/providers/main-layout'
import { useCustomUserStore } from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  Boxes,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  MapPin,
  CheckSquare,
  ShoppingCart,
  GitBranch,
  Zap,
  Package,
  Building2,
  Heart,
  CreditCard,
  Banknote,
  Truck,
  Shield,
  HandshakeIcon,
  Home,
  Settings,
} from 'lucide-react'

export const Route = createFileRoute('/home')({
  component: HomePage,
  pendingComponent: DefaultLoadingComponent,
  server: {
    middleware: [authMiddleware],
  },
})

function HomePage() {
  const updateData = useCustomUserStore((state) => state.updateUserData)

  const { data: session } = authClient.useSession()

  const { data: employee, isPending } = useQuery({
    queryKey: ['employee'],
    queryFn: async (): Promise<{
      success: boolean
      message: string
      data: EmployeeWithId
    }> => {
      const response = await fetch(
        `/api/hr-management/employee/${session?.user.id}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch employee by id.')
      }

      return response.json()
    },
    enabled: !!session?.session.token,
  })

  if (!isPending)
    updateData({
      userId: session?.user.id ?? '',
      employeeId: employee?.data.id ?? '',
      email: session?.user.email ?? '',
      role: employee?.data.personalInformation.role ?? '',
      name: session?.user.name ?? '',
    })

  const activities = [
    {
      icon: Boxes,
      title: 'Supply Chain Management System',
      link: '/supply-chain',
    },
    {
      icon: Users,
      title: 'Customer Relationship Management',
      link: '/customer-relationship',
    },
    {
      icon: Briefcase,
      title: 'Human Resource Management System',
      link: '/hr-management/dashboard',
    },
    {
      icon: DollarSign,
      title: 'Accounting Management System',
      link: '/accounting-management',
    },
    {
      icon: TrendingUp,
      title: 'Payroll Management System',
      link: '/payroll-management',
    },
    {
      icon: MapPin,
      title: 'Field Force',
      link: '/field-force',
    },
    {
      icon: CheckSquare,
      title: 'Task Management System',
      link: '/task-management',
    },
    {
      icon: ShoppingCart,
      title: 'Sales Management System',
      link: '/sales-management',
    },
    {
      icon: GitBranch,
      title: 'Workflow Management System',
      link: '/workflow-management',
    },
    {
      icon: Zap,
      title: 'Recruitment Management System',
      link: '/recruitment-management',
    },
    {
      icon: Package,
      title: 'Inventory Management System',
      link: '/invenentory-managemnt',
    },
    {
      icon: Building2,
      title: 'Fixed Asset Management System',
      link: '/fixed-asset',
    },
    {
      icon: Heart,
      title: 'Home Care',
      link: '/home-care',
    },
    {
      icon: CreditCard,
      title: 'Point of Sale',
      link: '/point-of-sale',
    },
    {
      icon: Banknote,
      title: 'Non Banking',
      link: '/non-banking',
    },
    {
      icon: Truck,
      title: 'Rental',
      link: '/rental',
    },
    {
      icon: Shield,
      title: 'Dispatch Safety and Security',
      link: '/dispatch-safety-and-security',
    },
    {
      icon: HandshakeIcon,
      title: 'Partner',
      link: '/partner',
    },
  ]

  const links: Links = [
    {
      label: 'Essential Links',
      items: [
        {
          title: 'Home',
          url: '/home',
          icon: Home,
        },
      ],
    },
    {
      label: 'Extras',
      items: [
        {
          title: 'Settings',
          url: '/setting',
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <MainLayout links={links}>
      <main className="min-h-screen bg-background pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive suite of enterprise management solutions
              designed to streamline your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.title} {...activity} />
            ))}
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
