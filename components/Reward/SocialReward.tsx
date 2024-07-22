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
import ContestDetails from "./Blockchain/ContestDetails"
import RewardDetails from "./Blockchain/RewardDetails"
import ConfirmationDialog from "../Shared/ConfirmationDialog"
import {
  ContestModeEnum,
  ISocialMedia,
  ISocialMediaInteraction,
  SocialMediaEnum,
} from "@/types/services/contest"
import { ContestService } from "@/services/contest"
import SocialRewardsDetails from "./SocialRewardsDetails"

interface AddedItem {
  name: string
  value: string
  link: string
  color: string
  icon: JSX.Element
}

export default function CreateSocialReward({
  productId,
}: {
  productId: string
}) {
  const contestService = new ContestService()
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

  const [loading, setLoading] = useState(false)
  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState<string | undefined>("")
  const [step3Error, setStep3Error] = useState<string | undefined>("")
  const [description, setDescription] = useState("")

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      color: "#1877F2",
      content: [
        { name: "Facebook Entry", value: "Entry" },
        { name: "Visit on Facebook", value: "Visit" },
      ],
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      color: "#E1306C",
      content: [{ name: "Visit on Instagram", value: "Visit" }],
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
      ],
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      color: "#0088CC",
      content: [
        { name: "Visit on Telegram", value: "Visit" },
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
    console.log(social)
    setAdded((prevAdded) => [...prevAdded, social])
  }

  const handleContestClick = async () => {
    if (!mode || !totalWinners || !startDate || !endDate) {
      return
    }
    const formattedSocialMedias: ISocialMedia[] = added.map((social) => {
      const formattedSocialMedia: ISocialMedia = {
        type: social.name.toUpperCase(),
        url: social.link,
        activity: social.value.toUpperCase(),
      }
      return formattedSocialMedia
    })

    console.log(endDate)
    const socialMediaData: ISocialMediaInteraction = {
      socialMedia: formattedSocialMedias,
      description: description,
      startDate,
      endDate,
      mode,
      noOfWinners: totalWinners,
      productId,
    }
    console.log(socialMediaData, "socialMedia")
    const res =
      await contestService.createSocialMediaInteractionContest(socialMediaData)
    setContestId(res.contest._id)
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
      <div className="h-full overflow-auto">
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
            <div>Social Links</div>
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
              setStep={setStep}
              setDescription={setDescription}
              description={description}
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
      </div>
    </>
  )
}
