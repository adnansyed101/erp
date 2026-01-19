import { EmployeeWithId } from '@/lib/types/employee.types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Building,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Image } from '@unpic/react'
import { format } from 'date-fns'
import { useState } from 'react'
import useDebounce from '@/hooks/useDebouncer'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/hr-management/employee-list')({
  component: EmployeeListPage,
})

const statusStyles = {
  active: 'bg-success/10 text-success border-success/20',
  'on-leave': 'bg-warning/10 text-warning border-warning/20',
  inactive: 'bg-muted text-muted-foreground border-border',
}

type EmployeeResponseType = {
  success: boolean
  message: string
  data: EmployeeWithId[]
  count: number
}

function EmployeeListPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [limit] = useState(10)

  const {
    data: employees,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employees', debouncedSearch],
    queryFn: async (): Promise<EmployeeResponseType> => {
      const response = await fetch(
        `/api/hr-management/employees?search=${debouncedSearch}&limit=${limit}`,
      )

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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-9 max-w-md"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Link to="/hr-management/create-employee/personal-information">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </Link>
          </div>
        </div>

        {/* Employee Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Employee</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Position</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Join Date</TableHead>
                <TableHead className="w-12.5"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading || isPending ? (
                <Spinner />
              ) : (
                <>
                  {employees.data.map((employee, index) => (
                    <TableRow
                      key={employee.id}
                      className="animate-fade-in hover:bg-muted/30"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium">
                            <Image
                              src={employee.personalInformation.imageUrl}
                              alt={employee.personalInformation.fullName}
                              width={40}
                              height={40}
                              layout="constrained"
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {employee.personalInformation.fullName}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {employee.personalInformation.officeEmail}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {employee.personalInformation.role}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.personalInformation.currentDesignation}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            'capitalize',
                            statusStyles[
                              employee.personalInformation.employeeStatus
                            ],
                          )}
                        >
                          {employee.personalInformation.employeeStatus.replace(
                            '-',
                            ' ',
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(
                          employee.personalInformation.dateOfConfirmation,
                          'PP',
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link
                                to={'/hr-management/$employeeId'}
                                params={{ employeeId: employee.id }}
                              >
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>View Attendance</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Archive Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>
            Showing {limit} of {employees?.count} employees
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  )
}
