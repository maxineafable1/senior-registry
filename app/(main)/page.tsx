import SeniorsTable from "@/components/main/SeniorsTable";
import { db } from "@/db";
import { getSession } from "@/lib/actions/session-action";
import { benefits, seniors } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getSession()

  if (!session.isLoggedIn)
    redirect('/log-in')

  const searchParam = (await searchParams)?.search
  const val = Array.isArray(searchParam) ? searchParam[0] : searchParam

  const seniorsData = val
    ? await db.select().from(seniors).leftJoin(benefits, eq(benefits.seniorId, seniors.id)).where(sql`LOWER(${seniors.lastname}) like LOWER(${`%${val}%`}) OR LOWER(${seniors.firstname}) like LOWER(${`%${val}%`})`)
    : await db.select().from(seniors).leftJoin(benefits, eq(benefits.seniorId, seniors.id))

  return (
    <div className="p-8">
      {session.role !== "user" && (
        <div className="flex justify-between gap-8 mb-12">
          <div className="bg-neutral-50 border rounded-lg space-y-4 p-8 w-sm">
            <div className="text-2xl max-w-[18ch] text-center mx-auto font-bold">Total Registered Senior Citizens</div>
            <div className="text-center text-4xl font-bold">{seniorsData.length}</div>
          </div>
          <div className="bg-neutral-50 border rounded-lg space-y-4 p-8 w-sm">
            <div className="text-2xl max-w-[18ch] text-center mx-auto font-bold">
              Total Claimants
            </div>
            <div className="text-center text-4xl font-bold">{seniorsData.map(s => s.benefits).filter(s => s?.seniorClaimed).length}</div>
          </div>
          <div className="bg-neutral-50 border rounded-lg space-y-4 p-8 w-sm">
            <div className="text-2xl max-w-[18ch] text-center mx-auto font-bold">
              Total PWD Members
            </div>
            <div className="text-center text-4xl font-bold">{seniorsData.map(s => s.seniors).filter(s => s.pwdId).length}</div>
          </div>
        </div>
      )}
      <SeniorsTable
        seniorsData={seniorsData.map(s => s.seniors)}
        benefitsData={seniorsData.map(s => s.benefits)}
        role={session.role}
        sessId={session.id} />
    </div>
  );
}
