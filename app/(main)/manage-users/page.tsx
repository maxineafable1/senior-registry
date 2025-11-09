import ManageUserDeleteBtn from "@/components/main/ManageUserDeleteBtn";
import Searchbar from "@/components/main/Searchbar";
import UserDropdownList from "@/components/main/UserDropdownList";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from '@/db';
import { getSession } from "@/lib/actions/session-action";
import { seniors, users } from '@/lib/db/schema';
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";


export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getSession()

  if (!session.isLoggedIn)
    redirect('/log-in')

  if (session.role === "user")
    redirect('/')

  const searchParam = (await searchParams)?.search
  const val = Array.isArray(searchParam) ? searchParam[0] : searchParam

  const usersData = val
    ? await db.select().from(users).where(sql`LOWER(${users.username}) like LOWER(${`%${val}%`})`)
    : await db.select().from(users)

  const seniorsData = await db.select({
    id: seniors.id,
    lastname: seniors.lastname,
    firstname: seniors.firstname,
    userId: seniors.userId
  }).from(seniors)
  // .where(isNull(seniors.userId))

  console.log(seniorsData)

  return (
    <div className="p-8">
      <Searchbar />
      <Table className="bg-neutral-50 rounded-lg">
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Set a Senior Citizen</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map(({
            id,
            username,
            role,
          }) => (
            <TableRow
              key={id}
            >
              <TableCell>{username}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell className="space-x-2">
                {role === "user" && (
                  <UserDropdownList seniorsData={seniorsData} userId={id} />
                )}
                {/* <Button asChild>
                  <Link href={`/senior-registry-edit/${id}`}>Edit</Link>
                </Button> */}
              </TableCell>
              <TableCell>
                {session.role === "staff" && role !== "admin" && (
                  <ManageUserDeleteBtn id={id} sessionId={session.id} />
                )}
                {session.role === "admin" && (
                  <ManageUserDeleteBtn id={id} sessionId={session.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="">$2,500.00</TableCell>
          </TableRow> */}
        </TableFooter>
      </Table>
    </div>
  )
}
