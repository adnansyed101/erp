import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { parse, set } from 'date-fns'
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === 'ZodError') {
    // Handle Zod Error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message,
    )

    return fieldErrors.join('. ')
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    // Handle Prisma Error
    const field = error.meta?.target ? error.meta.target[0] : 'Field'

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
  } else {
    // Handle other errors
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}

export function formatTime(values: string, today: Date) {
  const parsedTime = parse(values, 'HH:mm', new Date())

  const combined = set(today, {
    hours: parsedTime.getHours(),
    minutes: parsedTime.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  })

  return combined
}

// Form the paginaion links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string
  key: string
  value: string | null
}) {
  const query = qs.parse(params)

  query[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    { skipNull: true },
  )
}

// Shorten UUID
export function formatId(id: string) {
  return `...${id.substring(id.length - 6)}`
}
