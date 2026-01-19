import {
  Clock,
  UserPlus,
  FileCheck,
  AlertCircle,
  DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Activity {
  id: string
  type: 'leave' | 'employee' | 'payroll' | 'alert' | 'voucher'
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'leave',
    title: 'Leave Request Approved',
    description: "Sarah Johnson's sick leave (3 days) approved",
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'employee',
    title: 'New Employee Onboarded',
    description: 'Michael Chen joined as Software Engineer',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'payroll',
    title: 'Payroll Processed',
    description: 'January 2025 payroll completed for 156 employees',
    time: 'Yesterday',
  },
  {
    id: '4',
    type: 'alert',
    title: 'Late Arrival Alert',
    description: '5 employees marked late today',
    time: 'Today, 9:30 AM',
  },
  {
    id: '5',
    type: 'voucher',
    title: 'Voucher Pending Approval',
    description: 'Payment voucher #VCH-2025-089 awaiting review',
    time: 'Yesterday',
  },
]

const typeIcons = {
  leave: Clock,
  employee: UserPlus,
  payroll: DollarSign,
  alert: AlertCircle,
  voucher: FileCheck,
}

const typeStyles = {
  leave: 'bg-chart-2/10 text-chart-2',
  employee: 'bg-success/10 text-success',
  payroll: 'bg-primary/10 text-primary',
  alert: 'bg-warning/10 text-warning',
  voucher: 'bg-chart-4/10 text-chart-4',
}

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = typeIcons[activity.type]
          return (
            <div
              key={activity.id}
              className={cn(
                'flex gap-3 animate-fade-in',
                index !== activities.length - 1 &&
                  'pb-4 border-b border-border',
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  'rounded-lg p-2 h-fit',
                  typeStyles[activity.type],
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
