import Video from "@/components/Shared/Video"
import BugBounty from "./BugBounty/BugBounty"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function Contests({
  id,
  videoUrl,
}: {
  id: string
  videoUrl: string
}) {
  return (
    <div className="grid grid-cols-2 gap-4 bg-th-black p-6 xl:grid-cols-3">
      <BugBounty contestId="" />
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
