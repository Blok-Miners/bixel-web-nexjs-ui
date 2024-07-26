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
import { AssetTypeEnum, INftType } from "@/types/services/reward"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { Address } from "@/types/web3"
import { bscDepositContractAddress } from "@/lib/chains"
import { rewardAbi } from "@/lib/rewardAbi"
import { parseUnits } from "viem"
import { Copy, CopyCheck } from "lucide-react"

type Reward = {
  id: string
  claimed: boolean
  contest: {
    type: string
  }
  rewardPool: {
    claimedWinners: number
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
    nftType?: string
    NFTs?: string[]
    coupon?: string
    nftAmount1155?: string[]
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
    console.log(reward, "reward")
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

  const claim721Reward = async (address: Address, tokenId: string) => {
    try {
      console.log(address, tokenId)
      const tx = await writeContractAsync({
        address: bscDepositContractAddress,
        abi: rewardAbi,
        functionName: "claimNft721",
        args: [address, tokenId],
      })
      console.log(tx, "vfdvjdbvfghd")
      setTx(tx)
      return tx
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const claim1155Reward = async (
    address: Address,
    tokenId: string,
    amount: string,
  ) => {
    try {
      console.log(address, tokenId)
      const tx = await writeContractAsync({
        address: bscDepositContractAddress,
        abi: rewardAbi,
        functionName: "claimNft1155",
        args: [address, tokenId, amount],
      })
      console.log(tx, "vfdvjdbvfghd")
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
      } else if (poolInfo?.rewardPool.assetType === AssetTypeEnum.NFT) {
        if (poolInfo?.poolInfo.nftType === INftType.ERC721) {
          const tokenId = poolInfo.rewardPool.claimedWinners
          const hash = await claim721Reward(
            poolInfo.poolInfo.address,
            poolInfo.poolInfo.NFTs![tokenId],
          )
          registerClaim(rewardId, hash)
        } else {
          const tokenId = poolInfo.rewardPool.claimedWinners
          const hash = await claim1155Reward(
            poolInfo.poolInfo.address,
            poolInfo.poolInfo.NFTs![tokenId],
            poolInfo.poolInfo.nftAmount1155![tokenId],
          )
          registerClaim(rewardId, hash)
        }
      } else if (poolInfo?.rewardPool.assetType === AssetTypeEnum.Coupon) {
        registerClaim(rewardId)
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
    setLoading(false)
  }

  useEffect(() => {
    if (!data) return
    setLoading(false)
  }, [data])

  const copyToClipboard = (coupon: string) => {
    navigator.clipboard.writeText(coupon)
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
              <TableCell>
                {reward.rewardPool?.assetType === "Coupon" ? (
                  reward.poolInfo?.coupon
                ) : (
                  <>
                    {reward.poolInfo?.tokenPerWinner} {reward.poolInfo?.symbol}{" "}
                    {reward.poolInfo?.nftType}
                  </>
                )}
              </TableCell>
              <TableCell>
                {reward.claimed ? (
                  reward.rewardPool.assetType === "Coupon" ? (
                    <div className="flex gap-2">
                      <Button disabled>Claimed</Button>
                      <Button
                        onClick={() =>
                          copyToClipboard(reward.poolInfo?.coupon!)
                        }
                      >
                        <Copy />
                      </Button>
                    </div>
                  ) : (
                    <Button disabled>Claimed</Button>
                  )
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
