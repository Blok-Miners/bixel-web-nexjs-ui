"use client"

import { Button } from "@/components/ui/button"
import DatePicker from "@/components/ui/datepicker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
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

export default function BountyDetails({
  step,
  setStep,
  handleChange,
  bugBounty,
  setBugBounty,
  chain,
  handleDateChange,
}: any) {
  return (
    <ScrollArea>
      <div className="grid h-[30rem] grid-cols-2 gap-x-6 overflow-y-auto">
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
          <Label>Contract Address (Optional)</Label>
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

        <div className="space-y-2 rounded-xl">
          <Label>Profile URL</Label>
          <Input
            type="url"
            placeholder="URL"
            className="rounded-lg bg-transparent"
            value={bugBounty.profileUrl}
            name="profileUrl"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div>Chain (Optional)</div>
          <Select
            onValueChange={(value) =>
              setBugBounty({
                ...bugBounty,
                chain: value,
              })
            }
          >
            <SelectTrigger
              className={`flex h-fit w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 hover:bg-opacity-50`}
            >
              <SelectValue placeholder="Select a chain" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {chain &&
                  chain.map((item: any, index: any) => {
                    return (
                      <SelectItem value={item.id} className="text-white">
                        {item.name}
                      </SelectItem>
                    )
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => setStep(2)}
          className="flex w-fit items-center gap-2"
        >
          <div>Next</div> <FaLongArrowAltRight />
        </Button>
      </div>
    </ScrollArea>
  )
}
