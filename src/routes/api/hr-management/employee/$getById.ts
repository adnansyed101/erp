import { createFileRoute } from '@tanstack/react-router'
import { prisma } from '@/db'
import { formatError } from '@/lib/utils'
import { authApiMiddleware } from '@/middleware/auth'

export const Route = createFileRoute('/api/hr-management/employee/$getById')({
  server: {
    middleware: [authApiMiddleware],
    handlers: {
      GET: async ({ params }) => {
        const { getById } = params

        try {
          const employeeById = await prisma.employee.findFirst({
            where: { userId: getById },
            include: {
              personalInformation: true,
              remainingLeave: true,
            },
          })

          return Response.json({
            success: true,
            data: employeeById,
            message: 'Fetched employee by id.',
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
