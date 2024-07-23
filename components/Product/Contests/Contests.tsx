"use client"

import Video from "@/components/Shared/Video"
import BugBounty from "./BugBounty/BugBounty"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { ContestService } from "@/services/contest"
import GetContest from "./GetContest"
import { useAccount } from "wagmi"
import { ContestInteractionEnum } from "@/types/services/contest"

export default function Contests({
  id,
  videoUrl,
  ownerId,
}: {
  id: string
  videoUrl: string
  ownerId: string
}) {
  const { address } = useAccount()
  const [contests, setContests] = useState<
    {
      type: ContestInteractionEnum
      interaction: string
      _id: string
    }[]
  >([])
  const getAllContests = async () => {
    const contestService = new ContestService()
    const allContests = await contestService.getContests(id)
    // console.log(allContests)
    setContests(allContests)
  }

  useEffect(() => {
    getAllContests()
  }, [])
  return (
    <div className="grid grid-cols-2 gap-4 bg-th-black p-6 xl:grid-cols-3">
      <div className="flex flex-col gap-4">
        <Video src={videoUrl} />
        {address === ownerId && (
          <Link
            href={`/product/${id}/contest`}
            className="flex h-full max-h-[16rem] w-full items-center justify-center rounded-lg border-2 border-th-accent-2 bg-th-accent-2/5 p-8 transition-all hover:bg-th-accent-2/20"
          >
            <Plus size={64} color="#76ABAE" />
          </Link>
        )}
      </div>
      {contests.map((contest) => (
        <GetContest
          contestId={contest._id}
          ownerId={ownerId}
          interactionId={contest.interaction}
          type={contest.type}
          key={contest._id}
        />
      ))}
    </div>
  )
}
