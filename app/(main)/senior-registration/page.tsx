import RegisterForm from '@/components/main/RegisterForm'
import { getSession } from '@/lib/actions/session-action'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getSession()

  if (!session.isLoggedIn)
    redirect('/log-in')

  if (session.role === "user")
    redirect('/')

  return (
    <div className="w-5xl mx-auto flex flex-col justify-center h-full">
      <div className="text-5xl font-bold text-center mb-8">Register a Senior Citizen</div>
      <RegisterForm />
    </div>
  )
}
