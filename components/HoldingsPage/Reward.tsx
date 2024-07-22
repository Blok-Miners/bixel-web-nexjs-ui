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

type Reward = {
  id: string
  claimed: boolean
  rewardPool: {
    assetType: string
    assetId: string
  }
  poolInfo: {
    tokenPerWinner: number
  }
}

export default function RewardTable() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [contestId, setContestId] = useState("")
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

  const getContestDetails = async () => {
    const ContestServices = new ContestService()
    const reward = await ContestServices.getContestDetails(contestId)
    console.log(reward)
  }

  useEffect(() => {
    getContestDetails()
  }, [])

  const handleClaim = async (rewardId: string) => {
    const rewardService = new RewardService()
    await rewardService.claimReward(rewardId ,{})

    setRewards((prevRewards) =>
      prevRewards.map((reward) =>
        reward.id === rewardId ? { ...reward, claimed: true } : reward,
      ),
    )
  }

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
          {rewards.map((reward, index) => (
            <TableRow key={index}>
              <TableCell>{reward.rewardPool.assetType}</TableCell>
              <TableCell>{reward.poolInfo.tokenPerWinner}</TableCell>
              <TableCell>
                {reward.claimed ? (
                  <Button disabled>Claimed</Button>
                ) : (
                  <Button onClick={() => handleClaim(reward.id)}>Claim</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
