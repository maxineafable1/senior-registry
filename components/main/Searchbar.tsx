'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FormEvent, useCallback, useRef } from "react"
import { Button } from "../ui/button"

export default function Searchbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  console.log(pathname)

  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (inputRef.current && inputRef.current.value)
      router.push(pathname + '?' + createQueryString('search', inputRef.current.value))
    else
      router.push(pathname)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 mb-8 max-w-md">
      <div className="space-y-2 w-md">
        <Label htmlFor="search">Search</Label>
        <Input
          ref={inputRef}
          id="search"
          type="search"
          className="bg-neutral-50"
          placeholder={`${pathname === '/manage-users' ? 'Enter username' : 'Enter senior citizen\'s name'}`}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}
