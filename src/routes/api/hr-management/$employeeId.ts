import { prisma } from '@/db'
import { formatError } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/hr-management/$employeeId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { employeeId } = params

        try {
          const employeeById = await prisma.employee.findFirst({
            where: { id: employeeId },
            include: {
              personalInformation: true,
              presentAddress: true,
              permanentAddress: true,
              spouseInformation: true,
              emergencyContact: true,
              additionalInformation: true,
              bankInformation: true,
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
