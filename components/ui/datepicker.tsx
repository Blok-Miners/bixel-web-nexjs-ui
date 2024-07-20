import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface DatePickerProps {
  value: Date | null
  onChange: (date: Date | undefined) => void
  onBlur: () => void
  name: string
  ref: React.Ref<HTMLInputElement>
}
export default function DatePicker({ value, onChange, onBlur, name, ref }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value || undefined)

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    onChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[100%] justify-start text-left font-normal border-th-accent-2 bg-th-black-2  ${!selectedDate ? "text-th-white" : "text-th-white"}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


