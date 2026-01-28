import { z } from 'zod'
import { LEAVE_STATUS, LEAVE_TYPES } from '../constant.array'
import { EmployeeSchema } from './employee.validator'

export const applyLeaveSchema = z.object({
  leaveType: z.enum(LEAVE_TYPES),
  leaveFrom: z.date(),
  leaveTo: z.date(),
  totalDays: z.number().nonnegative(),
  purposeOfLeave: z.string().min(1, 'Purpose of leave is required.'),
  addressDuringLeave: z.string().min(1, 'Address is required'),
  emergencyContactNumber: z
    .string()
    .min(1, 'Emergency contact number is required.'),
  approved: z.enum(LEAVE_STATUS),
  approverId: z.string(),
  employeeId: z.string(),
})

export const applyLeaveSchemaWithId = applyLeaveSchema.extend({
  id: z.string(),
  approvedBy: EmployeeSchema,
  employee: EmployeeSchema,
})

export const updateLeaveSchema = z.object({
  id: z.string(),
  type: z.enum(LEAVE_STATUS),
})
