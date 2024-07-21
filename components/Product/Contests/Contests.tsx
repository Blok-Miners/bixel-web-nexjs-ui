import Video from "@/components/Shared/Video"
import BugBounty from "./BugBounty/BugBounty"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function Contests({
  id,
  videoUrl,
  ownerId,
}: {
  id: string
  videoUrl: string
  ownerId: string
}) {
  return (
    <div className="grid grid-cols-2 gap-4 bg-th-black p-6 xl:grid-cols-3">
      <BugBounty
        contestId="669cc472ad97317a2ea6c124"
        bugBountyId="669cc472ad97317a2ea6c122"
        ownerId = {ownerId}
      />
      <Video src={videoUrl} />
      <Link
        href={`/product/${id}/contest`}
        className="flex h-full w-full items-center justify-center rounded-lg border-2 border-th-accent-2 bg-th-accent-2/5 p-8 transition-all hover:bg-th-accent-2/20"
      >
        <Plus size={64} color="#76ABAE" />
      </Link>
    </div>
  )
}
