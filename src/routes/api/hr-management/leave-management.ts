import { createFileRoute } from '@tanstack/react-router'
import { prisma } from '@/db'
import { formatError } from '@/lib/utils'
import { ApplyLeave } from '@/lib/types/leave.types'

export const Route = createFileRoute('/api/hr-management/leave-management')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const leaves = await prisma.leaveManagement.findMany({
            include: {
              employee: {
                include: {
                  personalInformation: true,
                },
              },
              approvedBy: {
                include: {
                  personalInformation: true,
                },
              },
            },
          })

          return Response.json({
            success: true,
            data: leaves,
            message: 'Fetched all leaves.',
          })
        } catch (error) {
          return Response.json({
            success: false,
            data: [],
            message: formatError(error),
          })
        }
      },
      POST: async ({ request }) => {
        const body: ApplyLeave = await request.json()

        try {
          const newLeave = await prisma.leaveManagement.create({
            data: body,
          })

          return Response.json({
            success: true,
            data: newLeave,
            message: 'Leave applied successfully.',
          })
        } catch (error) {
          console.log(error)
          return Response.json({
            success: false,
            data: {},
            message: formatError(error),
          })
        }
      },
    },
  },
})
