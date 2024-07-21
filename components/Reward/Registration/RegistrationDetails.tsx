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
}: any) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2 text-lg font-bold">Contract Details</div>
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
        <div>Description</div>
        <Input
          onChange={handleChange}
          value={registration.url}
          name="url"
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
    </div>
  )
}
