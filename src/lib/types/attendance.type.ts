import z from 'zod'
import {
  AttendanceSchema,
  AttendanceSchemaWithEmployeeData,
} from '../validators/attendance.schema'

export type Attendance = z.infer<typeof AttendanceSchema>
export type AttendanceWithEmployeeData = z.infer<
  typeof AttendanceSchemaWithEmployeeData
>
