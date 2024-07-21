"use client"
import React from "react"

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
import { FaLongArrowAltRight } from "react-icons/fa"
import { Button } from "../ui/button"

const CreateProjectSubmission = ({
  projectSubmission,
  setProjectSubmission,
  step,
  setStep,
  handleChange,
  handleDateChange,
}: any) => {
  return (
    <>
      <ScrollArea className="h-[90%]">
        <div className="grid grid-cols-2 gap-6 gap-x-10">
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
              name="contractAddress"
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
                className={`flex items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 font-semibold hover:bg-opacity-50`}
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
          <Button className="w-fit" onClick={() => setStep(2)}>
            Next
          </Button>
        </div>
      </ScrollArea>
    </>
  )
}

export default CreateProjectSubmission
