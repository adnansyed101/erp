import { formatError } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
// import { createClient } from '@supabase/supabase-js'
import { Employee } from '@/lib/types/employee.types'
import { prisma } from '@/db'

// const apiKey = process.env.SUPABASE_API_KEY ? process.env.SUPABASE_API_KEY : ''

// const supabase = createClient('http://localhost:3000/', apiKey)

export const Route = createFileRoute('/api/hr-management/employees')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const employees = await prisma.employee.findMany({
            include: {
              personalInformation: true,
            },
          })

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
