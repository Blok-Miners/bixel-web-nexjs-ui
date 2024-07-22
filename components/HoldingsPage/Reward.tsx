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
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
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
    address: Address
    tokenDecimals: number
    symbol: string
    tokenPerWinner: number
    chainId: string
    _id: string
  }
}

export default function RewardTable() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [contestId, setContestId] = useState("")
  const [loading, setLoading] = useState(false)

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

  const [tx, setTx] = useState<Address | undefined>()

  const { writeContractAsync } = useWriteContract()

  const { data } = useWaitForTransactionReceipt({
    hash: tx,
  })

  const claimTokenReward = async (
    amount: number,
    chain: string,
    address: Address,
    decimals: number,
  ) => {
    try {
      const tx = await writeContractAsync({
        address: bscDepositContractAddress,
        abi: rewardAbi,
        functionName: "claimTokens",
        args: [address, parseUnits(String(amount), decimals)],
      })
      setTx(tx)
      return tx
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    getContestDetails()
  }, [contestId])

  const handleClaim = async (rewardId: string) => {
    setLoading(true)
    const poolInfo = rewards.find((reward) => reward.id === rewardId)
    console.log({ poolInfo })
    try {
      if (poolInfo?.rewardPool.assetType === AssetTypeEnum.Token) {
        const hash = await claimTokenReward(
          poolInfo.poolInfo.tokenPerWinner,
          poolInfo.poolInfo.chainId,
          poolInfo.poolInfo.address,
          poolInfo.poolInfo.tokenDecimals,
        )
        registerClaim(rewardId, hash)
      }
    } catch (error) {
      setLoading(false)
    }
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

  useEffect(() => {
    if (!data) return
    setLoading(false)
  }, [data])

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
              <TableCell>
                {reward.poolInfo.tokenPerWinner} {reward.poolInfo.symbol}
              </TableCell>
              <TableCell>
                {reward.claimed ? (
                  <Button disabled>Claimed</Button>
                ) : (
                  <Button
                    isLoading={loading}
                    disabled={loading}
                    onClick={() => handleClaim(reward.id)}
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
