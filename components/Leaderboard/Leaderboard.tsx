import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaMedal } from "react-icons/fa6"
import { ScrollArea } from "../ui/scroll-area"

export const Leaderboard = () => {
  return (
    <ScrollArea className="mx-auto mb-4 mt-8 h-[80vh] w-full max-w-6xl rounded-2xl border-2 border-th-accent-2 bg-th-black-2 p-4 px-10 shadow-2xl">
      <div className="w-full text-center text-2xl font-semibold">
        Leaderboard
      </div>
      <Table className="mt-8 w-full text-base">
        <TableHeader className="border-th-accent-2">
          <TableRow className="border-th-accent-2">
            <TableHead className="text-center text-th-accent-2">Rank</TableHead>
            <TableHead className="text-center text-th-accent-2">User</TableHead>
            <TableHead className="text-center text-th-accent-2">
              Score
            </TableHead>
            <TableHead className="text-center text-th-accent-2">
              Reward
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-th-accent-2">
            <TableCell className="flex items-center justify-center gap-4 text-center">
              <span className="text-yellow-300">
                <FaMedal />
              </span>
              1
            </TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>

          <TableRow className="border-th-accent-2">
            <TableCell className="flex items-center justify-center gap-4 text-center">
              <span className="text-gray-300">
                <FaMedal />
              </span>
              2
            </TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>

          <TableRow className="border-th-accent-2">
            <TableCell className="flex items-center justify-center gap-4 text-center">
              <span className="text-amber-600">
                <FaMedal />
              </span>
              3
            </TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
          <TableRow className="border-th-accent-2">
            <TableCell className="text-center">4</TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
          <TableRow className="border-th-accent-2">
            <TableCell className="text-center">5</TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
          <TableRow className="border-th-accent-2">
            <TableCell className="text-center">6</TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
          <TableRow className="border-th-accent-2">
            <TableCell className="text-center">7</TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
          <TableRow className="border-th-accent-2">
            <TableCell className="text-center">8</TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
          <TableRow className="border-th-accent-2">
            <TableCell className="text-center">9</TableCell>
            <TableCell className="text-center">test</TableCell>
            <TableCell className="text-center">1000</TableCell>
            <TableCell className="text-center">$100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
