"use client"
// components/Form.js
import { useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { FaCheck } from "react-icons/fa"

export default function CreateReward() {
  const [reward, setReward] = useState("blockchain")
  const [step, setStep] = useState(1)
  const [blockchainData, setBlockchainData] = useState({
    contractAddress: "",
    abi: "",
    chainDeployed: "",
    eventType: "",
  })
  const [userType, setUserType] = useState("")
  const [rewardType, setRewardType] = useState("")
  const [tokenAmount, setTokenAmount] = useState(0)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target

    if (type === "file" && files) {
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (event: any) => {
        try {
          const json = JSON.parse(event.target.result as string)
          setBlockchainData({ ...blockchainData, abi: json })
        } catch (error) {
          console.error("Error parsing JSON:", error)
        }
      }

      if (file) {
        reader.readAsText(file)
      }
    } else {
      setBlockchainData({ ...blockchainData, [name]: value })
    }
  }

  return (
    <div className="mx-auto mt-6 max-w-6xl">
      <div className="mx-auto text-2xl font-bold">Create Reward</div>
      <div className="mt-6 flex gap-4">
        <div className="h-[80vh] w-[250px] rounded-xl bg-th-black-2 p-4">
          {/* <div className="text-lg font-bold">Reward type</div> */}
          <div className="mt-6 flex flex-col gap-4 text-lg font-bold">
            <div
              className={` ${
                reward === "blockchain" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("blockchain")
              }}
            >
              Blockchain
            </div>
            <div
              className={` ${
                reward === "social" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("social")
              }}
            >
              Social
            </div>
          </div>
        </div>
        <div className="h-[80vh] w-[1000px] rounded-xl bg-th-black-2 p-4">
          {reward === "blockchain" && (
            <>
              <div className="flex gap-4 px-4 text-sm text-slate-200 shadow-lg">
                <div
                  onClick={() => setStep(1)}
                  className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} cursor-pointer p-2`}
                >
                  1. Contract Details
                </div>
                <div
                  onClick={() => setStep(2)}
                  className={`font-medium ${step === 2 && "border-b border-th-accent-2 text-th-accent-2"} cursor-pointer p-2`}
                >
                  2. Contest Type
                </div>
                <div
                  onClick={() => setStep(3)}
                  className={`font-medium ${step === 3 && "border-b border-th-accent-2 text-th-accent-2"} cursor-pointer p-2`}
                >
                  3. Reward Type
                </div>
                <div
                  onClick={() => setStep(4)}
                  className={`font-medium ${step === 4 && "border-b border-th-accent-2 text-th-accent-2"} cursor-pointer p-2`}
                >
                  4. Final
                </div>
              </div>
              <div className="mt-8 px-4">
                {step === 1 && (
                  <div className="flex flex-col gap-6">
                    <div className="text-lg font-bold">Enter Details</div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <div>Contract Address</div>
                        <Input
                          onChange={handleChange}
                          value={blockchainData.contractAddress}
                          name="contractAddress"
                          type="text"
                          placeholder="Enter your contract address"
                          className="w-full rounded-lg border border-th-accent-2 p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        {/* <Textarea
                          onChange={handleChange}
                          name="abi"
                          value={blockchainData.abi}
                          placeholder="Enter token Abi"
                          className="w-full rounded-lg border border-th-accent-2 p-2"
                        /> */}
                        <div>Contract Abi (JSON File)</div>
                        <Input
                          type="file"
                          name="abi"
                          accept=".json"
                          onChange={handleChange}
                          className="w-full rounded-lg border border-th-accent-2 p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>Chain</div>
                        <Input
                          onChange={handleChange}
                          name="chainDeployed"
                          value={blockchainData.chainDeployed}
                          type="text"
                          placeholder="Enter chain"
                          className="w-full rounded-lg border border-th-accent-2 p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>Event Name</div>
                        <Input
                          onChange={handleChange}
                          name="eventType"
                          value={blockchainData.eventType}
                          type="text"
                          placeholder="Enter event type"
                          className="w-full rounded-lg border border-th-accent-2 p-2"
                        />
                      </div>
                      <Button onClick={() => setStep(2)} className="w-fit">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex flex-col gap-6">
                    <div className="text-lg font-bold">Select Contest</div>
                    <div className="flex flex-col gap-6">
                      <div
                        onClick={() => setUserType("first100")}
                        className={`${userType === "first100" ? "bg-th-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg p-4 shadow-lg`}
                      >
                        <div>- First 100</div>
                        {userType === "first100" && (
                          <div className="text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => setUserType("timeframe")}
                        className={`${userType === "timeframe" ? "bg-th-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg p-4 shadow-lg`}
                      >
                        <div>- Timeframe</div>
                        {userType === "timeframe" && (
                          <div className="text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => setUserType("leaderboard")}
                        className={`${userType === "leaderboard" ? "bg-th-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg p-4 shadow-lg`}
                      >
                        <div>- Leaderboard</div>
                        {userType === "leaderboard" && (
                          <div className="text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(1)}
                        className="w-fit bg-white"
                      >
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="w-fit">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-col gap-6">
                    <div className="text-lg font-bold">Select Reward type</div>
                    <div className="flex flex-col gap-6">
                      <div
                        onClick={() => setRewardType("couponcode")}
                        className={`${rewardType === "couponcode" ? "bg-th-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg p-4 shadow-lg`}
                      >
                        <div>- Coupon Code</div>
                        {rewardType === "couponcode" && (
                          <div className="text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => setRewardType("token")}
                        className={`${rewardType === "token" ? "bg-th-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg p-4 shadow-lg`}
                      >
                        <div>- Token</div>
                        {rewardType === "token" && (
                          <div className="text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(2)}
                        className="w-fit bg-white"
                      >
                        Back
                      </Button>
                      <Button onClick={() => setStep(4)} className="w-fit">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="flex flex-col gap-6">
                    <div className="text-lg font-bold">
                      Approve Token Amount
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>Enter Amount</div>
                      <Input
                        onChange={(e) => setTokenAmount(Number(e.target.value))}
                        name="tokenAmount"
                        value={tokenAmount}
                        type="number"
                        placeholder="Enter token amount"
                        className="w-full rounded-lg border border-th-accent-2 p-2"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(3)}
                        className="w-fit bg-white"
                      >
                        Back
                      </Button>
                      <Button className="w-fit">Approve</Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
