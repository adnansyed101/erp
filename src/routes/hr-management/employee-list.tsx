import { EmployeeCard } from '@/components/employee-list/employee-card'
import { EmployeeWithId } from '@/lib/types/employee.types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hr-management/employee-list')({
  component: EmployeeListPage,
})

function EmployeeListPage() {
  const {
    data: employees,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async (): Promise<{
      success: boolean
      message: string
      data: EmployeeWithId[]
    }> => {
      const response = await fetch(`/api/hr-management/employees`)

      if (!response.ok) {
        throw new Error('Failed to fetch all employee')
      }

      return response.json()
    },
  })

  if (error) return 'An error has occurred: ' + error.message
  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">Employee List</h1>
      <div>
        {isLoading || isPending ? (
          'Loading....'
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {employees.data.map((employee: EmployeeWithId) => (
              <EmployeeCard
                key={employee.id}
                id={employee.id || '1'}
                imgUrl={employee.personalInformation.imageUrl}
                fullName={employee.personalInformation.fullName}
                officeEmail={employee.personalInformation.officeEmail}
                personalNumber={employee.personalInformation.personalNumber}
                currentDesignation={
                  employee.personalInformation.currentDesignation
                }
                jobTitle={employee.personalInformation.currentDesignation}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
