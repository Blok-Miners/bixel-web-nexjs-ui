"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FaLongArrowAltRight } from "react-icons/fa"

export default function RegistrationDetails({
  setStep,
  registration,
  handleChange,
  step1Error,
  verificationMode,
  setVerificationMode,
}: any) {
  return (
    <div className="flex flex-col gap-6">
      <div className="col-span-2 text-lg font-bold">Registration Details</div>
      <div className="col-span-2 flex flex-col gap-2">
        <div>Description</div>
        <Textarea
          onChange={handleChange}
          value={registration.description}
          name="description"
          placeholder="Enter description"
          className="w-full rounded-lg border border-th-accent-2 p-4"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <div>Enter url</div>
        <Input
          onChange={handleChange}
          value={registration.url}
          name="url"
          placeholder="Enter Url"
          className="w-full rounded-lg border border-th-accent-2 p-4"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <div>Verification mode</div>
        <Select value={verificationMode} onValueChange={setVerificationMode}>
          <SelectTrigger
            className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
          >
            <SelectValue placeholder="Select verification mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="walletAddress" className="text-white">
                Wallet Address
              </SelectItem>
              <SelectItem value="email" className="text-white">
                Email
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <div>Enter Verification URL</div>
        <Input
          onChange={handleChange}
          value={registration.verificationURL}
          name="verificationURL"
          placeholder="Enter Url"
          className="w-full rounded-lg border border-th-accent-2 p-4"
        />
      </div>
      <Button
        onClick={() => setStep(2)}
        className="flex w-fit items-center gap-2"
      >
        <div>Next</div> <FaLongArrowAltRight />
      </Button>

      {step1Error && <div className="text-sm text-red-500">{step1Error}</div>}
    </div>
  )
}
