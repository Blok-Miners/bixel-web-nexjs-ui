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

interface AddedItem {
  name: string
  value: string
  color: string
  icon: JSX.Element
}

export default function CreateSocialReward() {
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
  return (
    <>
      <div className="flex gap-4 px-4 text-sm text-slate-200 shadow-lg">
        <button
          onClick={() => setStep(1)}
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>Social Links</div>
        </button>
      </div>
      <div className="mt-8 px-4">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 font-bold">
              <FaPlus /> Add Social Links
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((item, index) => (
                <>
                  <Select
                    key={index}
                    onValueChange={(value) =>
                      handleAdd({
                        name: item.name,
                        value,
                        color: item.color,
                        icon: item.icon,
                      })
                    }
                  >
                    <SelectTrigger
                      style={{ backgroundColor: item.color }}
                      className={`flex w-fit items-center gap-2 rounded-lg p-2 outline-none hover:opacity-80 bg-[${item.color}] px-4 font-semibold shadow-lg hover:bg-opacity-50`}
                    >
                      {item.icon} <div>{item.name}</div>
                    </SelectTrigger>
                    {item.content && (
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {item.content.map((content, index) => (
                            <SelectItem key={index} value={content.value}>
                              <div className="flex items-center gap-2">
                                <div>{item.icon}</div> <div>{content.name}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    )}
                  </Select>
                </>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {added.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col overflow-hidden rounded-lg bg-slate-300">
                    <div
                      style={{ backgroundColor: item.color }}
                      className="flex justify-between bg-blue-700 p-2 px-4"
                    >
                      <div>
                        {item.value} on {item.name}
                      </div>
                      <button
                        className="flex items-center gap-1 bg-opacity-45"
                        onClick={() =>
                          setAdded((prevAdded) =>
                            prevAdded.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <MdOutlineDeleteOutline />
                        <div>Remove</div>
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 p-4 text-black focus:border-hidden focus:outline-white">
                      <div>Add URL</div>
                      <Input className="bg-slate-400" placeholder="https://" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
