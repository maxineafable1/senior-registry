'use server'

import { db } from "@/db";
import { benefits, NewSenior, seniors } from "../db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function registerSenior(newSenior: NewSenior) {
  const senior = await db.insert(seniors).values(newSenior).returning({ id: seniors.id })
  await db.insert(benefits).values({
    seniorClaimed: false,
    seniorDate: new Date().toLocaleDateString(),
    seniorId: senior.at(0)?.id,
  })

  redirect('/')
}

export async function updateSenior(id: number, newSenior: NewSenior) {
  await db.update(seniors)
    .set(newSenior)
    .where(eq(seniors.id, id))

  redirect('/')
}

export async function deleteSeniorData(id: number) {
  await db.delete(seniors).where(eq(seniors.id, id))
  redirect('/')
}

export async function updateSeniorClaim(seniorId: number, claimed: boolean, nextDate: Date) {
  await db.update(benefits).set({
    seniorClaimed: claimed,
    seniorDate: nextDate.toLocaleDateString(),
  }).where(eq(benefits.seniorId, seniorId))

  // redirect('/')
  revalidatePath('/')
}