import z from 'zod'
import { EmployeeSchema } from './employee.validator'

export const AttendanceSchema = z.object({
  checkIn: z.date().default(new Date()),
  checkOut: z.date().optional(),
  preferableInTime: z.date(),
  status: z.enum(['In', 'Out']),
  employeeId: z.string(),
})

export const AttendanceSchemaWithEmployeeData = AttendanceSchema.extend({
  id: z.string(),
  employee: EmployeeSchema,
})
