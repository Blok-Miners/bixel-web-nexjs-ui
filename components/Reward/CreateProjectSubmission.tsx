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

export const CreateProjectSubmission = () => {
  const [projectSubmission, setProjectSubmission] = useState({
    rulesForSubmission: "",
    startDate: null,
    endDate: null,
    protocolUrl: "",
    contractAddress: "",
    chain: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProjectSubmission((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleDateChange = (name: string, date: Date | undefined) => {
    setProjectSubmission((prevState) => ({
      ...prevState,
      [name]: date,
    }))
  }

  return (
    <ScrollArea className=" h-[30rem]">
      <div className="grid grid-cols-2 gap-4 p-6 ">
        <div className="col-span-2 flex flex-col gap-2">
          <div>Rules For Submission</div>
          <Textarea
            onChange={handleChange}
            name="rulesForSubmission"
            value={projectSubmission.rulesForSubmission}
            placeholder="Rules For Submission"
            className="w-full rounded-lg border border-th-accent-2 p-4"
          />
        </div>
        <div className="col-span-2 flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Label>Start Date</Label>
            <DatePicker
              value={projectSubmission.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              onBlur={() => {}}
              name="startDate"
              ref={null}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>End Date</Label>
            <DatePicker
              value={projectSubmission.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              onBlur={() => {}}
              name="endDate"
              ref={null}
            />
          </div>
        </div>
        <div className="col-span-2 space-y-2 rounded-xl">
          <Label>Protocol URL</Label>
          <Input
            type="url"
            placeholder="URL"
            className="rounded-lg bg-transparent"
            value={projectSubmission.protocolUrl}
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
            value={projectSubmission.contractAddress}
            name="Contract Address"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2 space-y-2 rounded-xl">
          <Label>Select a chain</Label>

          <Select
            onValueChange={(value) =>
              setProjectSubmission({
                ...projectSubmission,
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
