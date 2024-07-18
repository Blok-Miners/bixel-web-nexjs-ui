import React from "react"
import { ScrollArea } from "../ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export const ActivityCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-start text-lg">Activities</div>
      <ScrollArea className="my-4 h-[20rem] w-full rounded-2xl bg-th-accent-2/10 p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-th-accent-2">
              <TableHead className="text-th-accent-2">Product</TableHead>
              <TableHead className="text-th-accent-2">Activity</TableHead>
              <TableHead className="text-th-accent-2">Reward</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Product 1</TableCell>
              <TableCell>Activity 1</TableCell>
              <TableCell>Reward 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
