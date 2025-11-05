import SystemAdminForm from '@/components/auth/SystemAdminForm'
import { getSession } from '@/lib/actions/session-action'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getSession()

  if (!session.isLoggedIn)
    redirect('/log-in')

  if (session.role !== "admin")
    redirect('/')

  return (
    <div className="">
      <SystemAdminForm />
    </div>
  )
}
