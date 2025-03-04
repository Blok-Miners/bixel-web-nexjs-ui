"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FaCheck,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa"
import Loading from "../Loading"
import { Label } from "@/components/ui/label"
import DatePicker from "@/components/ui/datepicker"
import { ContestModeEnum } from "@/types/services/contest"
import { Dispatch } from "react"

interface ContestDetailsProps {
  contestId?: string
  setStep2Error?: Dispatch<React.SetStateAction<string  | undefined>>
  mode?: ContestModeEnum | null
  setMode?: Dispatch<React.SetStateAction<ContestModeEnum | undefined>>
  setStep?: Dispatch<React.SetStateAction<number>>
  setTotalWineers?: Dispatch<React.SetStateAction<number | undefined>>
  handleContestClick?: () => void
  step2Error?: string
  totalWinners?: number
  loading?: boolean
  startDate?: any
  endDate?: any
  handleDateChange?: (name: string, date: Date | null) => void
}

export default function ContestDetails({
  contestId,
  setStep2Error,
  mode,
  setMode,
  setStep,
  setTotalWineers,
  handleContestClick,
  step2Error,
  totalWinners,
  loading,
  startDate,
  endDate,
  handleDateChange,
}: ContestDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-bold">Select Contest</div>
      <div className="flex flex-col gap-6">
        <div
          onClick={() => {
            setStep2Error?.("")
            setMode?.(ContestModeEnum.TIMEFRAME)
          }}
          className={`${mode === ContestModeEnum.TIMEFRAME ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
        >
          <div className="flex items-center gap-2">
            <FaLongArrowAltRight /> <div>Timeframe</div>
          </div>
          {mode === ContestModeEnum.TIMEFRAME && (
            <div className="text-black">
              <FaCheck />
            </div>
          )}
        </div>
        <div
          onClick={() => {
            setStep2Error?.("")
            setMode?.(ContestModeEnum.LEADERBOARD)
          }}
          className={`${mode === ContestModeEnum.LEADERBOARD ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
        >
          <div className="flex items-center gap-2">
            <FaLongArrowAltRight /> <div>Leaderboard</div>
          </div>
          {mode === ContestModeEnum.LEADERBOARD && (
            <div className="text-black">
              <FaCheck />
            </div>
          )}
        </div>
        {mode && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div>No. of winners</div>
              <Input
                value={totalWinners}
                onChange={(e) => {
                  setTotalWineers?.(parseInt(e.target.value))
                  setStep2Error?.("")
                }}
                type="number"
                placeholder="Enter no. of winners"
                className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
              />
            </div>
            <div className="col-span-2 flex gap-8">
              <div className="flex flex-1 flex-col gap-2">
                <Label>Start Date</Label>
                <DatePicker
                  value={startDate}
                  onChange={(date: any) => {
                    setStep2Error?.("")
                    handleDateChange?.("startDate", date)
                  }}
                  onBlur={() => {}}
                  name="startDate"
                  ref={null}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label>End Date</Label>
                <DatePicker
                  value={endDate}
                  onChange={(date: any) => {
                    setStep2Error?.("")
                    handleDateChange?.("endDate", date)
                  }}
                  onBlur={() => {}}
                  name="endDate"
                  ref={null}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setStep?.(1)}
          className="flex w-fit items-center gap-2 bg-white hover:bg-slate-200"
        >
          <FaLongArrowAltLeft />
          <div>Back</div>
        </Button>
        {contestId ? (
          <Button
            onClick={() => setStep?.(3)}
            className="flex w-fit items-center gap-2"
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <div>Next</div> <FaLongArrowAltRight />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleContestClick}
            className="flex w-fit items-center gap-2"
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <div>Submit</div>
              </>
            )}
          </Button>
        )}
      </div>
      {step2Error && <div className="text-sm text-red-500">{step2Error}</div>}
    </div>
  )
}

// export default function ContestDetails({
//   contestId,
//   setStep2Error,
//   mode,
//   setMode,
//   setStep,
//   ContestModeEnum,
//   setTotalWineers,
//   handleContestClick,
//   step2Error,
//   totalWinners,
//   loading,
//   startDate,
//   endDate,
//   handleDateChange,
// }: ContestDetailsProps) {
//   return (
//     <div className="flex flex-col gap-6">
//       <div className="text-lg font-bold">Select Contest</div>
//       <div className="flex flex-col gap-6">
//         <div
//           onClick={() => {
//             setStep2Error("")
//             setMode(ContestModeEnum.TIMEFRAME)
//           }}
//           className={`${mode === ContestModeEnum.TIMEFRAME ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
//         >
//           <div className="flex items-center gap-2">
//             <FaLongArrowAltRight /> <div>Timeframe</div>
//           </div>
//           {mode === ContestModeEnum.TIMEFRAME && (
//             <div className="text-black">
//               <FaCheck />
//             </div>
//           )}
//         </div>
//         <div
//           onClick={() => {
//             setStep2Error("")
//             setMode(ContestModeEnum.LEADERBOARD)
//           }}
//           className={`${mode === ContestModeEnum.LEADERBOARD ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
//         >
//           <div className="flex items-center gap-2">
//             <FaLongArrowAltRight /> <div>Leaderboard</div>
//           </div>
//           {mode === ContestModeEnum.LEADERBOARD && (
//             <div className="text-black">
//               <FaCheck />
//             </div>
//           )}
//         </div>
//         {mode && (
//           <div className="flex flex-col gap-6">
//             <div className="flex flex-col gap-2">
//               <div>No. of winners</div>
//               <Input
//                 value={totalWinners}
//                 onChange={(e) => {
//                   setTotalWineers(parseInt(e.target.value))
//                   setStep2Error("")
//                 }}
//                 type="number"
//                 placeholder="Enter no. of winners"
//                 className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
//               />
//             </div>
//             <div className="col-span-2 flex gap-8">
//               <div className="flex flex-1 flex-col gap-2">
//                 <Label>Start Date</Label>
//                 <DatePicker
//                   value={startDate}
//                   onChange={(date) => {
//                     setStep2Error("")
//                     handleDateChange("startDate", date)
//                   }}
//                   onBlur={() => {}}
//                   name="startDate"
//                   ref={null}
//                 />
//               </div>
//               <div className="flex flex-1 flex-col gap-2">
//                 <Label>End Date</Label>
//                 <DatePicker
//                   value={endDate}
//                   onChange={(date) => {
//                     setStep2Error("")
//                     handleDateChange("endDate", date)
//                   }}
//                   onBlur={() => {}}
//                   name="endDate"
//                   ref={null}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="flex gap-4">
//         <Button
//           onClick={() => setStep(1)}
//           className="flex w-fit items-center gap-2 bg-white hover:bg-slate-200"
//         >
//           <FaLongArrowAltLeft />
//           <div>Back</div>
//         </Button>
//         {contestId ? (
//           <Button
//             onClick={() => setStep(3)}
//             className="flex w-fit items-center gap-2"
//           >
//             {loading ? (
//               <Loading />
//             ) : (
//               <>
//                 <div>Next</div> <FaLongArrowAltRight />
//               </>
//             )}
//           </Button>
//         ) : (
//           <Button
//             onClick={handleContestClick}
//             className="flex w-fit items-center gap-2"
//           >
//             {loading ? (
//               <Loading />
//             ) : (
//               <>
//                 <div>Submit</div>
//               </>
//             )}
//           </Button>
//         )}
//       </div>
//       {step2Error && <div className="text-sm text-red-500">{step2Error}</div>}
//     </div>
//   )
// }
