"use client"
import { useEffect, useState } from "react"
import { ChainService } from "@/services/chain"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { FaCheck } from "react-icons/fa"
import { FaLongArrowAltRight } from "react-icons/fa"
import { FaLongArrowAltLeft } from "react-icons/fa"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContestService } from "@/services/contest"
import { ContestModeEnum, ICreateContest } from "@/types/services/contest"
import { Address } from "@/types/web3"
// export default function CreateBlockchainReward() {

export default function CreateBlockchainReward({
  productId,
}: {
  productId: string
}) {
  const chains = new ChainService()
  const [chain, setChain] = useState([])
  const getAllChain = async () => {
    const allChain = await chains.getChains()
    if (allChain) {
      setChain(allChain)
    }
  }
  useEffect(() => {
    getAllChain()
  }, [])
  const contestService = new ContestService()
  const [step, setStep] = useState(1)
  const [contestId, setContestId] = useState("")
  const [blockchainData, setBlockchainData] = useState({
    contractAddress: "",
    abi: "",
    chainDeployed: "",
    eventName: "",
    url: "",
    description: "",
  })
  const [depositAmount, setDepositAmount] = useState(0)
  const [couponType, setCouponType] = useState("")
  // const [userType, setUserType] = useState("")
  const [mode, setMode] = useState<ContestModeEnum>(ContestModeEnum.LEADERBOARD)
  const [rewardType, setRewardType] = useState("")
  const [tokenAmount, setTokenAmount] = useState(0)
  const [totalWinners, setTotalWineers] = useState(0)
  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target
    setStep1Error("")

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

  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")
  const [step3Error, setStep3Error] = useState("")
  const [step4Error, setStep4Error] = useState("")

  const handleContestClick = async () => {
    try {
      const contestData: ICreateContest = {
        productId,
        contractAddress: blockchainData.contractAddress as Address,
        abi: JSON.parse(blockchainData.abi),
        chainId: blockchainData.chainDeployed,
        eventName: blockchainData.eventName,
        mode,
        noOfWinners: totalWinners,
        description: blockchainData.description,
        url: blockchainData.url,
      }

      const res = await contestService.createContest(contestData)
      setContestId(res._id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    if (
      !blockchainData.contractAddress ||
      !blockchainData.abi ||
      !blockchainData.chainDeployed ||
      !blockchainData.eventName
    ) {
      setStep(1)
      setStep1Error("All details are required")
      return
    }
    if (!mode) {
      setStep(2)
      setStep2Error("Please select contest type")
      return
    }
    if (!rewardType) {
      setStep(3)
      setStep3Error("Please select reward type")
      return
    }
    console.log(blockchainData)
  }
  return (
    <>
      <div className="sticky top-0 z-10 flex gap-4 bg-th-black-2 px-4 text-sm text-slate-200 shadow-lg">
        <button
          onClick={() => setStep(1)}
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          {/* <div>
            <FaLongArrowAltRight />
          </div> */}
          <div>Contract Details</div>
        </button>
        <button
          onClick={() => setStep(2)}
          className={`font-medium ${step === 2 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>
            <FaLongArrowAltRight />
          </div>
          <div>Contest type</div>
        </button>
        <button
          onClick={() => setStep(3)}
          className={`font-medium ${step === 3 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>
            <FaLongArrowAltRight />
          </div>
          <div>Reward type</div>
        </button>
        <button
          onClick={() => setStep(4)}
          className={`font-medium ${step === 4 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          <div>
            <FaLongArrowAltRight />
          </div>
          <div>Final</div>
        </button>
      </div>
      <div className="mt-8 h-[90%] overflow-y-auto px-4">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="text-lg font-bold">Contract Details</div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div>Contract Address</div>
                <Input
                  onChange={handleChange}
                  value={blockchainData.contractAddress}
                  name="contractAddress"
                  type="text"
                  placeholder="Enter your contract address"
                  className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Contract Abi</div>
                <Textarea
                  onChange={handleChange}
                  name="abi"
                  value={blockchainData.abi}
                  placeholder="Enter token Abi"
                  className="w-full rounded-lg border border-th-accent-2 p-4"
                />
              </div>
              <div className="flex w-full gap-4">
                {/* <div className="flex w-1/2 flex-col gap-2">
                  <div>Chain</div>
                  <Input
                    onChange={handleChange}
                    name="chainDeployed"
                    value={blockchainData.chainDeployed}
                    type="text"
                    placeholder="Enter chain"
                    className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
                  />
                </div> */}
                <div className="flex w-1/2 flex-col gap-2">
                  <div>Chain</div>
                  <Select
                    onValueChange={(value) =>
                      setBlockchainData({
                        ...blockchainData,
                        chainDeployed: value,
                      })
                    }
                  >
                    <SelectTrigger
                      className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-2 px-4 hover:bg-opacity-50`}
                    >
                      <div>Select a chain</div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {chain &&
                          chain.map((item: any, index) => {
                            return (
                              <SelectItem
                                value={item.id}
                                className="text-white"
                              >
                                {item.name}
                              </SelectItem>
                            )
                          })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <div>Event Name</div>
                  <Input
                    onChange={handleChange}
                    name="eventName"
                    value={blockchainData.eventName}
                    type="text"
                    placeholder="Enter event type"
                    className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>Interaction URL</div>
                <Input
                  onChange={handleChange}
                  value={blockchainData.url}
                  name="url"
                  type="text"
                  placeholder="Enter url"
                  className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Description/Steps to participate</div>
                <Textarea
                  onChange={handleChange}
                  value={blockchainData.description}
                  name="description"
                  placeholder="Enter description"
                  className="w-full rounded-lg border border-th-accent-2 p-4"
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                className="flex w-fit items-center gap-2"
              >
                <div>Next</div> <FaLongArrowAltRight />
              </Button>
              {step1Error && (
                <div className="text-sm text-red-500">{step1Error}</div>
              )}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="text-lg font-bold">Select Contest</div>
            <div className="flex flex-col gap-6">
              {/* <div
                onClick={() => {
                  setStep2Error("")
                  setUserType("first100")
                }}
                className={`${userType === "first100" ? "bg-th-accent-2 text-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200 hover:bg-[#3c4646]`}
              >
                <div className="flex items-center gap-2">
                  <FaLongArrowAltRight /> <div>First 100</div>
                </div>
                {userType === "first100" && (
                  <div className="text-black">
                    <FaCheck />
                  </div>
                )}
              </div> */}
              <div
                onClick={() => {
                  setStep2Error("")
                  setMode(ContestModeEnum.TIMEFRAME)
                }}
                className={`${mode === ContestModeEnum.TIMEFRAME ? "bg-th-accent-2 text-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200 hover:bg-[#3c4646]`}
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
                  setStep2Error("")
                  setMode(ContestModeEnum.LEADERBOARD)
                }}
                className={`${mode === ContestModeEnum.LEADERBOARD ? "bg-th-accent-2 text-black" : "bg-th-black-2"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200 hover:bg-[#3c4646]`}
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
                <div className="flex flex-col gap-2">
                  <div>No. of winners</div>
                  <Input
                    // onChange={handleChange}
                    // value={blockchainData.contractAddress}
                    // name="contractAddress"
                    onChange={(e) => {
                      setTotalWineers(parseInt(e.target.value))
                    }}
                    type="number"
                    placeholder="Enter no. of winners"
                    className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                className="flex w-fit items-center gap-2 bg-white hover:bg-slate-200"
              >
                <FaLongArrowAltLeft />
                <div>Back</div>
              </Button>
              <Button
                onClick={handleContestClick}
                className="flex w-fit items-center gap-2"
              >
                <div>Next</div> <FaLongArrowAltRight />
              </Button>
            </div>
            {step2Error && (
              <div className="text-sm text-red-500">{step2Error}</div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div className="text-lg font-bold">Select Reward type</div>
            <div className="flex flex-col gap-6">
              <div
                onClick={() => {
                  setStep3Error("")
                  setRewardType("couponcode")
                }}
                className={`${rewardType === "couponcode" ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
              >
                <div className="flex items-center gap-2">
                  <FaLongArrowAltRight /> <div>Coupon Code</div>
                </div>
                {rewardType === "couponcode" && (
                  <div className="">
                    <FaCheck />
                  </div>
                )}
              </div>
              {rewardType === "couponcode" && (
                <div className="flex flex-col gap-4 pl-6">
                  {/* <div className="flex flex-col gap-2">
                    <div>Single use coupons</div>
                    <Input
                      className="px-4 py-6"
                      placeholder="ABC300, ABC-400 ..."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>Generic coupon</div>
                    <Input
                      className="px-4 py-6"
                      placeholder="Enter coupon code"
                    />
                  </div> */}
                  <Select onValueChange={(e) => setCouponType(e)}>
                    <SelectTrigger
                      className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-2 px-4 hover:bg-opacity-50`}
                    >
                      Select a Coupon Type
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Generic" className="text-white">
                          Generic
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {couponType === "Generic" && (
                    <div className="flex flex-col gap-2">
                      <div>Generic coupon</div>
                      <Input
                        className="px-4 py-6"
                        placeholder="Enter coupon code"
                      />
                    </div>
                  )}
                </div>
              )}
              <div
                onClick={() => {
                  setStep3Error("")
                  setRewardType("token")
                }}
                className={`${rewardType === "token" ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
              >
                <div className="flex items-center gap-2">
                  <FaLongArrowAltRight /> <div>Token</div>
                </div>
                {rewardType === "token" && (
                  <div className="">
                    <FaCheck />
                  </div>
                )}
              </div>
              {rewardType === "token" && (
                <div className="flex flex-col gap-4 pl-6">
                  <div className="flex w-1/2 flex-col gap-2">
                    <div>Chain</div>
                    <Select>
                      <SelectTrigger
                        className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-2 px-4 hover:bg-opacity-50`}
                      >
                        Select a chain
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value="Polygonmatic"
                            className="text-white"
                          >
                            Polygonmatic
                          </SelectItem>
                          <SelectItem
                            value="Binance Smartchain"
                            className="text-white"
                          >
                            Binance Smartchain
                          </SelectItem>
                          <SelectItem
                            value="Ethereum Mainnet"
                            className="text-white"
                          >
                            Ethereum Mainnet
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>Amount per winner </div>
                    <Input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value: any = e.target.value
                        setDepositAmount(value * totalWinners)
                        console.log(value * totalWinners)
                      }}
                      type="number"
                      className="px-4 py-6"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>Total winner </div>
                    <div className="w-[150px] rounded-lg bg-th-black p-4">
                      {totalWinners}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>Deposit Tokens </div>
                    <Input
                      value={depositAmount}
                      type="number"
                      className="px-4 py-6"
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button className="w-fit">Deposit</Button>
                </div>
              )}
              <div
                onClick={() => {
                  setStep3Error("")
                  setRewardType("nft")
                }}
                className={`${rewardType === "nft" ? "bg-th-accent-2 text-black" : "bg-th-black-2 hover:bg-[#3c4646]"} flex cursor-pointer items-center justify-between rounded-lg border border-th-black p-4 shadow-md transition-all duration-200`}
              >
                <div className="flex items-center gap-2">
                  <FaLongArrowAltRight /> <div>NFT</div>
                </div>
                {rewardType === "nft" && (
                  <div className="">
                    <FaCheck />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                className="flex w-fit items-center gap-2 bg-white hover:bg-slate-200"
              >
                <FaLongArrowAltLeft />
                <div>Back</div>
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex w-fit items-center gap-2"
              >
                <div>Next</div> <FaLongArrowAltRight />
              </Button>
            </div>
            {step3Error && (
              <div className="text-sm text-red-500">{step3Error}</div>
            )}
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col gap-6">
            <div className="text-lg font-bold">Approve Token Amount</div>
            <div className="flex flex-col gap-4">
              <div>Enter Amount</div>
              <Input
                onChange={(e) => setTokenAmount(Number(e.target.value))}
                name="tokenAmount"
                value={tokenAmount}
                type="number"
                placeholder="Enter token amount"
                className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep(3)}
                className="flex w-fit items-center gap-2 bg-white hover:bg-slate-200"
              >
                <FaLongArrowAltLeft />
                <div>Back</div>
              </Button>
              <Button onClick={handleSubmit} className="w-fit">
                Approve
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
