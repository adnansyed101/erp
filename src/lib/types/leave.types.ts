import z from 'zod'
import { applyLeaveSchema } from '../validators/leave.validator'

export type ApplyLeave = z.infer<typeof applyLeaveSchema>
