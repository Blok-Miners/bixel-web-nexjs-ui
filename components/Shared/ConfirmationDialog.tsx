import { Dispatch, ReactNode } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { StatusEnum } from "@/types/confirmationTypes"
import Link from "next/link"

interface IDialog {
  open: boolean
  setOpen: Dispatch<boolean>
  status: StatusEnum
  message: ReactNode
  title: string
  link?: string
  linkText?: string
}

export default function ConfirmationDialog({
  open,
  setOpen,
  status,
  message,
  title,
  link,
  linkText,
}: IDialog) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter className="flex gap-2">
          {link && linkText && (
            <Link href={link} target="_blank" rel="noreferrer noopener">
              <Button type="submit">{linkText}</Button>
            </Link>
          )}
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
