import React from "react"
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
  icon: JSX.Element
}

interface SocialRewardsDetailsProps {
  socialLinks: SocialLink[]
  added: AddedItem[]
  handleAdd: (item: AddedItem) => void
  setAdded: React.Dispatch<React.SetStateAction<AddedItem[]>>
}

export default function SocialRewardsDetails({
  socialLinks,
  added,
  handleAdd,
  setAdded,
}: SocialRewardsDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-2xl font-bold">
        <div className="space-y-2 rounded-xl">
          <Label>Description</Label>
          <Input type="text" placeholder="Description"  />
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
              <Input className="bg-slate-400" placeholder="https://" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
