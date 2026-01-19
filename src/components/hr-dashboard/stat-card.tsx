import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  icon: LucideIcon
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info'
}

const variantStyles = {
  default: 'bg-card border-border',
  primary: 'bg-primary/5 border-primary/20',
  success: 'bg-success/5 border-success/20',
  warning: 'bg-warning/5 border-warning/20',
  info: 'bg-chart-2/5 border-chart-2/20',
}

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-chart-2/10 text-chart-2',
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default',
}: StatCardProps) {
  return (
    <div
      className={cn('stat-card rounded-xl border p-5', variantStyles[variant])}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p className="mt-2 flex items-center text-sm">
              <span
                className={cn(
                  'font-medium',
                  change.value >= 0 ? 'text-success' : 'text-destructive',
                )}
              >
                {change.value >= 0 ? '+' : ''}
                {change.value}%
              </span>
              <span className="ml-2 text-muted-foreground">{change.label}</span>
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-2.5', iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
