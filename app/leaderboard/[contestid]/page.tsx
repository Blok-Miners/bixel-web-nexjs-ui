import Leaderboard from "@/components/Leaderboard/Leaderboard";

export default function Page({ params }: { params: { contestId: string } }) {
  return (
    <div>
      <Leaderboard contestId={params.contestId} />
    </div>
  )
}
