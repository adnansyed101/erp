import z from 'zod'
import {
  applyLeaveSchema,
  applyLeaveSchemaWithId,
  updateLeaveSchema,
} from '../validators/leave.validator'

export type ApplyLeave = z.infer<typeof applyLeaveSchema>
export type ApplyLeaveWithId = z.infer<typeof applyLeaveSchemaWithId>
export type UpdateLeaveSchema = z.infer<typeof updateLeaveSchema>