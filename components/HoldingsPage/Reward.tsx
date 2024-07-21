import React, { useEffect, useState } from "react"
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
import { ContestService } from "@/services/contest"
import { RewardService } from "@/services/reward"

export default function RewardTable() {
  const [rewards, setRewards] = useState([])
  const [contestId, setContestId] = useState('')
  const getRewards = async () => {
    const rewardService = new RewardService()
    const reward = await rewardService.getClaimableRewards()
    console.log(reward)
    setContestId(reward.contestId)
    if (!reward) return
    setRewards(reward)
  }
  useEffect(() => {
    getRewards()
  }, [])

  return (
    <ScrollArea className="h-[400px] rounded-2xl bg-th-accent-2/10 p-4">
      <Table>
        <TableHeader>
          <TableRow className="border-th-accent-2 text-th-accent-2">
            <TableHead className="text-th-accent">Contest</TableHead>
            <TableHead className="text-th-accent">Reward</TableHead>
            <TableHead className="text-th-accent">Claim</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Contest1</TableCell>
            <TableCell>Reward1</TableCell>
            <TableCell>
              <Button>Claim</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
