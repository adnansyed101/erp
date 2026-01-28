import { createFileRoute } from '@tanstack/react-router'
import { prisma } from '@/db'
import { formatError } from '@/lib/utils'
import { ApplyLeave, UpdateLeaveSchema } from '@/lib/types/leave.types'
import z from 'zod'

const leaveSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(10),
})

export const Route = createFileRoute('/api/hr-management/leave-management')({
  validateSearch: (search) => leaveSchema.parse(search),
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
      PATCH: async ({ request }) => {
        const leave: UpdateLeaveSchema = await request.json()

        try {
          const updateLeave = await prisma.leaveManagement.update({
            where: {
              id: leave.id,
            },
            data: {
              approved: leave.type,
            },
          })

          return Response.json({
            success: false,
            data: updateLeave,
            message: 'Updated Leave.',
          })
        } catch (error) {
          return Response.json({
            success: false,
            data: [],
            message: formatError(error),
          })
        }
      },
    },
  },
})
