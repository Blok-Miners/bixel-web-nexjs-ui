import CreateReward from "@/components/Reward/CreateReward"

export default function page({
  params,
}: {
  params: {
    id: string
  }
}) {
  return (
    <div>
      <CreateReward productId={params.id}/>
    </div>
  )
}
