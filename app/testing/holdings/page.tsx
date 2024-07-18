"use client"

import { HoldingsCard } from "@/components/HoldingsPage/HoldingsCard"
import { TransactionHistory } from "@/components/HoldingsPage/TransactionHistory"
import { useAccount } from "wagmi"
import { shortenAddress } from "@/lib/utils"
import { ActivityCard } from "@/components/HoldingsPage/ActivityCard"

export default function Page() {
  const { isConnected, address } = useAccount()

  return (
    <div className="m-6 mx-auto my-12 grid max-w-[1440px] grid-cols-1 gap-4 md:grid-cols-2">
      <div className="items-center justify-center rounded-2xl bg-th-black-2 p-6 text-lg">
        <div className="my-6 rounded-2xl bg-th-accent-2/10 p-4">
          {isConnected && address ? shortenAddress(address) : "Connect Wallet"}
        </div>
      </div>
      <div className="rounded-2xl bg-th-black-2 p-6"></div>
      <div className="rounded-2xl bg-th-black-2 p-6">
        <ActivityCard />
      </div>
      <div className="rounded-2xl bg-th-black-2 p-6">
        <HoldingsCard />
      </div>
      <div className="col-span-2 rounded-2xl bg-th-black-2 p-6">
        <div className="text-lg">Transaction History</div>
        <TransactionHistory />
      </div>
    </div>
  )
}
