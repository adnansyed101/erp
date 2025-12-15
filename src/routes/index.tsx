import LoginForm from '@/components/login/login-form'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Image } from '@unpic/react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium w-60"
        >
          <Image
            src="/arbree_logo_full_black.png"
            alt="Arbree Solutions Logo"
            width={200}
            height={100}
          />
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
