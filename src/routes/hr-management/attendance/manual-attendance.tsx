import { createFileRoute, useRouter } from '@tanstack/react-router'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ManualAttendanceForm } from '@/components/manual-attendance/manual-attendance-form'
import { AttendanceTable } from '@/components/manual-attendance/attendance-table'
import z from 'zod'

const manualAttendanceSeachSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute(
  '/hr-management/attendance/manual-attendance',
)({
  validateSearch: (search) => manualAttendanceSeachSchema.parse(search),
  component: ManualAttendancePage,
  notFoundComponent: () => <div>Manual Attendance Not Found</div>,
})

function ManualAttendancePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Manual Attendance
        </h1>
        <Button
          onClick={() => router.history.back()}
          variant="ghost"
          size="icon"
          className="bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 space-y-8">
        {/* Form Section */}
        <div>
          <ManualAttendanceForm />
        </div>

        {/* Table Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Manual Attendance
          </h2>
          <AttendanceTable />
        </div>
      </div>
    </div>
  )
}
