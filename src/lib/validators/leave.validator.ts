import { z } from 'zod'
import { LEAVE_TYPES } from '../constant.array'

export const applyLeaveSchema = z.object({
  leaveType: z.enum(LEAVE_TYPES),
  leaveFrom: z.date().min(1, 'Leave from date is required'),
  leaveTo: z.date().min(1, 'Leave to date is required'),
  totalDays: z.string(),
  purposeOfLeave: z.string(),
  addressDuringLeave: z.string(),
  emergencyContactNumber: z.string(),
  approved: z.enum(['pending', 'accepted', 'rejected']),
  approverId: z.string(),
  employeeId: z.string(),
})
