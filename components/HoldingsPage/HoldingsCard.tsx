import React from "react"
import { ScrollArea } from "../ui/scroll-area"
import { HoldingsTable } from "./HoldingTable"

export const HoldingsCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-start text-lg">Holdings</div>
      <ScrollArea className="my-4 h-[20rem] w-full rounded-2xl bg-th-accent-2/10 p-4">
        <HoldingsTable />
      </ScrollArea>
    </div>
  )
}
