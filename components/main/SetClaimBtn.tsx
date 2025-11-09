'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Switch } from "../ui/switch"
import { ChevronDownIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import { Calendar } from "../ui/calendar"
import { updateSeniorClaim } from "@/lib/actions/senior-register-action"


export default function SetClaimBtn({
  id,
  claimed,
  currDate,
}: {
  id: number
  claimed: boolean | undefined
  currDate: string | null | undefined
}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [open, setOpen] = useState(false)
  const [isClaimed, setIsClaimed] = useState(claimed)
  const [date, setDate] = useState<Date | undefined>(currDate ? new Date(currDate) : undefined)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isClaimed !== undefined && date) {
      await updateSeniorClaim(id, isClaimed, date)
      setOpenDialog(false)
    }
  }

  return (
    <Dialog key={id} open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Set Claim</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Benefit Claim</DialogTitle>
          <DialogDescription>
            Make changes to senior's benefits here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form id="form" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="flex gap-3">
              <Label htmlFor="claimed">Senior Benefit Claimed</Label>
              <Switch id='claimed' checked={isClaimed} onCheckedChange={setIsClaimed} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="">Next Claimable Date</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date)
                      setOpen(false)
                      // onValueChange(date)
                    }}
                    disabled={{
                      before: new Date(),
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="form" onClick={() => setOpenDialog(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
