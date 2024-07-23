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
import { Dispatch, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  FaCheck,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa"
import {
  erc20Abi,
  erc721Abi,
  formatUnits,
  getAddress,
  parseEther,
  parseUnits,
} from "viem"
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"
import { erc1155Abi } from "@/lib/erc1155Abi"

interface IRewardDetails {
  productId: string
  setStep3Error?: Dispatch<React.SetStateAction<string | undefined>>
  setRewardType?: Dispatch<React.SetStateAction<string>>
  setCouponType?: Dispatch<React.SetStateAction<string>>
  rewardType?: string
  couponType?: string
  setDepositAmountToken?: any
  totalWinners?: number
  depositAmountToken?: any
  setStep?: any
  step3Error?: any
  couponCode?: any
  setCouponCode?: any
  setDepositAmountNFT?: any
  depositAmountNFT?: any
  contestId?: any
}

export default function RewardDetails({
  productId,
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
  contestId,
}: IRewardDetails) {
  const [blockchainData, setBlockchainData] = useState({
    chainDeployed: "",
  })
  const [chain, setChain] = useState([])
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState<Address | undefined>()
  const [tx, setTx] = useState<Address | undefined>()
  const [amountPerWinner, setAmountPerWinner] = useState<number | undefined>()
  const [approvalHash, setApprovalHash] = useState<Address | undefined>()
  const [nftIds, setNftsIds] = useState<string[]>([])
  const [nftType, setNftType] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [nftAmount1155, setNftAmount1155] = useState<string[]>([])
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

  const router = useRouter()

  const handleCreateTokenPool = async () => {
    try {
      // if (!tokenAddress || !balances || !amountPerWinner || ) return
      if (!totalWinners) return
      const rewardService = new RewardService()
      const res = await rewardService.createTokenPool({
        address: getAddress(tokenAddress!),
        symbol: balances![3].result as string,
        tokenPerWinner: Number(amountPerWinner!),
        chainId: blockchainData.chainDeployed,
        totalTokens: depositAmountToken,
        txHash: tx!,
        contestId: contestId,
        totalWinners,
      })
      console.log(res)
      setLoading(false)
      if (productId) router.push(`/product/${productId}`)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleCreateCouponPool = async () => {
    try {
      if (!couponCode) return
      if (!totalWinners) return
      setLoading(true)
      const rewardService = new RewardService()
      const res = await rewardService.createCouponPool({
        coupon: couponCode,
        contestId: contestId,
        totalWinners,
      })
      console.log(res)
      setLoading(false)
      if (productId) router.push(`/product/${productId}`)
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

  const [ercApprovalHash, setErcApprovalHash] = useState<Address | undefined>()
  const [ercTxHash, setErcTxHash] = useState<Address | undefined>()

  const {
    data: ercApprovalReceipt,
    isLoading: ercLoadingApproval,
    error: ercErrorApproval,
  } = useWaitForTransactionReceipt({
    hash: ercApprovalHash,
  })

  const {
    data: ercTxHashReceipt,
    isLoading: ercTxLoading,
    error: ercTxError,
  } = useWaitForTransactionReceipt({
    hash: ercTxHash,
  })

  const {
    data: erc721Approved,
    isLoading: erc721Loading,
    refetch: erc721Refetch,
  } = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        abi: erc721Abi,
        address: tokenAddress ? getAddress(tokenAddress) : undefined,
        functionName: "isApprovedForAll",
        args: formatArray([address, bscDepositContractAddress]),
      },
    ],
  })

  const {
    data: erc1155Approved,
    isLoading: erc1155Loading,
    refetch: erc1155Refetch,
  } = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        abi: erc1155Abi,
        address: tokenAddress ? getAddress(tokenAddress) : undefined,
        functionName: "isApprovedForAll",
        args: formatArray([address, bscDepositContractAddress]),
      },
    ],
  })

  const checkERC721Approval = () => {
    if (!erc721Approved) return false
    return erc721Approved[0].result
  }

  const checkERC1155Approval = () => {
    if (!erc1155Approved) return false
    return erc1155Approved[0].result
  }

  const handleERC721Approve = async () => {
    try {
      if (!tokenAddress) return
      const hash = await writeContractAsync({
        abi: erc721Abi,
        address: getAddress(tokenAddress),
        functionName: "setApprovalForAll",
        args: [bscDepositContractAddress, true],
      })
      console.log(hash)
      setErcApprovalHash(hash)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleERC1155Approve = async () => {
    try {
      console.log(tokenAddress)
      if (!tokenAddress || !address) return
      const hash = await writeContractAsync({
        abi: erc1155Abi,
        address: getAddress(address),
        functionName: "setApprovalForAll",
        args: [bscDepositContractAddress, true],
      })
      setErcApprovalHash(hash)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDeposit721 = async () => {
    console.log(tokenAddress,depositAmountNFT,depositAmountNFT)
    try {
      if (!tokenAddress || !depositAmountNFT) return
      if (totalWinners !== nftIds.length) return
      setLoading(true)
      const approval = checkERC721Approval()
      console.log(approval)
      if (!approval) return handleERC721Approve()
      const hash = await writeContractAsync({
        abi: rewardAbi,
        address: bscDepositContractAddress,
        functionName: "depositNfts721",
        args: [getAddress(tokenAddress), nftIds],
      })
      console.log(hash)
      setErcTxHash(hash)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDeposit1155 = async () => {
    console.log(tokenAddress, erc1155Approved)
    try {
      if (!tokenAddress || !depositAmountNFT) return
      if (
        totalWinners !== nftIds.length &&
        nftAmount1155.length !== nftIds.length
      )
        return
      setLoading(true)
      const approval = checkERC1155Approval()
      console.log(approval)
      if (!approval) return handleERC1155Approve()
      const hash = await writeContractAsync({
        abi: rewardAbi,
        address: bscDepositContractAddress,
        functionName: "depositNfts1155",
        args: [getAddress(tokenAddress), nftIds, nftAmount1155],
      })
      console.log(hash,"11555")
      setErcTxHash(hash)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDepositNfts = () => {
    if (nftType === "ERC-721") {
      return handleDeposit721()
    } else if (nftType === "ERC-1155") {
      console.log(nftAmount1155)
      return handleDeposit1155()
    }
  }

  const handleCreateNftPool = async () => {
    try {
      if (!totalWinners) return
      const rewardService = new RewardService()
      const res = await rewardService.createNftPool({
        address: getAddress(tokenAddress!),
        chainId: blockchainData.chainDeployed,
        NFTs: nftIds,
        distributedNFTS: 0,
        contestId,
        totalWinners,
      })
      console.log(res)
      setLoading(false)
      if (productId) router.push(`/product/${productId}`)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const numberArray = input
      .split(",")
      .map((num) => num.trim())
      .filter((num) => !isNaN(Number(num)) && num !== "")

    if (e.target.name === "tokenIds") {
      setNftsIds(numberArray)
    }
    setNftAmount1155(numberArray)
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
    if (!ercApprovalHash) return
    if (!ercApprovalReceipt) return
    if (receiptErrorApproval) return
    if (receiptLoadingApproval) return
    if(nftType === 'ERC-721'){
      erc721Refetch()
      handleDeposit721()
    }
    erc1155Refetch()
    handleDeposit1155()

  }, [ercApprovalReceipt, ercLoadingApproval, ercErrorApproval])

  useEffect(() => {
    if (!ercTxHash) return
    if (!ercTxHashReceipt) return
    if (ercTxError) return
    if (ercTxLoading) return
    handleCreateNftPool()
  }, [ercTxHashReceipt, ercTxLoading, ercTxError])

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
            setStep3Error?.("")
            setRewardType?.("couponcode")
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
                <Button
                  isLoading={loading}
                  disabled={loading}
                  onClick={handleCreateCouponPool}
                  className="w-fit"
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        )}
        <div
          onClick={() => {
            setStep3Error?.("")
            setRewardType?.("token")
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
                          <SelectItem
                            key={index}
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
            <div className="flex flex-col gap-2">
              <div>Amount per winner </div>
              <Input
                value={amountPerWinner}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value: any = e.target.value
                  setAmountPerWinner(value)
                  setDepositAmountToken(totalWinners ? value * totalWinners : 0)
                  console.log(totalWinners ? value * totalWinners : 0)
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
            setStep3Error?.("")
            setRewardType?.("nft")
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
                          <SelectItem
                            key={index}
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
            <div className="flex w-full flex-col gap-2">
              <div>NFT type</div>
              <Select onValueChange={(value) => setNftType(value)}>
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
              <div>Tokens per winner </div>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value: any = e.target.value
                  setDepositAmountNFT(totalWinners ? value * totalWinners : 0)
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
            <div className="col-span-2 flex flex-col gap-2">
              <div>Token Ids</div>
              <Input
                name="tokenIds"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e)
                }
                className="px-4 py-6"
                placeholder="1,2,3,4,5,6"
              />
            </div>
            {nftType === "ERC-1155" && (
              <div className="col-span-2 flex flex-col gap-2">
                <div>Amount per Token</div>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                  }
                  className="px-4 py-6"
                  placeholder="1.0,2.0,3.0,4.0,5.0,6.0"
                />
                <span>Please enter in decimals</span>
              </div>
            )}

            <Button className="w-fit" onClick={handleDepositNfts}>
              Deposit
            </Button>
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
