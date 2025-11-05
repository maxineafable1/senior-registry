'use client'

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { removeAssociatedSenior, setSeniorToUser } from "@/lib/actions/auth-action"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function UserDropdownList({
  seniorsData,
  userId,
}: {
  seniorsData: {
    id: number;
    lastname: string;
    firstname: string;
    userId: number | null;
  }[]
  userId: number
}) {
  const [open, setOpen] = useState(false)
  const seniorAcc = seniorsData.find(({ userId: curUserId }) => curUserId === userId)
  // const seniorId = seniorsData.find(({ userId: curUserId }) => curUserId === userId)?.id
  const seniorId = seniorAcc?.id ?? null
  const fullname = seniorAcc ? `${seniorAcc?.lastname}, ${seniorAcc?.firstname}` : null

  console.log(seniorId)
  console.log(fullname)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {fullname ?? 'Select a senior...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {!seniorId && (
            <CommandInput placeholder="Search senior..." className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No senior found.</CommandEmpty>
            <CommandGroup>
              {seniorsData
                .filter(senior => seniorId ? (senior.id === seniorId) : !senior.userId)
                .map(({ firstname, id, lastname }) => (
                  <CommandItem
                    key={id}
                    value={`${lastname}, ${firstname}`}
                    onSelect={async () => {
                      await setSeniorToUser(id, userId)
                      setOpen(false)
                    }}
                  >
                    <span className="font-bold">{id}.</span> {`${lastname}, ${firstname}`}
                    <Check
                      className={cn(
                        "ml-auto",
                        seniorId === id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
          {seniorId && (
            <Button
              className="w-full"
              onClick={async () => {
                await removeAssociatedSenior(seniorId)
              }}
            >
              Remove Senior
            </Button>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
