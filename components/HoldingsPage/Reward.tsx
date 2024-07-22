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
import { AssetTypeEnum } from "@/types/services/reward"
import { useWriteContract } from "wagmi"
import { Address } from "@/types/web3"
import { bscDepositContractAddress } from "@/lib/chains"
import { rewardAbi } from "@/lib/rewardAbi"
import { parseUnits } from "viem"

type Reward = {
  id: string
  claimed: boolean
  contest: {
    type: string
  }
  rewardPool: {
    assetType: AssetTypeEnum
    assetId: string
    id: string
  }
  poolInfo: {
    tokenPerWinner: number
    _id: string
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
    console.log({ reward })
  }
  useEffect(() => {
    getRewards()
  }, [])

  const getContestDetails = async () => {
    if (!contestId) return
    const ContestServices = new ContestService()
    const reward = await ContestServices.getContestDetails(contestId)
    console.log({ reward1: reward })
  }

  const { writeContractAsync } = useWriteContract()

  const claimTokenReward = async (
    amount: string,
    chain: string,
    address: Address,
    decimals: number,
  ) => {
    if (!contestId) return
    try {
      const tx = writeContractAsync({
        address: bscDepositContractAddress,
        abi: rewardAbi,
        functionName: "claimTokens",
        args: [address, parseUnits(amount, decimals)],
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getContestDetails()
  }, [contestId])

  const handleClaim = async (
    rewardId: string,
    poolId: string,
    rewardPoolId: string,
    rewardType: AssetTypeEnum,
    amount?: number,
  ) => {
    try {
      let hash = ""
      if (rewardType === AssetTypeEnum.Token) {
      }
    } catch (error) {}
  }

  const registerClaim = async (rewardId: string, hash?: Address) => {
    const rewardService = new RewardService()

    await rewardService.claimReward(rewardId, hash ? { hash } : {})

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
              <TableCell className="capitalize">
                {reward.contest.type.split("_").map((text) => (
                  <span>{text.toLowerCase()} </span>
                ))}
              </TableCell>
              <TableCell>{reward.poolInfo.tokenPerWinner}</TableCell>
              <TableCell>
                {reward.claimed ? (
                  <Button disabled>Claimed</Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleClaim(
                        reward.id,
                        reward.poolInfo._id,
                        reward.rewardPool.id,
                        reward.rewardPool.assetType,
                        reward.poolInfo.tokenPerWinner,
                      )
                    }
                  >
                    Claim
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
