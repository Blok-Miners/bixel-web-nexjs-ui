"use client"
import { useState } from "react"
import { BugDialog } from "./BugDialog"
import Image from "next/image"
import { FaCheck } from "react-icons/fa"
import { ScrollArea } from "../ui/scroll-area"

export default function Box() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="row-span-2 flex w-full flex-col gap-4 rounded-lg border border-th-accent-2 bg-th-black p-6">
        <div className="text-center font-bold">BUG BOUNTY</div>
        <div className="text-th-accent-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          odit quia voluptatem totam illum saepe.
        </div>
        <div className="flex flex-col gap-4 overflow-auto rounded-lg h-full border border-th-accent-2 p-4">
          <div className="flex cursor-pointer items-center gap-4 rounded-lg bg-th-black-2 px-4 py-2 hover:bg-[rgba(35,46,39,0.7)]">
            <div className="aspect-square h-12">
              <Image
                src="/product/Logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="h-full w-full"
              />
            </div>
            <div className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              sequi.
            </div>
            <div className="text-green-300">
              <FaCheck />
            </div>
          </div>
        </div>

        <div className="mt-auto w-full">
          <BugDialog open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  )
}
