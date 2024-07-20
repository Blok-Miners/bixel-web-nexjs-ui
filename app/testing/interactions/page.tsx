import { ContractInteraction } from "@/components/Interactions/ContractInteraction"
import { HoldingVerification } from "@/components/Interactions/HoldingVerification"
import ProjectSubmission from "@/components/Interactions/ProjectSubmission"

export default function page() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8 my-16">
      <ContractInteraction />
      <ProjectSubmission />
      <HoldingVerification />
    </div>
  )
}
