import EditForm from '@/components/main/EditForm'
import { db } from '@/db'
import { getSession } from '@/lib/actions/session-action'
import { seniors } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()

  if (!session.isLoggedIn)
    redirect('/log-in')

  if (session.role === "user")
    redirect('/')

  const { id } = await params

  const senior = await db.query.seniors.findFirst({
    where: eq(seniors.id, +id),
  })

  if (!senior)
    redirect('/')

  return (
    <div className="w-5xl mx-auto flex flex-col justify-center h-full">
      <div className="text-5xl font-bold text-center mb-8">Edit a Senior Citizen data</div>
      <EditForm senior={senior} />
    </div>
  )
}
