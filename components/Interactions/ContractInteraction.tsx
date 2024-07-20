"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"

export const ContractInteraction = () => {
  const [Opened, setOpended] = useState(false)

  return (
    <div className="grid w-full max-w-xl grid-cols-3 gap-4 rounded-2xl bg-th-accent-2/10 p-4">
      <span className="col-span-3 rounded-2xl px-4 py-1 text-center text-xl font-bold">
        Contract Interaction
      </span>
      <div className="col-span-3 space-y-2 rounded-xl p-2 text-sm">
        <span className="w-full text-center">Contract Address</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          0x11111111111111111111111111
        </div>
      </div>
      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <span className="text-sm">Chain</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          0x1111111111
        </div>
      </div>
      <div className="col-span-2 space-y-2 rounded-xl p-2">
        <span className="text-sm">Interaction URL</span>

        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          https://www.interactiveurl.com
        </div>
      </div>
      <div className="col-span-3 h-fit space-y-2 rounded-xl p-2">
        <span className="text-sm">Description </span>

        <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          voluptas! Itaque ad laborum voluptates, voluptatibus quas quidem
          tempore!
        </div>
      </div>
      <Button className="col-span-3 m-2" onClick={() => setOpended(true)}>
        {Opened ? "Verify" : "Open"}
      </Button>
    </div>
  )
}
