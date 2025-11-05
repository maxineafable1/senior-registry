'use server'

import { db } from "@/db";
import { NewSenior, seniors } from "../db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function registerSenior(newSenior: NewSenior, imageUrl?: string) {
  await db.insert(seniors)
    .values({
      ...newSenior,
      imageUrl
    })

  redirect('/')
}

export async function updateSenior(id: number, newData: NewSenior, imageUrl?: string) {
  await db.update(seniors)
    .set({
      ...newData,
      imageUrl,
    })
    .where(eq(seniors.id, id))

  redirect('/')
}

export async function deleteSeniorData(id: number) {
  await db.delete(seniors).where(eq(seniors.id, id))
  redirect('/')
}

