import { ProjectSubmissions } from "@/components/HoldingsPage/ProjectSubmissions"
import CreateReward from "@/components/Reward/CreateReward"

export default function page({
  params,
}: {
  params: {
    contestId: string
  }
}) {
  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 p-8">
      <ProjectSubmissions id={params.contestId} />
    </div>
  )
}
