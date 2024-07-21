import { ContestInteractionEnum } from "@/types/services/contest"
import BugBounty from "./BugBounty/BugBounty"

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
    case ContestInteractionEnum.HOLDINGS_VERIFICATION:
      return <></>
    default:
      return <></>
  }
}
