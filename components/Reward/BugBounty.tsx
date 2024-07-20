"use client"
import React, { useState } from "react"

import { FaLongArrowAltRight } from "react-icons/fa"
import BountyDetails from "./BugBounty/BountyDetails"
import ContestDetails from "./Blockchain/ContestDetails"
import { ContestModeEnum } from "@/types/services/contest"

export const BugBounty = ({ chain }: any) => {
  const [step, setStep] = useState(1)
  const [bugBounty, setBugBounty] = useState({
    description: "",
    protocolUrl: "",
    contractAddress: "",
    chain: "",
  })

  const [mode, setMode] = useState<ContestModeEnum>(ContestModeEnum.LEADERBOARD)
  const [totalWinners, setTotalWineers] = useState(0)

  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")
  const [step3Error, setStep3Error] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setBugBounty((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleBountyClick = () => {
    console.log(bugBounty)
    console.log(totalWinners)
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex gap-4 bg-th-black-2 px-4 text-sm text-slate-200 shadow-lg">
        <button
          onClick={() => setStep(1)}
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>Bounty Details</div>
        </button>
        <button
          onClick={() => setStep(2)}
          className={`font-medium ${step === 2 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>
            <FaLongArrowAltRight />
          </div>
          <div>Contest type</div>
        </button>
      </div>
      <div className="mt-8 h-[90%] overflow-y-auto px-4">
        {step === 1 && (
          <BountyDetails
            step={step}
            setStep={setStep}
            bugBounty={bugBounty}
            setBugBounty={setBugBounty}
            handleChange={handleChange}
            chain={chain}
          />
        )}
        {step === 2 && (
          <ContestDetails
            setStep2Error={setStep2Error}
            mode={mode}
            setMode={setMode}
            setStep={setStep}
            ContestModeEnum={ContestModeEnum}
            setTotalWineers={setTotalWineers}
            handleContestClick={handleBountyClick}
            step2Error={step2Error}
            totalWinners={totalWinners}
          />
        )}
      </div>
    </>
  )
}
