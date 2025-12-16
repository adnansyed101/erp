import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hr-management/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return <main>HR Management Dashboard Page</main>
}
