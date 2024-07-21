"use client"

import React, { useEffect, useState } from "react"
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
import { shortenAddress } from "@/lib/utils"
import { leaderboard } from "@/services/leaderboard"
import { Address } from "@/types/web3"

interface LeaderboardProps {
  contestId: string
}

interface User {
  id: string
  email: string | null
  userType: string
  walletAddress: Address
}

interface TableDataItem {
  contestId: string
  createdAt: string
  id: string
  rewardDistributed: boolean
  score: string
  updatedAt: string
  user: User
  eligible: boolean
}

export default function Leaderboard({ contestId }: LeaderboardProps) {
  const [mode, setMode] = useState("")
  const [tabledata, setTabledata] = useState<TableDataItem[]>([])
  const fetchLeaderboard = async () => {
    try {
      const response = new leaderboard()
      console.log(contestId)
      const res = await response.getLeaderboardbyId(contestId)
      console.log(res)
      setTabledata(res.data)
      setMode(res.mode)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [contestId])

  useEffect(() => {
    console.log(tabledata)
  }, [tabledata])

  return (
    <ScrollArea className="mx-auto mb-4 mt-8 h-[80vh] w-full max-w-6xl rounded-2xl border-2 border-th-accent-2 bg-th-black-2 p-4 px-10 shadow-2xl">
      {mode === "LEADERBOARD" && (
        <>
          <div className="w-full text-center text-2xl font-semibold">
            Leaderboard
          </div>
          <Table className="mt-8 w-full text-base">
            <TableHeader className="border-th-accent-2">
              <TableRow className="border-th-accent-2">
                <TableHead className="text-center text-th-accent-2">
                  Rank
                </TableHead>
                <TableHead className="text-center text-th-accent-2">
                  User
                </TableHead>
                <TableHead className="text-center text-th-accent-2">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabledata.map((data, index) => (
                <TableRow key={index} className="border-th-accent-2">
                  <TableCell className="flex items-center justify-center gap-4 text-center">
                    {index === 0 && (
                      <span className="text-yellow-300">
                        <FaMedal />
                      </span>
                    )}

                    {index === 1 && (
                      <span className="text-gray-300">
                        <FaMedal />
                      </span>
                    )}
                    {index === 2 && (
                      <span className="text-amber-700">
                        <FaMedal />
                      </span>
                    )}
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {shortenAddress(data.user.walletAddress)}
                  </TableCell>
                  <TableCell className="text-center">{data.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {mode === "TIMEFRAME" && (
        <>
          <div className="w-full text-center text-2xl font-semibold">
            Timeframe
          </div>
          <Table className="mt-8 w-full text-base">
            <TableHeader className="border-th-accent-2">
              <TableRow className="border-th-accent-2">
                <TableHead className="text-center text-th-accent-2">
                  Sr. No.
                </TableHead>
                <TableHead className="text-center text-th-accent-2">
                  User
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabledata
                .filter((data) => data.eligible)
                .map((data, index) => (
                  <TableRow key={index} className="border-th-accent-2">
                    <TableCell className="flex items-center justify-center gap-4 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {shortenAddress(data.user.walletAddress)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </ScrollArea>
  )
}
