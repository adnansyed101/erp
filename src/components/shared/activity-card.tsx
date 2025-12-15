import type { LucideIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface ActivityCardProps {
  icon: LucideIcon
  title: string
  link: string
}

export default function ActivityCard({
  icon: Icon,
  title,
  link,
}: ActivityCardProps) {
  return (
    <Link to={link}>
      <div className="group relative flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
        <div className="rounded-full bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary/20">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-center font-medium text-card-foreground text-sm group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Link>
  )
}
