import Leaderboard from "@/components/Leaderboard/Leaderboard"

export default function Page({ params }: { params: { contestId: string } }) {
  return <Leaderboard contestId={params.contestId} />
}
