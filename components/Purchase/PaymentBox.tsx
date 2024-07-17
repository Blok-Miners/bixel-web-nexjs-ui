"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import ConfirmationDialog from "../Shared/ConfirmationDialog"
import { StatusEnum } from "@/types/confirmationTypes"
import { useSelection } from "@/hooks/useSelectioin"
import { contractAddress, tokens } from "@/lib/payment"
import Image from "next/image"
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"
import { tokenAbi } from "@/lib/tokenAbi"
import { formatUnits, getAddress, parseEther, parseUnits } from "viem"
import { formatArray, generateTokenId } from "@/lib/utils"
import { Address } from "@/types/web3"
import { contractAbi } from "@/lib/contractAbi"
import {
  IImageUploadResponse,
  IIntentPixel,
  ITransactionIntent,
  Listing_Status,
} from "@/types/services/pixel"
import { PixelService } from "@/services/pixel"
import axios from "axios"

const plans = [
  {
    id: "0x1",
    title: "1 Month Plan",
    description: "One Month Rental of the Selected Bloks",
    price: 100,
    tenure: 100,
  },
  {
    id: "0x2",
    title: "6 Month Plan",
    description: "Six Month Rental of the Selected Bloks",
    price: 90,
    tenure: 100000,
  },
  {
    id: "0x3",
    title: "1 Year Plan",
    description: "One Year Rental of the Selected Bloks",
    price: 80,
    tenure: 1000000,
  },
]

const paymentMethods = [
  {
    id: "crypto",
    title: "Crypto",
  },
  {
    id: "credit_card",
    title: "Credit Card",
  },
]

// const chains = [
//   {
//     id: "ethereum",
//     title: "Ethereum",
//     chainId: 1,
//   },
//   {
//     id: "binance",
//     title: "Binance Smart Chain",
//     chainId: 97,
//   },
// ]

export default function PaymentBox({
  metadata,
  getMetadataUrls,
  uploadedImages,
  metadataId,
}: {
  metadata: string[]
  getMetadataUrls: any
  uploadedImages: IImageUploadResponse[]
  metadataId: string | undefined
}) {
  const { address } = useAccount()
  const { selectedSquares } = useSelection()
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>()
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>()
  const [token, setToken] = useState<string | undefined>()
  // const [selectedChain, setSelectedChain] = useState<string | undefined>()
  const [total, setTotal] = useState(0)
  const [tx, setTx] = useState<Address | undefined>()
  const [approvalHash, setApprovalHash] = useState<Address | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

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
  const {
    data: balances,
    isLoading: balancesLoading,
    refetch,
  } = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        abi: tokenAbi,
        address: getAddress(tokens[0].address),
        functionName: "balanceOf",
        args: formatArray([address]),
      },
      {
        abi: tokenAbi,
        address: getAddress(tokens[0].address),
        functionName: "allowance",
        args: formatArray([address, contractAddress]),
      },
      {
        abi: tokenAbi,
        address: getAddress(tokens[1].address),
        functionName: "balanceOf",
        args: formatArray([address]),
      },
      {
        abi: tokenAbi,
        address: getAddress(tokens[1].address),
        functionName: "allowance",
        args: formatArray([address, contractAddress]),
      },
    ],
  })

  const { writeContractAsync } = useWriteContract()

  const callWebhook = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/webhook/payment-received`,
      {
        data: [
          {
            id: "\\x1fd245cbace0b02819a6c113f584c3caf774497e3686ef29e0a10b9c7bc682ad4a000000",
            vid: 1,
            user: `\\${address?.slice(1)}`,
            token: "\\x55d398326f99059fF775485246999027B3197955",
            amount: 1000000000000000000000,
            block$: 40319572,
            block_number: 40319572,
            block_timestamp: 1720520478,
            transaction_hash: `\\${tx?.slice(1)}`,
          },
        ],
      },
    )
  }

  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((plan) => plan.id === selectedPlan)
      if (!plan) return
      setTotal(plan.price * Object.keys(selectedSquares).length)
    } else {
      setTotal(0)
    }
  }, [selectedPlan])

  useEffect(() => {
    console.log(balances)
  }, [balances, balancesLoading])

  const initBuy = async () => {
    if (!token) return
    try {
      setLoading(true)
      await getMetadataUrls()
    } catch (e) {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      if (!token) return
      const allowance = await writeContractAsync({
        abi: tokenAbi,
        address: getAddress(tokens[0].address),
        functionName: "approve",
        args: [contractAddress, parseEther("10000000")],
      })
      setApprovalHash(allowance)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const checkApproval = () => {
    const idx = tokens.findIndex((tok) => tok.address === token)
    if (idx === -1) return false
    if (!balances) return false
    const allowance = formatUnits(
      balances[idx * 2 + 1].result as bigint,
      tokens[idx].decimals,
    )
    if (Number(allowance) < total) return false
    return true
  }

  const handleIntent = async (hash: Address) => {
    const data: IIntentPixel[] = Object.keys(selectedSquares).map((key, i) => {
      const [column, row] = key.split("-").map(Number)
      const blokId = generateTokenId(row, column)
      const pixel: IIntentPixel = {
        x: column,
        y: row,
        image: uploadedImages[i].id,
        blokId,
        listing_status: Listing_Status.Rental,
        metadataUrl: metadata[i],
      }
      return pixel
    })
    const body: ITransactionIntent = {
      data,
      metadata: metadataId!,
      txHash: hash,
      listing_status: Listing_Status.Rental,
      planId: Number(selectedPlan),
      expiryDate: new Date(
        Date.now() + plans[Number(selectedPlan)].tenure * 1000,
      ),
    }

    const pixelService = new PixelService()
    await pixelService.transactionIntent(body)
  }

  const handleBuyBloks = async () => {
    try {
      if (!token) return
      if (metadata.length === 0) return
      setLoading(true)
      const approval = checkApproval()
      if (!approval) return handleApprove()
      const reqTuple = metadata.map((uri, i) => {
        const [col, row] = Object.keys(selectedSquares)
          [i].split("-")
          .map(Number)
        return {
          uri,
          id: generateTokenId(row, col),
          plan: Number(selectedPlan),
          startTime: Math.floor(Date.now() / 1000),
        }
      })
      console.log({ args: [reqTuple, getAddress(token)] })
      const hash = await writeContractAsync({
        abi: contractAbi,
        address: contractAddress,
        functionName: "buyPixel",
        args: [reqTuple, getAddress(token)],
      })
      setTx(hash)
      handleIntent(hash)
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
    setLoading(false)
    callWebhook()
  }, [receipt, receiptLoading, receiptError])

  useEffect(() => {
    handleBuyBloks()
  }, [metadata])

  useEffect(() => {
    if (!approvalHash) return
    if (!receiptApproval) return
    if (receiptErrorApproval) return
    if (receiptLoadingApproval) return
    refetch()
    handleBuyBloks()
  }, [receiptApproval, receiptErrorApproval, receiptLoadingApproval])

  return (
    <>
      <Card className="col-span-1 row-span-2 flex flex-col rounded-xl">
        <CardHeader className="text-2xl font-bold">Payment Info</CardHeader>
        <CardContent className="flex h-full flex-col gap-4 text-lg">
          <div className="fontsem flex justify-between text-2xl">
            <div className="">Pixels</div>
            <div className="font-medium">
              {Object.keys(selectedSquares).length.toLocaleString("en-US")}
            </div>
          </div>

          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="w-full text-lg font-medium">
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedPlan && (
            <div className="flex flex-col gap-2 rounded-md border border-th-accent-2 p-4">
              {/* <div className="flex justify-between">
              <div className="">
                Price
                <span className="text-sm font-light">/pixel</span>
                </div>
                <div className="font-medium">
                ${" "}
                {plans
                  .find((plan) => plan.id === selectedPlan)
                  ?.price.toLocaleString("en-US")}
                  </div>
                  </div> */}
              <div className="flex justify-between">
                <div className="">Total</div>
                <div className="font-medium">
                  $ {total.toLocaleString("en-US")}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full text-lg font-medium">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {paymentMethods.map((pay) => (
                  <SelectItem key={pay.id} value={pay.id}>
                    {pay.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger className="w-full text-lg font-medium">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tokens.map((pay) => (
                  <SelectItem
                    value={pay.address}
                    key={pay.address}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between gap-20">
                      <div className="flex items-center gap-2">
                        <Image
                          className="h-6 w-6"
                          src={pay.logo}
                          alt={pay.name}
                          width={300}
                          height={300}
                        />
                        <span>{pay.name}</span>
                      </div>
                      {balances && (
                        <span className="w-full text-right text-xs">
                          $
                          {formatUnits(
                            balances[0].result as bigint,
                            pay.decimals,
                          )}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger className="w-full text-lg font-medium">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {paymentMethods.map((pay) => (
                <SelectItem value={pay.id}>{pay.title}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
          <Button
            onClick={initBuy}
            disabled={!selectedPlan || !token || loading}
            className="w-full"
            isLoading={loading}
          >
            Pay Now
          </Button>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        message={<div>Transaction Successful</div>}
        title="Transaction Successful"
        open={false}
        status={StatusEnum.SUCCESS}
        setOpen={(boolean) => {}}
      />
    </>
  )
}
