import { ContractInteraction } from "@/components/Interactions/ContractInteraction"
import { HoldingVerification } from "@/components/Interactions/HoldingVerification"
import ProjectSubmission from "@/components/Interactions/ProjectSubmission"
import { RewardInteraction } from "@/components/Interactions/RewardInteraction"

export default function page() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8 my-16">
      <ContractInteraction id={"669bb9b3663e883c122fb899"} />
      <ProjectSubmission />
      <HoldingVerification />
      <RewardInteraction/>
    </div>
  )
}
