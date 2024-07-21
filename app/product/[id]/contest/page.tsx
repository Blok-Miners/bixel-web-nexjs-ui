import CreateReward from "@/components/Reward/CreateReward"

export default function page({
  params,
}: {
  params: {
    id: string
  }
}) {
  return <CreateReward productId={params.id} />
}
