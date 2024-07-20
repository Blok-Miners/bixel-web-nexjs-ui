import React, { useState } from "react"
import { Textarea } from "../ui/textarea"
import DatePicker from "../ui/datepicker"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select"
import { ScrollArea } from "../ui/scroll-area"

export const BugBounty = () => {
  const [bugBounty, setBugBounty] = useState({
    description: "",
    protocolUrl: "",
    contractAddress: "",
    chain: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setBugBounty((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <ScrollArea>
      <div className="grid h-[30rem] grid-cols-2 gap-4 overflow-y-auto p-6">
        <div className="col-span-2 flex flex-col gap-2">
          <div>Description</div>
          <Textarea
            onChange={handleChange}
            name="description"
            value={bugBounty.description}
            placeholder="Description"
            className="w-full rounded-lg border border-th-accent-2 p-4"
          />
        </div>

        <div className="col-span-2 space-y-2 rounded-xl">
          <Label>Protocol URL</Label>
          <Input
            type="url"
            placeholder="URL"
            className="rounded-lg bg-transparent"
            value={bugBounty.protocolUrl}
            name="protocolUrl"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2 space-y-2 rounded-xl">
          <Label>Contract Address</Label>
          <Input
            type="text"
            placeholder="Contract Address"
            className="rounded-lg bg-transparent"
            value={bugBounty.contractAddress}
            name="contractAddress"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2 space-y-2 rounded-xl">
          <Label>Select a chain</Label>

          <Select
            onValueChange={(value) =>
              setBugBounty({
                ...bugBounty,
                chain: value,
              })
            }
          >
            <SelectTrigger
              className={`flex items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-2 px-4 font-semibold hover:bg-opacity-50`}
            >
              <div>Select a chain</div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Polygonmatic">
                  <div>Polygonmatic</div>
                </SelectItem>
                <SelectItem value="Binance Smartchain">
                  <div>Binance Smartchain</div>
                </SelectItem>
                <SelectItem value="Ethereum Mainnet">
                  <div>Ethereum Mainnet</div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </ScrollArea>
  )
}
