import { ContestInteractionEnum } from "@/types/services/contest"
import BugBounty from "./BugBounty/BugBounty"
import { ContractInteraction } from "./ContractInteraction"
import ProjectSubmission from "./ProjectSubmission"
import { HoldingVerification } from "./HoldingVerification"
import RegistrationVerification from "./RegistrationVerification"

interface IGetContest {
  type: ContestInteractionEnum
  contestId: string
  interactionId: string
  ownerId: string
}

export default function GetContest({
  type,
  contestId,
  interactionId,
  ownerId,
}: IGetContest) {
  switch (type) {
    case ContestInteractionEnum.BUG_BOUNTY:
      return (
        <BugBounty
          contestId={contestId}
          bugBountyId={interactionId}
          ownerId={ownerId}
        />
      )
    case ContestInteractionEnum.SMART_CONTRACT:
      return <ContractInteraction id={contestId} />
    case ContestInteractionEnum.PROJECT_SUBMISSION:
      return <ProjectSubmission id={contestId} />
    case ContestInteractionEnum.HOLDINGS_VERIFICATION:
      return <HoldingVerification id={contestId} />
    case ContestInteractionEnum.SMART_CONTRACT:
      return <RegistrationVerification id={contestId} />
    default:
      return <></>
  }
}
