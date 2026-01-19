import { Calendar, Users, GraduationCap, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Event {
  id: string
  title: string
  date: string
  type: 'meeting' | 'training' | 'holiday' | 'event'
  participants?: number
}

const events: Event[] = [
  {
    id: '1',
    title: 'Q1 Planning Meeting',
    date: 'Jan 22, 10:00 AM',
    type: 'meeting',
    participants: 12,
  },
  {
    id: '2',
    title: 'Safety Training Session',
    date: 'Jan 24, 2:00 PM',
    type: 'training',
    participants: 45,
  },
  {
    id: '3',
    title: 'Republic Day Holiday',
    date: 'Jan 26',
    type: 'holiday',
  },
  {
    id: '4',
    title: 'Annual Company Dinner',
    date: 'Jan 28, 7:00 PM',
    type: 'event',
    participants: 156,
  },
]

const typeIcons = {
  meeting: Users,
  training: GraduationCap,
  holiday: Calendar,
  event: PartyPopper,
}

const typeStyles = {
  meeting: 'bg-chart-2/10 text-chart-2',
  training: 'bg-primary/10 text-primary',
  holiday: 'bg-success/10 text-success',
  event: 'bg-chart-4/10 text-chart-4',
}

export function UpcomingEvents() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Upcoming Events</h3>
        <button className="text-sm text-primary hover:underline">
          View calendar
        </button>
      </div>
      <div className="space-y-3">
        {events.map((event, index) => {
          const Icon = typeIcons[event.type]
          return (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn('rounded-lg p-2', typeStyles[event.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {event.title}
                </p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
              {event.participants && (
                <div className="text-xs text-muted-foreground">
                  <Users className="h-3 w-3 inline mr-1" />
                  {event.participants}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
