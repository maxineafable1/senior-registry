'use server'

import { db } from "@/db"
import { NewUser, seniors, users } from "../db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'
import { revalidatePath } from "next/cache"
import { getSession } from "./session-action"

export async function systemAdminRegister(newUser: NewUser) {
  const { username, password, role } = newUser

  const userExist = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (userExist)
    return { error: 'Username already exists' }


  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  await db.insert(users).values({
    username,
    password: hashedPassword,
    role,
  })

  redirect('/')
}

export async function setSeniorToUser(seniorId: number, userId: number) {
  await db.update(seniors)
    .set({ userId })
    .where(eq(seniors.id, seniorId))

  redirect('/manage-users')
}

export async function removeAssociatedSenior(seniorId: number) {
  await db.update(seniors).set({ userId: null }).where(eq(seniors.id, seniorId))
  redirect('/manage-users')
}

export async function deleteUser(userId: number, sessionId: number) {
  await db.delete(users).where(eq(users.id, userId))

  if (userId === sessionId) {
    const session = await getSession()
    session.destroy()
    redirect('/log-in')
  } else {
    redirect('/manage-users')
  }
}