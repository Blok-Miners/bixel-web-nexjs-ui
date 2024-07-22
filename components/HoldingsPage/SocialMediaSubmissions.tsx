import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"

export const SocialMediaSubmissions = () => {
  return (
    <div>
      <ScrollArea className="h-[400px] rounded-2xl bg-th-accent-2/10 p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-th-accent-2 text-th-accent-2">
              <TableHead className="text-th-accent">Social Media</TableHead>
              <TableHead className="text-th-accent">Interaction Type</TableHead>
              <TableHead className="text-th-accent">Username</TableHead>
              <TableHead className="text-th-accent">Verify</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>facebook</TableCell>
              <TableCell>type</TableCell>
              <TableCell>username</TableCell>
              <TableCell>
                <Button>Verify</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
