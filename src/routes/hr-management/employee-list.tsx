import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hr-management/employee-list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/hr-management/employee-list"!</div>
}
