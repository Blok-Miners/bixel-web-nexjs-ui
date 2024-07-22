"use client"
import { useState } from "react"
import { FaFacebookF } from "react-icons/fa"
import { FaLongArrowAltRight } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FaTelegramPlane } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { Label } from "../ui/label"
import SocialRewardsDetails from "./SocialRewardsDetails"
import ContestDetails from "./Blockchain/ContestDetails"
import RewardDetails from "./Blockchain/RewardDetails"
import ConfirmationDialog from "../Shared/ConfirmationDialog"
import { ContestModeEnum } from "@/types/services/contest"

interface AddedItem {
  name: string
  value: string
  color: string
  icon: JSX.Element
}

export default function CreateSocialReward() {

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


  const [loading, setLoading] = useState(false)
  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")
  const [step3Error, setStep3Error] = useState("")

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      color: "#1877F2",
      content: [
        { name: "Facebook Entry", value: "Entry" },
        { name: "Visit on Facebook", value: "Visit" },
        { name: "View on Facebook", value: "View" },
      ],
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      color: "#E1306C",
      content: [
        { name: "Visit on Instagram", value: "Visit" },
        { name: "View on Instagram", value: "View" },
      ],
    },
    {
      name: "Linkedin",
      icon: <FaLinkedinIn />,
      color: "#0077B5",
      content: [{ name: "Visit a Profile", value: "View" }],
    },
    {
      name: "Twitter",
      icon: <FaXTwitter />,
      color: "#000000",
      content: [
        { name: "Twitter Entry", value: "Entry" },
        { name: "Post on Twitter", value: "Post" },
        { name: "Visit on Twitter", value: "Visit" },
        { name: "View on Twitter", value: "View" },
      ],
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      color: "#0088CC",
      content: [
        { name: "View on Telegram", value: "View" },
        { name: "Join on Telegram", value: "Join" },
      ],
    },
    {
      name: "Youtube",
      icon: <FaYoutube />,
      color: "#FF0000",
      content: [{ name: "Visit on Youtube", value: "Visit" }],
    },
  ]

  const [added, setAdded] = useState<AddedItem[]>([])
  const [step, setStep] = useState(1)

  const handleAdd = (social: AddedItem) => {
    setAdded((prevAdded) => [...prevAdded, social])
  }

  const handleContestClick = () => {
      console.log("clicked")
  } 

  const handleDateChange = (name: string, date: Date | null) => {
    if (name === "endDate") {
      setEndDate(date)
    } else if (name === "startDate") {
      setStartDate(date)
    }
  }



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
          onClick={() => setStep(1)}
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>Social Links</div>
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
          <div>Reward Details</div>
        </button>
      </div>

      <div className="mt-8 px-4">
        {step === 1 && (
          <SocialRewardsDetails
            socialLinks={socialLinks}
            added={added}
            handleAdd={handleAdd}
            setAdded={setAdded}
          />
        )}
               {step === 2 && (
          <ContestDetails
            step2Error={step2Error}
            setStep2Error={setStep2Error}
            setStep={setStep}
            loading={loading}
            setLoading={setLoading}
            mode={mode}
            setMode={setMode}
            ContestModeEnum={ContestModeEnum}
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
