import { UserPlus, FileText, Calendar, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'

const actions = [
  { label: 'Create Employee', icon: UserPlus, variant: 'default' as const },
  { label: 'Add Voucher', icon: Receipt, variant: 'outline' as const },
  { label: 'Request Leave', icon: Calendar, variant: 'outline' as const },
  { label: 'New Notice', icon: FileText, variant: 'outline' as const },
]

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="h-auto flex-col gap-2 py-4"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
