"use client"
import React, { useState } from "react"

import { FaLongArrowAltRight } from "react-icons/fa"
import BountyDetails from "./BugBounty/BountyDetails"
import ContestDetails from "./Blockchain/ContestDetails"
import { ContestModeEnum, IChain } from "@/types/services/contest"
import { ContestService } from "@/services/contest"
import CreateProjectSubmission from "./Project/ProjectSubmissionDetails"
import RewardDetails from "./Blockchain/RewardDetails"

export const ProjectSubmission = ({
  productId,
  chain,
}: {
  productId: string
  chain: IChain[]
}) => {
  const contestService = new ContestService()
  const [step, setStep] = useState(1)
  const [projectSubmission, setProjectSubmission] = useState({
    description: "",
    url: "",
    contractAddress: "",
    chain: "",
  })

  const [depositAmountToken, setDepositAmountToken] = useState(0)
  const [depositAmountNFT, setDepositAmountNFT] = useState(0)
  const [couponType, setCouponType] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [rewardType, setRewardType] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [mode, setMode] = useState<ContestModeEnum | undefined>(undefined)
  const [totalWinners, setTotalWineers] = useState<number | undefined>(
    undefined,
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [contestId, setContestId] = useState("")
  const [assetType, setAssetType] = useState("")
  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState<string | undefined>("")
  const [step3Error, setStep3Error] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDateChange = (name: string, date: Date | null) => {
    if (name === "endDate") {
      setEndDate(date)
    } else if (name === "startDate") {
      setStartDate(date)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setStep1Error("")
    const { name, value } = e.target
    setProjectSubmission((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleContestClick = async () => {
    if (
      !projectSubmission.description ||
      !projectSubmission.url ||
      !projectSubmission.contractAddress ||
      !projectSubmission.chain
    ) {
      setStep(1)
      setStep1Error("Required fields should not be empty !")
      return
    }
    if (startDate == null || endDate == null || !mode || !totalWinners) {
      setStep2Error("Required fields should not be empty !")
      return
    }
    if (startDate > endDate) {
      setStep2Error("Start date should be less than end date !")
      return
    }
    setLoading(true)
    try {
      const contestData: any = {
        description: projectSubmission.description,
        url: projectSubmission.url,
        contractAddress: projectSubmission.contractAddress,
        chain: projectSubmission.chain,
        productId,
        mode,
        noOfWinners: totalWinners,
        startTime: startDate,
        endTime: endDate,
      }
      const res =
        await contestService.createProjectSubmissionContest(contestData)
      if (!res) {
        return
      }
      // setOpenDialog(true)
      // setTitle("Success")
      // setMessage("Bug Bounty Contest created successfully")
      setLoading(false)
      setContestId(res._id)
      setStep(3)
      console.log(res)
      setContestId(res._id)
    } catch (error) {
      setOpenDialog(true)
      setTitle("Failure")
      setMessage("Something went wrong creating contest !")
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex gap-4 bg-th-black-2 px-4 text-sm text-slate-200 shadow-lg">
        <button
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>Project Details</div>
        </button>
        <button
          className={`font-medium ${step === 2 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>
            <FaLongArrowAltRight />
          </div>
          <div>Contest type</div>
        </button>
        <button
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
          <CreateProjectSubmission
            projectSubmission={projectSubmission}
            setProjectSubmission={setProjectSubmission}
            step={step}
            setStep={setStep}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            chain={chain}
            step1Error={step1Error}
          />
        )}
        {step === 2 && (
          <ContestDetails
            contestId={contestId}
            step2Error={step2Error}
            setStep2Error={setStep2Error}
            setStep={setStep}
            loading={loading}
            mode={mode}
            setMode={setMode}
            setTotalWineers={setTotalWineers}
            handleContestClick={handleContestClick}
            totalWinners={totalWinners}
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />
        )}
        {step === 3 && (
          <RewardDetails
            contestId={contestId}
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
