import z from 'zod'
import { ERP_ROLE_KEYS } from '../constant.array'

export const customUserSchema = z.object({
  userId: z.string(),
  employeeId: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(ERP_ROLE_KEYS),
})
