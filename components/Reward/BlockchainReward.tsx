"use client"
import { useEffect, useState } from "react"
import { ChainService } from "@/services/chain"
import { FaLongArrowAltRight } from "react-icons/fa"
import { ContestService } from "@/services/contest"
import { ContestModeEnum, ICreateContest } from "@/types/services/contest"
import { Address } from "@/types/web3"
import ContractDetails from "./Blockchain/ContractDetails"
import ContestDetails from "./Blockchain/ContestDetails"
import RewardDetails from "./Blockchain/RewardDetails"
import ConfirmationDialog from "../Shared/ConfirmationDialog"
import { string } from "zod"

export default function CreateBlockchainReward({
  productId,
}: {
  productId: string
}) {
  const chains = new ChainService()
  const [chain, setChain] = useState([])
  const getAllChain = async () => {
    const allChain = await chains.getChains()
    if (allChain) {
      setChain(allChain)
    }
  }
  useEffect(() => {
    getAllChain()
  }, [])
  const contestService = new ContestService()

  const [step, setStep] = useState(1)
  const [contestId, setContestId] = useState("")
  const [blockchainData, setBlockchainData] = useState({
    contractAddress: "",
    abi: "",
    chainDeployed: "",
    eventName: "",
    url: "",
    description: "",
  })
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [depositAmountToken, setDepositAmountToken] = useState(0)
  const [depositAmountNFT, setDepositAmountNFT] = useState(0)
  const [couponType, setCouponType] = useState("")
  const [mode, setMode] = useState<ContestModeEnum | undefined>(undefined)
  const [totalWinners, setTotalWineers] = useState<number | undefined>(
    undefined
  )
  const [rewardType, setRewardType] = useState("")

  const handleDateChange = (name: string, date: Date | null) => {
    if (name === "endDate") {
      setEndDate(date)
    } else if (name === "startDate") {
      setStartDate(date)
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target
    setStep1Error("")

    if (type === "file" && files) {
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (event: any) => {
        try {
          const json = JSON.parse(event.target.result as string)
          setBlockchainData({ ...blockchainData, abi: json })
        } catch (error) {
          console.error("Error parsing JSON:", error)
        }
      }

      if (file) {
        reader.readAsText(file)
      }
    } else {
      setBlockchainData({ ...blockchainData, [name]: value })
    }
  }

  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState<string | undefined>("")
  const [step3Error, setStep3Error] = useState<string | undefined>("")

  const [openDialog, setOpenDialog] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleContestClick = async () => {
    if (
      !blockchainData.description ||
      !blockchainData.url ||
      !blockchainData.abi ||
      !blockchainData.chainDeployed ||
      !blockchainData.eventName
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
    console.log(blockchainData)
    try {
      const contestData: ICreateContest = {
        productId,
        contractAddress: blockchainData.contractAddress as Address,
        abi: JSON.parse(blockchainData.abi),
        chainId: blockchainData.chainDeployed,
        eventName: blockchainData.eventName,
        mode,
        noOfWinners: totalWinners,
        description: blockchainData.description,
        url: blockchainData.url,
        startDate,
        endDate,
      }

      console.log(contestData)

      const res = await contestService.createContest(contestData)
      if (!res) {
        return
      }
      console.log(res)
      setLoading(false)
      setStep(3)
      setContestId(res._id)
    } catch (error) {
      setOpenDialog(true)
      setTitle("Failure")
      setMessage("Something went wrong !")
      setLoading(false)
      console.log(error)
    }
  }

  const [couponCode, setCouponCode] = useState("")
  return (
    <>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={title}
        message={message}
      />
      <div className="sticky top-0 z-10 flex gap-4 bg-th-black-2 px-4 text-sm text-slate-200 shadow-lg">
        <button
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>Contract Details</div>
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
          <ContractDetails
            blockchainData={blockchainData}
            handleChange={handleChange}
            chain={chain}
            setBlockchainData={setBlockchainData}
            setStep={setStep}
            step1Error={step1Error}
          />
        )}
        {step === 2 && (
          <ContestDetails
            setStep2Error={setStep2Error}
            mode={mode}
            setMode={setMode}
            setStep={setStep}
            setTotalWineers={setTotalWineers}
            handleContestClick={handleContestClick}
            step2Error={step2Error}
            totalWinners={totalWinners}
            contestId={contestId}
            loading={loading}
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />
        )}
        {step === 3 && (
          <RewardDetails
            productId={productId}
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
