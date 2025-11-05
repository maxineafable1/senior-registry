import LoginForm from '@/components/auth/LoginForm'
import { getSession } from '@/lib/actions/session-action'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const session = await getSession()
  
  if (session.isLoggedIn)
    redirect('/')
  
  console.log(session)
  
  return (
    <main className="lg:flex *:flex-1 h-dvh">
      <Image 
        src={'/senior-log-in.jpeg'} 
        alt='' 
        width='800' 
        height='800'
        className='w-full h-full block object-cover'
      />
      <div className="my-auto">
        <LoginForm />
      </div>
    </main>
  )
}
