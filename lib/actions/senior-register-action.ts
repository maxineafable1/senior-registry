'use server'

import { db } from "@/db";
import { NewSenior, seniors } from "../db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function registerSenior(newSenior: NewSenior) {
  await db.insert(seniors).values(newSenior)

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

