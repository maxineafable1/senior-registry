'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Searchbar from './Searchbar';
import { Button } from '../ui/button';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { Check } from 'lucide-react';

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
    benefitClaimed: boolean;
    psaCertificate: boolean;
    pwdId: boolean;
    seniorId: boolean;
    philhealthId: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
  }[]
  role: string | undefined
}

export default function SeniorsTable({
  seniorsData,
  role,
}: Props) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <>
      <Searchbar />
      <Table className="bg-neutral-50 rounded-lg">
        <TableCaption>{seniorsData.length > 0 ? 'A list of your recent seniors.' : 'There\'s currently no data of seniors'}</TableCaption>
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
            {role !== "user" && <TableHead>Options</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {seniorsData.map(({
            lastname,
            id,
            firstname,
            middlename,
            gender,
            birthdate,
            address,
            guardian,
            contactNumber,
            benefitClaimed,
            psaCertificate,
            pwdId,
            seniorId,
            philhealthId,
          }) => (
            <TableRow
              key={id}
              onClick={() => {
                if (!isDeleting)
                  router.push(`/senior-citizen/${id}`)
              }}
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
              <TableCell>{benefitClaimed ? 'Yes' : 'No'}</TableCell>
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
                <TableCell className="space-x-2">
                  <Button asChild onClick={e => e.stopPropagation()}>
                    <Link href={`/senior-registry-edit/${id}`}>Edit</Link>
                  </Button>
                  <RemoveBtn id={id} setIsDeleting={setIsDeleting} />
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
    </>
  )
}
