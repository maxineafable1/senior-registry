'use server'

import { db } from "@/db"
import bcrypt from 'bcrypt'
import { eq } from "drizzle-orm"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { users } from "../db/schema"
import { defaultSession, SessionData, sessionOptions } from "../session"

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function login(username: string, password: string) {
  const session = await getSession()

  const checkUser = await db.query.users.findFirst({
    // where: and(eq(users.username, username), eq(users.password, password)),
    where: eq(users.username, username),
  })

  if (!checkUser)
    return { error: 'Incorrect username or password' }

  const match = await bcrypt.compare(password, checkUser.password)

  if (!match)
    return { error: 'Incorrect username or password' }

  session.id = checkUser.id
  session.username = checkUser.username
  session.role = checkUser.role
  session.isLoggedIn = true;

  await session.save()
  redirect('/')
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect('/log-in')
}