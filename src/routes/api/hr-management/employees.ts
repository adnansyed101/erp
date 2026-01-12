import { formatError } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { Employee } from '@/lib/types/employee.types'
import { prisma } from '@/db'
import z from 'zod'
import { auth } from '@/lib/auth'
import { authApiMiddleware } from '@/middleware/auth'

const employeesSearchSchema = z.object({
  limit: z.number(),
  search: z.string(),
})

export const Route = createFileRoute('/api/hr-management/employees')({
  validateSearch: (search) => employeesSearchSchema.parse(search),
  server: {
    middleware: [authApiMiddleware],
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url)
        const limit = Number(searchParams.get('limit'))
        const search = searchParams.get('search') || ''

        try {
          let employees = []
          if (searchParams.get('limit')) {
            employees = await prisma.employee.findMany({
              where: {
                personalInformation: {
                  fullName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              include: {
                personalInformation: true,
              },
              take: limit,
            })
          } else {
            employees = await prisma.employee.findMany({
              include: {
                personalInformation: true,
              },
            })
          }

          return Response.json({
            success: true,
            data: employees,
            message: 'Fetched all employees.',
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
        const body: Employee = await request.json()

        try {
          const signUpData = await auth.api.signUpEmail({
            body: {
              email: body.personalInformation.officeEmail,
              password: 'Arbree@2026',
              name: body.personalInformation.fullName,
              role: body.personalInformation.role,
              image: body.personalInformation.imageUrl,
            },
          })

          const newEmployee = await prisma.employee.create({
            data: {
              personalInformation: {
                create: {
                  ...body.personalInformation,
                },
              },
              additionalInformation: {
                create: {
                  ...body.additionalInformation,
                },
              },
              presentAddress: {
                create: {
                  ...body.presentAddress,
                },
              },
              permanentAddress: {
                create: {
                  ...body.permanentAddress,
                },
              },
              spouseInformation: {
                create: {
                  ...body.spouseInformation,
                },
              },
              emergencyContact: {
                create: {
                  ...body.emergencyContact,
                },
              },
              bankInformation: {
                create: {
                  ...body.bankInformation,
                },
              },
              user: {
                connect: { id: signUpData.user.id },
              },
            },
          })

          return Response.json({
            success: true,
            data: newEmployee,
            message: 'Created an employee.',
          })
        } catch (error) {
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
