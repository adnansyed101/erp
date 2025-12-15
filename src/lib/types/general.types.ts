import { LucideIcon } from 'lucide-react'

export type Links = {
  label: string
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}[]
