import z from 'zod'
import { applyLeaveSchema } from '../validators/leave.validator'

export type ApplyLeaveFormValues = z.infer<typeof applyLeaveSchema>
