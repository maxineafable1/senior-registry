import { db } from '@/db'
import { seniors, users } from '@/lib/db/schema'
import { eq, or } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RemoveBtn from '@/components/main/RemoveBtn';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { getSession } from '@/lib/actions/session-action';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()

  if (!session.isLoggedIn)
    redirect('/log-in')

  const { id } = await params

  const senior = await db.query.seniors.findFirst({
    where: (or(eq(seniors.id, +id), eq(seniors.userId, +id))),
  })

  if (!senior)
    redirect('/')


  const withSeniorUser = senior.userId ? await db.query.users.findFirst({
    where: (eq(users.id, senior.userId)),
    columns: {
      id: true,
      username: true,
      role: true,
    }
  }) : null

  return (
    <div className="p-8">
      <div className="text-4xl font-bold mb-8">Senior Citizen Profile</div>
      <div className="p-8 rounded-lg bg-neutral-200">
        <div className="flex gap-8">
          <Image
            src={senior.imageUrl ?? '/senior-log-in.jpeg'}
            alt=''
            width={'400'}
            height={'400'}
            className='aspect-square block object-cover mb-8 rounded-xl'
          />
          {withSeniorUser && (
            <div>
              <div className="text-2xl font-bold">User Account</div>
              <div className="">Username: {withSeniorUser.username}</div>
              <div className="">Role: {withSeniorUser.role}</div>
            </div>
          )}
        </div>
        <Table className="bg-neutral-100 rounded-lg">
          {/* <TableCaption>{'caption'}</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Last Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Middle Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Date of birth</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Guardian Name</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Benefit Claimed</TableHead>
              <TableHead>Credentials</TableHead>
              {session.role !== "user" && <TableHead>Options</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{senior.lastname}</TableCell>
              <TableCell>{senior.firstname}</TableCell>
              <TableCell>{senior.middlename}</TableCell>
              <TableCell>{senior.gender}</TableCell>
              <TableCell>{senior.birthdate}</TableCell>
              <TableCell>{senior.address}</TableCell>
              <TableCell>{senior.guardian}</TableCell>
              <TableCell>{senior.contactNumber}</TableCell>
              <TableCell>{senior.benefitClaimed ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {senior.psaCertificate && (
                    <div className="flex items-center">
                      <Check />
                      <span>PSA Certificate</span>
                    </div>
                  )}
                  {senior.pwdId && (
                    <div className="flex items-center">
                      <Check />
                      <span>PWD ID</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {senior.seniorId && (
                    <div className="flex items-center">
                      <Check />
                      <span>Senior ID</span>
                    </div>
                  )}
                  {senior.philhealthId && (
                    <div className="flex items-center">
                      <Check />
                      <span>Philhealth ID</span>
                    </div>
                  )}
                </div>
              </TableCell>
              {session.role !== "user" && (
                <TableCell className="space-x-2">
                  <Button asChild>
                    <Link href={`/senior-registry-edit/${id}`}>Edit</Link>
                  </Button>
                  <RemoveBtn id={senior.id} />
                </TableCell>
              )}
            </TableRow>
          </TableBody>
          <TableFooter>
            {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="">$2,500.00</TableCell>
          </TableRow> */}
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
