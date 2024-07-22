"use client"
import { useEffect, useState } from "react"
import CreateBlockchainReward from "./BlockchainReward"
import CreateSocialReward from "./SocialReward"

import { BugBounty } from "./BugBounty"

import Holdings from "./Holdings"
import { ChainService } from "@/services/chain"
import Registration from "./Registration"
import { ProjectSubmission } from "./ProjectSubmission"

export default function CreateReward({ productId }: { productId: string }) {
  const chains = new ChainService()
  const [chain, setChain] = useState([])
  const getAllChain = async () => {
    const allChain = await chains.getChains()
    if (allChain) {
      setChain(allChain)
      console.log(allChain)
    }
  }
  useEffect(() => {
    getAllChain()
  }, [])

  const [reward, setReward] = useState("blockchain")
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, files } = e.target

  //   if (type === "file" && files) {
  //     const file = files[0]
  //     const reader = new FileReader()

  //     reader.onload = (event: any) => {
  //       try {
  //         const json = JSON.parse(event.target.result as string)
  //         setBlockchainData({ ...blockchainData, abi: json })
  //       } catch (error) {
  //         console.error("Error parsing JSON:", error)
  //       }
  //     }

  //     if (file) {
  //       reader.readAsText(file)
  //     }
  //   } else {
  //     setBlockchainData({ ...blockchainData, [name]: value })
  //   }
  // }

  return (
    <div className="mx-auto mt-6 max-w-6xl">
      <div className="mx-auto text-2xl font-bold">Create Contest</div>
      <div className="mt-6 flex gap-4">
        <div className="h-[80vh] w-[350px] rounded-xl bg-th-black-2 p-4">
          {/* <div className="text-lg font-bold">Reward type</div> */}
          <div className="mt-6 flex flex-col gap-4 text-lg font-bold">
            <div
              className={` ${
                reward === "blockchain" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("blockchain")
              }}
            >
              Contract Interaction
            </div>
            <div
              className={` ${
                reward === "social" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("social")
              }}
            >
              Social Media Interaction
            </div>
            <div
              className={` ${
                reward === "holdings" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("holdings")
              }}
            >
              Holdings Verification
            </div>

            <div
              className={` ${
                reward === "Project Submission"
                  ? "bg-th-black"
                  : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("Project Submission")
              }}
            >
              Project Submission
            </div>

            <div
              className={` ${
                reward === "Bug Bounty" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("Bug Bounty")
              }}
            >
              Bug Bounty
            </div>

            <div
              className={` ${
                reward === "Registration Verification"
                  ? "bg-th-black"
                  : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("Registration Verification")
              }}
            >
              Registration Verification
            </div>
          </div>
        </div>
        <div className="h-[80vh] w-[1000px] rounded-xl bg-th-black-2 p-4">
          {reward === "blockchain" ? (
            <CreateBlockchainReward productId={productId} />
          ) : reward === "social" ? (
            <CreateSocialReward  productId={productId}/>
          ) : reward === "Project Submission" ? (
            <ProjectSubmission chain={chain} productId={productId} />
          ) : reward === "Bug Bounty" ? (
            <BugBounty chain={chain} productId={productId} />
          ) : reward === "holdings" ? (
            <Holdings chain={chain} productId={productId} />
          ) : reward === "Registration Verification" ? (
            <Registration chain={chain} productId={productId} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
