'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Searchbar from './Searchbar';
import { Button } from '../ui/button';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { Check } from 'lucide-react';
import SetClaimBtn from './SetClaimBtn';

type Props = {
  seniorsData: {
    id: number;
    lastname: string;
    firstname: string;
    middlename: string;
    gender: string;
    address: string;
    guardian: string;
    contactNumber: string;
    birthdate: string;
    psaCertificate: string | null;
    pwdId: string | null;
    seniorId: string | null;
    philhealthId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: number | null
  }[]
  benefitsData: ({
    id: number;
    seniorClaimed: boolean;
    seniorDate: string | null;
    seniorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null)[]
  role: string | undefined
  sessId: number | undefined
}

export default function SeniorsTable({
  seniorsData,
  benefitsData,
  role,
  sessId,
}: Props) {
  const router = useRouter()

  function userBenefitClaimDisplay() {
    if (role === "user") {
      const seniorId = seniorsData.find(s => s.userId === sessId)?.id
      const benefit = benefitsData.find(b => b?.seniorId === seniorId)

      return (
        <div className="text-center text-lg mt-8 w-fit p-8 space-y-2 rounded mx-auto bg-white" >
          {!benefit?.seniorClaimed ? <>
            <p className='text-2xl'>You can now claim your benefit.</p>
            <div>Date: <span className='font-bold'>{benefit?.seniorDate}</span></div>
          </> : <>
            <p className='text-2xl'>You already claim your benefit.</p>
            <div>Next Available Date: <span className='font-bold'>{benefit?.seniorDate}</span></div>
          </>}
        </div>
      )
    }
  }

  return (
    <>
      {role !== "user" && <Searchbar />}
      <Table className="bg-neutral-50 rounded-lg">
        {role !== "user" && (
          <TableCaption>{seniorsData.length > 0 ? 'A list of your recent seniors.' : 'There\'s currently no data of seniors'}</TableCaption>
        )}
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
            <TableHead>Next Claimable Date</TableHead>
            <TableHead>Credentials</TableHead>
            {role !== "user" && <TableHead>Options</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {seniorsData
            .filter(seniorData => role === "user" ? sessId === seniorData.userId : seniorData)
            .map(({
              lastname,
              id,
              firstname,
              middlename,
              gender,
              birthdate,
              address,
              guardian,
              contactNumber,
              psaCertificate,
              pwdId,
              seniorId,
              philhealthId,
            }) => (
              <TableRow
                key={id}
                onClick={() =>
                  router.push(`/senior-citizen/${id}`)
                }
                className='cursor-pointer'
              >
                <TableCell>{lastname}</TableCell>
                <TableCell>{firstname}</TableCell>
                <TableCell>{middlename}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{birthdate}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell>{guardian}</TableCell>
                <TableCell>{contactNumber}</TableCell>
                <TableCell>
                  {benefitsData.find(b => b?.seniorId === id)?.seniorClaimed ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  {benefitsData.find(b => b?.seniorId === id)?.seniorDate}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {psaCertificate && (
                      <div className="flex items-center">
                        <Check />
                        <span>PSA Certificate</span>
                      </div>
                    )}
                    {pwdId && (
                      <div className="flex items-center">
                        <Check />
                        <span>PWD ID</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {seniorId && (
                      <div className="flex items-center">
                        <Check />
                        <span>Senior ID</span>
                      </div>
                    )}
                    {philhealthId && (
                      <div className="flex items-center">
                        <Check />
                        <span>Philhealth ID</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                {role !== "user" && (
                  <TableCell className="space-x-2" onClick={e => e.stopPropagation()}>
                    <SetClaimBtn
                      id={id}
                      key={id}
                      claimed={benefitsData.find(b => b?.seniorId === id)?.seniorClaimed}
                      currDate={benefitsData.find(b => b?.seniorId === id)?.seniorDate}
                    />
                    <Button asChild onClick={e => e.stopPropagation()}>
                      <Link href={`/senior-registry-edit/${id}`}>Edit</Link>
                    </Button>
                    <RemoveBtn id={id} />
                  </TableCell>
                )}
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
      {userBenefitClaimDisplay()}
    </>
  )
}
