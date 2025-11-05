'use client'

import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { Button } from '../ui/button'

export default function SelectionBtn({
  text,
  setChosenRole,
}: {
  text: 'user' | 'admin' | 'staff'
  setChosenRole: Dispatch<SetStateAction<"staff" | "admin" | "user" | null>>
}) {
  return (
    <Button
      onClick={() => setChosenRole(text)}
      className='bg-neutral-400 text-neutral-800 hover:bg-neutral-500
        text-xl rounded-full uppercase cursor-pointer py-6 px-24
      '
    >
      {text}
    </Button>
  )
}
