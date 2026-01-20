import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { ERP_ROLE_KEYS } from './constant.array'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
  baseURL: import.meta.env.VITE_APP_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ERP_ROLE_KEYS,
        required: true,
        defaultValue: 'employee',
        input: true,
      },
      score: {
        type: 'number',
        required: true,
        defaultValue: 60,
        input: true,
      },
    },
  },
  plugins: [tanstackStartCookies()],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
