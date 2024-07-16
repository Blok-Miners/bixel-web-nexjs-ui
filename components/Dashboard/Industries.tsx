// components/IndustrySelector.tsx
import React, { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

interface Industry {
  value: string
  label: string
}

const industries: Industry[] = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "software", label: "Software" },
  { value: "consulting", label: "Consulting" },
  { value: "information-technology", label: "Information Technology" },
  { value: "health-care", label: "Health Care" },
]

export default function IndustrySelector() {
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([])

  const handleSelect = (selectedOption: Industry | null) => {
    if (selectedOption) {
      setSelectedIndustries([...selectedIndustries, selectedOption])
    }
  }

  const handleRemove = (industryToRemove: Industry) => {
    setSelectedIndustries(
      selectedIndustries.filter(
        (industry) => industry.value !== industryToRemove.value,
      ),
    )
  }

  return (
    <div className="mx-auto w-full">
      <Select 
        onValueChange={(value) =>
          handleSelect(
            industries.find((industry) => industry.value === value) || null,
          )
        }
      >
        <SelectTrigger className="bg-white">
          <SelectValue  placeholder="Find an Industry to add" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {industries.map((industry) => (
            <SelectItem key={industry.value} value={industry.value}>
              {industry.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4 space-y-2 bg-white text-black">
        {selectedIndustries.map((industry, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded bg-white p-2 text-black"
          >
            <span className="text-black">{industry.label}</span>
            <button
              onClick={() => handleRemove(industry)}
              className="text-red-500 hover:text-red-700"
            >
              Undo
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
