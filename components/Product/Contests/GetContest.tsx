import { ContestInteractionEnum } from "@/types/services/contest"
import BugBounty from "./BugBounty/BugBounty"
import { ContractInteraction } from "./ContractInteraction"
import ProjectSubmission from "./ProjectSubmission"
import { HoldingVerification } from "./HoldingVerification"
import RegistrationVerification from "./RegistrationVerification"
import { RewardInteraction } from "@/components/Interactions/RewardInteraction"
import SurveyCard from "@/components/HoldingsPage/SurveyCard"

interface IGetContest {
  type: ContestInteractionEnum
  contestId: string
  interactionId: string
  ownerId: string
  mode: string
}

export default function GetContest({
  type,
  contestId,
  interactionId,
  ownerId,
  mode,
}: IGetContest) {
  switch (type) {
    case ContestInteractionEnum.BUG_BOUNTY:
      return (
        <BugBounty
          contestId={contestId}
          bugBountyId={interactionId}
          ownerId={ownerId}
          mode={mode}
        />
      )
    case ContestInteractionEnum.SMART_CONTRACT:
      return <ContractInteraction id={contestId} mode={mode} />
    case ContestInteractionEnum.PROJECT_SUBMISSION:
      return (
        <ProjectSubmission
          id={contestId}
          projectId={interactionId}
          mode={mode}
        />
      )
    case ContestInteractionEnum.HOLDINGS_VERIFICATION:
      return (
        <HoldingVerification
          id={contestId}
          interactionId={interactionId}
          mode={mode}
        />
      )
    case ContestInteractionEnum.REGISTRATION_VERIFICATION:
      return (
        <RegistrationVerification
          id={contestId}
          interactionId={interactionId}
          mode={mode}
        />
      )
    case ContestInteractionEnum.SURVEYS:
      return (
        <SurveyCard id={contestId} interactionId={interactionId} mode={mode} />
      )
    case ContestInteractionEnum.SOCIAL_MEDIA:
      return <RewardInteraction id={contestId} mode={mode} />
    default:
      return <></>
  }
}
