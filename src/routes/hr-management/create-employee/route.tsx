import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/hr-management/create-employee')({
  component: CreateEmployeeLayout,
  notFoundComponent: () => <div>Create Employee Not Found</div>,
})

function CreateEmployeeLayout() {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Create Employee
        </h1>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
