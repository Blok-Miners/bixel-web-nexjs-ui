"use client"

import { HoldingsCard } from "@/components/HoldingsPage/HoldingsCard"
import { TransactionHistory } from "@/components/HoldingsPage/TransactionHistory"
import { useAccount } from "wagmi"
import { shortenAddress } from "@/lib/utils"
import { ActivityCard } from "@/components/HoldingsPage/ActivityCard"
import RewardTable from "@/components/HoldingsPage/Reward"
import { SocialMediaSubmissions } from "@/components/HoldingsPage/SocialMediaSubmissions"
import { ProjectSubmissions } from "@/components/HoldingsPage/ProjectSubmissions"

export default function Page() {
  const { isConnected, address } = useAccount()

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 p-8 md:grid-cols-2">
      <div className="rounded-2xl bg-th-black-2 p-6 text-2xl font-bold">
        User Dashboard
      </div>
      <div className="flex items-center justify-center rounded-2xl bg-th-black-2 p-6 text-lg">
        {isConnected && address && shortenAddress(address)}
      </div>
      <div className="rounded-2xl bg-th-black-2 p-4">
        <ActivityCard />
      </div>
      <div className="rounded-2xl bg-th-black-2 p-4">
        <HoldingsCard />
      </div>
      <div className="col-span-1 flex flex-col gap-2 rounded-2xl bg-th-black-2 p-4">
        <div className="text-lg">Transaction History</div>
        <TransactionHistory />
      </div>
      <div className="col-span-1 flex flex-col gap-2 rounded-2xl bg-th-black-2 p-4">
        <div className="text-lg">Reward Table</div>
        <RewardTable />
      </div>
      <div className="col-span-2 flex flex-col gap-2 rounded-2xl bg-th-black-2 p-4">
        <div className="text-lg">Social Media Submissions</div>
        <SocialMediaSubmissions />
      </div>
      <div className="col-span-2 flex flex-col gap-2 rounded-2xl bg-th-black-2 p-4">
        <div className="text-lg">Project Submissions</div>
        <ProjectSubmissions />
      </div>
    </div>
  )
}
