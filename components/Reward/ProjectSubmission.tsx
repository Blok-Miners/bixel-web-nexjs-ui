"use client"
import React, { useState } from "react"

import { FaLongArrowAltRight } from "react-icons/fa"
import BountyDetails from "./BugBounty/BountyDetails"
import ContestDetails from "./Blockchain/ContestDetails"
import { ContestModeEnum } from "@/types/services/contest"
import { ContestService } from "@/services/contest"
import CreateProjectSubmission from "./ProjectSubmissionDetails"
import RewardDetails from "./Blockchain/RewardDetails"

export const ProjectSubmission = ({
  productId,
  chain,
}: {
  productId: string
  chain: any
}) => {
  const contestService = new ContestService()
  const [step, setStep] = useState(1)
  const [projectSubmission, setProjectSubmission] = useState({
    description: "",
    profileUrl: "",
    contractAddress: "",
    chain: "",
    startDate: null,
    endDate: null,
  })


  const [depositAmountToken, setDepositAmountToken] = useState(0)
  const [depositAmountNFT, setDepositAmountNFT] = useState(0)
  const [couponType, setCouponType] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [rewardType, setRewardType] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [mode, setMode] = useState<ContestModeEnum>(ContestModeEnum.LEADERBOARD)
  const [totalWinners, setTotalWineers] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [contestId, setContestId] = useState("")
  const [assetType, setAssetType] = useState("")
  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")
  const [step3Error, setStep3Error] = useState("")

  const handleDateChange = (name: string, date: Date | undefined) => {
    setProjectSubmission((prevState) => ({
      ...prevState,
      [name]: date,
    }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProjectSubmission((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmissionClick = async () => {
    console.log(projectSubmission)
    console.log(totalWinners)
    console.log(mode)
    try {
      const contestData: any = {
        description: projectSubmission.description,
        profileURL: projectSubmission.profileUrl,
        productId,
        mode,
        noOfWinners: totalWinners,
        startTime: projectSubmission.startDate,
        endTime: projectSubmission.endDate,
      }
      if (projectSubmission.contractAddress) {
        contestData.contractAddress = projectSubmission.contractAddress
      }
      if (projectSubmission.chain) {
        contestData.chain = projectSubmission.chain
      }
      const res = await contestService.createBugBountyContest(contestData)
      if (!res) return
      console.log(res)
    } catch (error) {
      console.log(error)
    }
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
      <div className="mt-8 px-4 h-[90%] overflow-y-auto">
        {step === 1 && (
          <CreateProjectSubmission
            projectSubmission={projectSubmission}
            setProjectSubmission={setProjectSubmission}
            step={step}
            setStep={setStep}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
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
            handleContestClick={handleSubmissionClick}
            step2Error={step2Error}
            totalWinners={totalWinners}
          />
        )}
          {step === 3 && (
          <RewardDetails
            setStep3Error={setStep3Error}
            setRewardType={setRewardType}
            setCouponType={setCouponType}
            rewardType={rewardType}
            couponType={couponType}
            setDepositAmountToken={setDepositAmountToken}
            totalWinners={totalWinners}
            depositAmountToken={depositAmountToken}
            setStep={setStep}
            step3Error={step3Error}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            depositAmountNFT={depositAmountNFT}
            setDepositAmountNFT={setDepositAmountNFT}
          />
        )}
      </div>
    </>
  )
}
