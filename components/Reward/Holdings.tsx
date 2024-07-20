"use client"

import { useState } from "react"
import { FaLongArrowAltRight } from "react-icons/fa"
import HoldingsContract from "./Holdings/HoldingsContract"
import ContestDetails from "./Blockchain/ContestDetails"
import { ContestModeEnum } from "@/types/services/contest"

export default function Holdings({ chain }: any) {
  const [step, setStep] = useState(1)
  const [chainId, setChainID] = useState("")
  const [mode, setMode] = useState<ContestModeEnum>(ContestModeEnum.LEADERBOARD)
  const [totalWinners, setTotalWineers] = useState(0)

  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")
  const [step3Error, setStep3Error] = useState("")

  const handleContestClick =() => {
    console.log("clicked")
  }
  return (
    <>
      <div className="sticky top-0 z-10 flex gap-4 bg-th-black-2 px-4 text-sm text-slate-200 shadow-lg">
        <button
          onClick={() => setStep(1)}
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>Contract Details</div>
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
        <button
          onClick={() => setStep(3)}
          className={`font-medium ${step === 3 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>
            <FaLongArrowAltRight />
          </div>
          <div>Reward type</div>
        </button>
      </div>
      <div className="mt-8 h-[90%] overflow-y-auto px-4">
        {step === 1 && (
          <HoldingsContract
            chain={chain}
            chainId={chainId}
            setChainID={setChainID}
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
            handleContestClick={handleContestClick}
            step2Error={step2Error}
            totalWinners={totalWinners}
          />
        )}
      </div>
    </>
  )
}
