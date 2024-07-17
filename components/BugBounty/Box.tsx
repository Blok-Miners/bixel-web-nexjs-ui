"use client"
import { useState } from "react"

import Iframe from "../Iframe/Iframe"
import { BugDialog } from "./BugDialog"

export default function Box() {
    const [open, setOpen] = useState(false)
  return (

    <>
      <div className="flex w-fit max-w-[500px] flex-col gap-4 rounded-lg border border-th-accent-2 bg-th-black-2 p-6">
        <div className="flex flex-col gap-2">
          <div className="font-bold">Title :</div>
          <div className="text-th-accent-2"> BUG BOUNTY </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Description :</div>
          <div className="text-th-accent-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            ea aut quod adipisci ipsa quos eius impedit similique tempore iusto.
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">List :</div>
          <div className="pl-4 text-th-accent-2">
            - Lorem ipsum dolor sit amet.
          </div>
          <div className="pl-4 text-th-accent-2">
            - Lorem ipsum dolor sit amet.
          </div>
          <div className="pl-4 text-th-accent-2">
            - Lorem ipsum dolor sit amet.
          </div>
          <div className="pl-4 text-th-accent-2">
            - Lorem ipsum dolor sit amet.
          </div>
        </div>
        <div className="ml-auto w-fit">
          <BugDialog  open={open} setOpen={setOpen}/>
        </div>
      </div>
      
    </>
  )
}
