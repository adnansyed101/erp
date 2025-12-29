import { z } from 'zod'

export const applyLeaveSchema = z.object({
  leaveType: z.string().min(1, 'Leave type is required'),
  leaveBalance: z.string().optional(),
  whenLeave: z.enum(['pre', 'post']),
  leaveFrom: z.date().min(1, 'Leave from date is required'),
  leaveTo: z.date().min(1, 'Leave to date is required'),
  totalDays: z.string().optional(),
  purpose: z.string().optional(),
  address: z.string().optional(),
  emergencyNo: z.string().optional(),
  reliever: z.string().optional(),
  designation: z.string().optional(),
})

