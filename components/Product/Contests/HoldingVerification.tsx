"use client"

import React, { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HoldingsService } from "@/services/holdings"
import { Loader2 } from "lucide-react"

import { ChainService } from "@/services/chain"
import { useRouter } from "next/navigation"
import { ContestService } from "@/services/contest"
interface IdataProps {
  assetType: string
  chain: string
  contractAddress?: string
  createdAt: string
  description: string
  updatedAt: string
  _id: string
  __v: number
  submissions: []
}

export const HoldingVerification = ({
  id,
  interactionId,
  mode,
}: {
  id: string
  interactionId: string
  mode: string
}) => {
  const [assetType, setAssetType] = useState("")
  const [data, setData] = useState<IdataProps | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const chains = new ChainService()
  const [chainId, setChainId] = useState(0)
  const [chain, setChain] = useState([])

  const getHoldings = async () => {
    const allChain = await chains.getChains()
    if (allChain) {
      setChain(allChain)
    }
    const service = new HoldingsService()
    try {
      const response = await service.getHoldingsVerification(interactionId)
      if (!response) {
        return
      }
      setData(response)
      const newChainId = allChain?.filter((item: any) => {
        return item.id === response?.chain
      })
      setChainId(newChainId[0].chainId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHoldings()
    verifySubmission()
    checkOwnership()
  }, [])

  const verifyholding = async () => {
    setLoading(true)
    const service = new HoldingsService()
    try {
      const response = await service.verifyholding(id)
      if (!response) {
        return
      }
      console.log(response)
      verifySubmission()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const verifySubmission = async () => {
    const service = new HoldingsService()
    try {
      const response = await service.verifyHoldingSubmission(id)
      console.log(response)
      if (response.success === true) {
        setVerified(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()
  const [isOwner, setIsOwner] = useState(false)
  const checkOwnership = async () => {
    try {
      const contestService = new ContestService()
      const isOwnerResponse = await contestService.isProductOwner(id)
      setIsOwner(isOwnerResponse.isOwner)
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick = () => {
    verifyholding()

    console.log("Selected Asset Type:", assetType)
  }

  return (
    <>
      {data && (
        <div className="grid w-full grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4">
          <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
            Holding Verification
          </span>
          <div className="col-span-2 space-y-2 rounded-xl p-2 text-sm">
            <span className="text-sm">Contract Address</span>
            <div className="overflow-hidden rounded-xl bg-th-accent-2/10 !p-4 text-base font-medium">
              {data.contractAddress}
            </div>
          </div>
          <div className="col-span-1 space-y-2 rounded-xl p-2 text-sm">
            <span className="text-sm">Chain Id</span>
            <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
              {chainId && chainId}
            </div>
          </div>

          <div className="col-span-1 flex flex-col space-y-2 rounded-xl p-2">
            <span className="text-sm">Asset Type</span>
            <div className="col-span-1 flex rounded-xl bg-th-accent-2/10 p-4">
              {/* <Select onValueChange={(value) => setAssetType(value)}>
            <SelectTrigger className="w-full rounded-xl border-none bg-transparent text-base font-medium focus:ring-0">
              <SelectValue placeholder="Select" className="outline-none" />
            </SelectTrigger>
            <SelectContent className="text-xl font-medium text-white">
              <SelectItem value="NFT" className="text-white">
                NFT
              </SelectItem>
              <SelectItem value="Token" className="text-white">
                Token
              </SelectItem>
            </SelectContent>
          </Select> */}
              {data.assetType}
            </div>
          </div>
          {verified ? (
            <div className="col-span-2 mt-auto h-fit rounded-xl bg-th-accent-2/10 p-4 text-center font-bold text-green-600">
              Verified
            </div>
          ) : (
            <Button
              className="col-span-2 m-2"
              onClick={() => handleButtonClick()}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify"}
            </Button>
          )}
          {mode === "LEADERBOARD" && isOwner && (
            <Button className="col-span-2" onClick={() => router.push(`/leaderboard/${id}`)}>
              Leaderboard
            </Button>
          )}
        </div>
      )}
    </>
  )
}
