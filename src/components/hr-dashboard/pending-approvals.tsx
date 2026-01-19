import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Approval {
  id: string
  type: 'leave' | 'voucher' | 'expense'
  title: string
  requester: string
  amount?: string
  date: string
  priority: 'high' | 'medium' | 'low'
}

const approvals: Approval[] = [
  {
    id: '1',
    type: 'leave',
    title: 'Annual Leave Request',
    requester: 'Emily Davis',
    date: 'Jan 20 - Jan 25',
    priority: 'medium',
  },
  {
    id: '2',
    type: 'voucher',
    title: 'Payment Voucher #089',
    requester: 'Finance Dept',
    amount: '$12,450',
    date: 'Jan 18',
    priority: 'high',
  },
  {
    id: '3',
    type: 'expense',
    title: 'Travel Expense',
    requester: 'James Wilson',
    amount: '$850',
    date: 'Jan 15',
    priority: 'low',
  },
]

const priorityStyles = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-muted text-muted-foreground border-border',
}

export function PendingApprovals() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Pending Approvals</h3>
          <p className="text-sm text-muted-foreground">
            Requires your attention
          </p>
        </div>
        <Badge variant="secondary" className="font-medium">
          {approvals.length} pending
        </Badge>
      </div>
      <div className="space-y-3">
        {approvals.map((approval, index) => (
          <div
            key={approval.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground truncate">
                  {approval.title}
                </span>
                <Badge
                  variant="outline"
                  className={cn('text-xs', priorityStyles[approval.priority])}
                >
                  {approval.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{approval.requester}</span>
                <span>•</span>
                <span>{approval.date}</span>
                {approval.amount && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-foreground">
                      {approval.amount}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
