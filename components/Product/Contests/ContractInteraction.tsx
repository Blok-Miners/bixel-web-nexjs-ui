"use client"

import React, { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { ContestService } from "@/services/contest"
import { ISmartContractInteraction } from "@/types/services/smartContractInteraction"
import { Address } from "@/types/web3"
import { Loader2 } from "lucide-react"

export const ContractInteraction = ({ id }: { id: string }) => {
  const contestService = new ContestService()
  const [Opened, setOpended] = useState(false)
  const [interaction, setInteraction] = useState<ISmartContractInteraction>()
  const [loading, setLoading] = useState(false)
  const [verifyStatus,setVerifyStatus] = useState(false)
  const interactionDetails = async () => {
    try {
      const res = await contestService.getInteractionDetails(id)
      setInteraction({
        id: res.interaction._id,
        contractAddress: res.interaction.contract.address as Address,
        chain: res.chain.chainId,
        url: res.interaction.url,
        description: res.interaction.description,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const verifyTransaction = async () => {
    setLoading(true)
    try {
      if (!id) return
      const res = await contestService.verifySmartContractTask(id)
      setVerifyStatus(res.success)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const mySubmission = async()=>{
    try {
      const res = await contestService.getMyVerifiedContractSubmission(id)
      if(res.success !== true) return
      setVerifyStatus(res.success)
      setOpended(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    interactionDetails()
    mySubmission()
  }, [])

  return (
    <div className="grid w-full grid-cols-3 gap-4 rounded-2xl bg-th-accent-2/10 p-4">
      <span className="col-span-3 rounded-2xl px-4 py-1 text-center text-xl font-bold">
        Contract Interaction
      </span>
      <div className="col-span-3 space-y-2 rounded-xl p-2 text-sm">
        <span className="w-full text-center">Contract Address</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium truncate">
          {interaction?.contractAddress}
        </div>
      </div>
      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <span className="text-sm">Chain</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          {interaction?.chain}
        </div>
      </div>
      <div className="col-span-2 space-y-2 rounded-xl p-2 ">
        <span className="text-sm">Interaction URL</span>

        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium truncate">
          {interaction?.url}
        </div>
      </div>
      <div className="col-span-3 h-fit space-y-2 rounded-xl p-2">
        <span className="text-sm">Description </span>

        <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          {interaction?.description}
        </div>
      </div>
      {Opened ? verifyStatus ? (
         <div className="col-span-3 w-full rounded-xl bg-th-accent-2/10 h-fit p-4 text-center font-bold text-green-600">
         Verified
       </div>
      ) : (
        <Button className="col-span-3 m-2" onClick={verifyTransaction}>
          {loading  ? <Loader2 className="animate-spin" /> :  "Verify"}
        </Button>
      ) : (
        <>
          <a
            href={interaction?.url}
            target="_blank"
            className="col-span-3"
            rel="noreferrer noopener"
            onClick={() => setOpended(true)}
          >
            <Button className="col-span-3 m-2 w-full">Open</Button>
          </a>
        </>
      )}
    </div>
  )
}
