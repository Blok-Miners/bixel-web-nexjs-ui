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
import { useAccount, useReadContracts } from "wagmi"
import { tokenAbi } from "@/lib/tokenAbi"
import { formatUnits, getAddress, parseEther, parseUnits } from "viem"
import { formatArray } from "@/lib/utils"

const plans = [
  {
    id: "0x1",
    title: "1 Month Plan",
    description: "One Month Rental of the Selected Bloks",
    price: 100,
  },
  {
    id: "0x2",
    title: "6 Month Plan",
    description: "Six Month Rental of the Selected Bloks",
    price: 90,
  },
  {
    id: "0x3",
    title: "1 Year Plan",
    description: "One Year Rental of the Selected Bloks",
    price: 80,
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
  disabled,
  metadata,
}: {
  disabled: boolean
  metadata: string | undefined
}) {
  const { address } = useAccount()
  const { selectedSquares } = useSelection()
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>()
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>()
  const [token, setToken] = useState<string | undefined>()
  // const [selectedChain, setSelectedChain] = useState<string | undefined>()
  const [total, setTotal] = useState(0)

  const { data: balances, isLoading: balancesLoading } = useReadContracts({
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
                  <SelectItem value={plan.id}>{plan.title}</SelectItem>
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
                  <SelectItem value={pay.id}>{pay.title}</SelectItem>
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
                  <SelectItem value={pay.address} className="w-full">
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
          <Button disabled={disabled || !metadata} className="w-full">
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
