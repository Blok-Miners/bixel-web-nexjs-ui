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
import { bscDepositContractAddress } from "@/lib/chains"
import { rewardAbi } from "@/lib/rewardAbi"
import { tokenAbi } from "@/lib/tokenAbi"
import { formatArray } from "@/lib/utils"
import { ChainService } from "@/services/chain"
import { RewardService } from "@/services/reward"
import { Address } from "@/types/web3"
import { useEffect, useState } from "react"
import {
  FaCheck,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa"
import { formatUnits, getAddress, parseEther, parseUnits } from "viem"
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

export default function RewardDetails({
  setStep3Error,
  setRewardType,
  setCouponType,
  rewardType,
  couponType,
  setDepositAmountToken,
  totalWinners,
  depositAmountToken,
  setStep,
  step3Error,
  couponCode,
  setCouponCode,
  setDepositAmountNFT,
  depositAmountNFT,
  contestId
}: any) {
  const [blockchainData, setBlockchainData] = useState({
    chainDeployed: "",
  })
  const [chain, setChain] = useState([])
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState<Address | undefined>()
  const [tx, setTx] = useState<Address | undefined>()
  const [amountPerWinner, setAmountPerWinner] = useState<number | undefined>()
  const [approvalHash, setApprovalHash] = useState<Address | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const getAllChain = async () => {
    const chains = new ChainService()
    const allChain = await chains.getChains()
    if (allChain) {
      setChain(allChain)
    }
  }

  const {
    data: receipt,
    isLoading: receiptLoading,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: tx,
  })

  const {
    data: receiptApproval,
    isLoading: receiptLoadingApproval,
    error: receiptErrorApproval,
  } = useWaitForTransactionReceipt({
    hash: approvalHash,
  })

  const { writeContractAsync } = useWriteContract()

  const {
    data: balances,
    isLoading: balancesLoading,
    refetch,
  } = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        abi: tokenAbi,
        address: tokenAddress ? getAddress(tokenAddress) : undefined,
        functionName: "balanceOf",
        args: formatArray([address]),
      },
      {
        abi: tokenAbi,
        address: tokenAddress ? getAddress(tokenAddress) : undefined,
        functionName: "allowance",
        args: formatArray([address, bscDepositContractAddress]),
      },
      {
        abi: tokenAbi,
        address: tokenAddress ? getAddress(tokenAddress) : undefined,
        functionName: "decimals",
      },
      {
        abi: tokenAbi,
        address: tokenAddress ? getAddress(tokenAddress) : undefined,
        functionName: "symbol",
      },
    ],
  })

  const handleApprove = async () => {
    try {
      if (!tokenAddress) return
      const allowance = await writeContractAsync({
        abi: tokenAbi,
        address: getAddress(tokenAddress),
        functionName: "approve",
        args: [bscDepositContractAddress, parseEther("1000000")],
      })
      setApprovalHash(allowance)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const checkApproval = () => {
    if (!balances) return false
    const allowance = formatUnits(
      balances[1].result as bigint,
      Number(balances[2].result),
    )
    if (Number(allowance) < depositAmountToken) return false
    return true
  }

  const handleCreateTokenPool = async () => {
    try {
      // if (!tokenAddress || !balances || !amountPerWinner || ) return
      const rewardService = new RewardService()
      const res = await rewardService.createTokenPool({
        address: getAddress(tokenAddress!),
        symbol: balances![3].result as string,
        tokenPerWinner: Number(amountPerWinner!),
        chainId: blockchainData.chainDeployed,
        totalTokens: depositAmountToken,
        txHash: tx!,
        contestId: contestId,
        totalWinners 
      })
      console.log(res)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDepositTokens = async () => {
    console.log({ tokenAddress, depositAmountToken, balances })
    try {
      if (!tokenAddress || !depositAmountToken) return
      setLoading(true)
      const approval = checkApproval()
      if (!approval) return handleApprove()

      const hash = await writeContractAsync({
        abi: rewardAbi,
        address: bscDepositContractAddress,
        functionName: "depositTokens",
        args: [
          getAddress(tokenAddress),
          parseUnits(
            depositAmountToken.toString(),
            Number(balances![2].result),
          ),
        ],
      })

      setTx(hash)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!tx) return
    if (!receipt) return
    if (receiptError) return
    if (receiptLoading) return
    handleCreateTokenPool()
  }, [receipt, receiptLoading, receiptError])

  useEffect(() => {
    if (!approvalHash) return
    if (!receiptApproval) return
    if (receiptErrorApproval) return
    if (receiptLoadingApproval) return
    refetch()
    handleDepositTokens()
  }, [receiptApproval, receiptErrorApproval, receiptLoadingApproval])

  useEffect(() => {
    getAllChain()
  }, [])

  const handleDeposit = () => {}

  return (
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
          <div className="flex w-fit flex-col gap-4 pl-6">
            <Select value={couponType} onValueChange={setCouponType}>
              <SelectTrigger
                className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
              >
                <SelectValue placeholder="Select a coupon type" />
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
              <div className="flex items-end gap-6">
                <div className="flex flex-col gap-2">
                  <div>Generic coupon</div>
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="px-4 py-6"
                    placeholder="Enter coupon code"
                  />
                </div>
                <Button className="w-fit">Submit</Button>
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
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 flex flex-col gap-2">
              <div>Token Address</div>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTokenAddress(e.target.value as Address)
                }
                className="px-4 py-6"
                placeholder="Token Address"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
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
                  className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
                >
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {chain &&
                      chain.map((item: any, index: any) => {
                        return (
                          <SelectItem key={index} value={item.id} className="text-white">
                            {item.name}
                          </SelectItem>
                        )
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <div>Amount per winner </div>
              <Input
                value={amountPerWinner}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value: any = e.target.value
                  setAmountPerWinner(value)
                  setDepositAmountToken(value * totalWinners)
                  console.log(value * totalWinners)
                }}
                type="number"
                className="px-4 py-6"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>Total Winners </div>
              <div className="p-2 text-lg font-semibold">{totalWinners}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Deposit Tokens </div>
              <div className="p-2 text-lg font-semibold">
                {depositAmountToken}
              </div>
            </div>
            <Button
              isLoading={loading}
              disabled={loading}
              onClick={handleDepositTokens}
              className="w-fit"
            >
              Deposit
            </Button>
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
        {rewardType === "nft" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="flex w-full flex-col gap-2">
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
                  className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
                >
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {chain &&
                      chain.map((item: any, index: any) => {
                        return (
                          <SelectItem key={index} value={item.id} className="text-white">
                            {item.name}
                          </SelectItem>
                        )
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div>NFT type</div>
              <Select>
                <SelectTrigger
                  className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
                >
                  <SelectValue placeholder="Select NFT type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ERC-721" className="text-white">
                      ERC-721
                    </SelectItem>
                    <SelectItem value="ERC-1155" className="text-white">
                      ERC-1155
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <div>Amount per winner </div>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value: any = e.target.value
                  setDepositAmountNFT(value * totalWinners)
                  console.log(value * totalWinners)
                }}
                type="number"
                className="px-4 py-6"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>Total Winners </div>
              <div className="p-2 text-lg font-semibold">{totalWinners}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Deposit Tokens </div>
              <div className="p-2 text-lg font-semibold">
                {depositAmountNFT}
              </div>
            </div>
            <Button className="w-fit">Deposit</Button>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setStep(2)}
          className="flex w-fit items-center gap-2 bg-white hover:bg-slate-200"
        >
          <FaLongArrowAltLeft />
          <div>Back</div>
        </Button>
        {/* <Button
          onClick={() => setStep(4)}
          className="flex w-fit items-center gap-2"
        >
          <div>Next</div> <FaLongArrowAltRight />
        </Button> */}
      </div>
      {step3Error && <div className="text-sm text-red-500">{step3Error}</div>}
    </div>
  )
}
