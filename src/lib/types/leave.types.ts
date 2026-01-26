import z from 'zod'
import {
  applyLeaveSchema,
  applyLeaveSchemaWithId,
} from '../validators/leave.validator'

export type ApplyLeave = z.infer<typeof applyLeaveSchema>
export type ApplyLeaveWithId = z.infer<typeof applyLeaveSchemaWithId>
