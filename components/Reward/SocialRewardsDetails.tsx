import React, { useState } from "react"
import { Label } from "../ui/label"
import { FaPlus } from "react-icons/fa6"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select"
import { Input } from "../ui/input"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { Button } from "../ui/button"
import { FaLongArrowAltRight } from "react-icons/fa"

interface SocialLink {
  name: string
  icon: JSX.Element
  color: string
  content: { name: string; value: string }[]
}

interface AddedItem {
  name: string
  value: string
  color: string
  link: string
  icon: JSX.Element
  botToken?: string
  chatId?: string
}

interface SocialRewardsDetailsProps {
  socialLinks: SocialLink[]
  added: AddedItem[]
  handleAdd: (item: AddedItem) => void
  setAdded: React.Dispatch<React.SetStateAction<AddedItem[]>>
  setStep: React.Dispatch<React.SetStateAction<number>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  description: string
}

export default function SocialRewardsDetails({
  socialLinks,
  added,
  handleAdd,
  setAdded,
  setStep,
  setDescription,
  description,
}: SocialRewardsDetailsProps) {
  const [linkValue, setLink] = useState("")
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newAdded = [...added]
    if (e.target.name === "link") {
      newAdded[index].link = e.target.value
    } else if (e.target.name === "token") {
      newAdded[index].botToken = e.target.value
    }else if(e.target.name === 'chat_id'){
      newAdded[index].chatId = e.target.value;
    }
    setAdded(newAdded)
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      <div className="text-2xl font-bold">
        <div className="space-y-2 rounded-xl">
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 font-bold">
        <FaPlus /> Add Social Links
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {socialLinks.map((item: SocialLink, index: number) => (
          <Select
            key={index}
            onValueChange={(value) =>
              handleAdd({
                name: item.name,
                value,
                link: linkValue,
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
                  {item.content.map((content, contentIndex: number) => (
                    <SelectItem key={contentIndex} value={content.value}>
                      <div className="flex items-center gap-2">
                        <div>{item.icon}</div> <div>{content.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            )}
          </Select>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {added.map((item: AddedItem, index: number) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg bg-slate-300"
          >
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
              <Input
                className="bg-slate-400"
                placeholder="https://"
                value={item.link}
                name={"link"}
                onChange={(e) => handleChange(e, index)}
              />
              {item.name === "Telegram" && item.value === "Join" && (
                <>
                  <div>Token</div>
                  <Input
                    className="bg-slate-400"
                    placeholder="7309088510:AAFULd0u9N3AroXD5iX91rvb9mc0q1asqOm"
                    value={item.botToken}
                    name={"token"}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <div>Chat Id</div>
                  <Input
                    name={"chat_id"}
                    className="bg-slate-400"
                    placeholder="-1002175934486"
                    value={item.chatId}
                    onChange={(e) => handleChange(e, index)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setStep(2)}
        className="flex w-fit items-center gap-2"
      >
        <div>Next</div> <FaLongArrowAltRight />
      </Button>
    </div>
  )
}
