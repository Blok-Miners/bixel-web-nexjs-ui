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

export default function SurveyDetails({
  step,
  setStep,
  handleChange,
  survey,
  setSurvey,
  chain,
  handleDateChange,
  step1Error,
}: any) {
  return (
    <ScrollArea>
      <div className="flex flex-col gap-6">
        <div className="text-lg font-bold">Survey Details</div>
        <div className="col-span-2 space-y-2 rounded-xl">
          <Label>Google form link</Label>
          <Input
            type="text"
            placeholder="formURL"
            className="rounded-lg bg-transparent p-4 py-6"
            value={survey.formURL}
            name="formURL"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-6">
          <div className="flex-1 space-y-2 rounded-xl">
            <Label>Google Sheet URL</Label>
            <Input
              type="url"
              placeholder="URL"
              className="rounded-lg bg-transparent p-4 py-6"
              value={survey.sheetURL}
              name="sheetURL"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button
          onClick={() => setStep(2)}
          className="flex w-fit items-center gap-2"
        >
          <div>Next</div> <FaLongArrowAltRight />
        </Button>
        {step1Error && <div className="text-sm text-red-500">{step1Error}</div>}
        <div className="flex flex-col gap-2 text-slate-300">
          <div>Note :</div>
          <div>
            <div>- Form URL should be public</div>
            <div>
              - In the settings, the responses should collect email address(the
              selected value should be "Verified")
            </div>
            <div>- Form should be linked to the google sheets.</div>
            <div>- The google sheets access should be public.</div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
