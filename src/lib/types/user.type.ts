import z from 'zod'
import { customUserSchema } from '../validators/user.validator'

export type CustomUser = z.infer<typeof customUserSchema>
