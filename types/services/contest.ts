import { Address } from "../web3"

export enum ContestModeEnum {
  TIMEFRAME = "TIMEFRAME",
  LEADERBOARD = "LEADERBOARD",
}

export interface ICreateContest {
  contractAddress: Address
  abi: []
  chainId: string
  eventName: string
  url: string
  description: string
  productId: string
  noOfWinners: number
  mode: ContestModeEnum
  startDate: Date | null
  endDate: Date | null
}

export enum ContestInteractionEnum{
  SMART_CONTRACT = "SMART_CONTRACT",
  BUG_BOUNTY = "BUG_BOUNTY",
  HOLDINGS_VERIFICATION = "HOLDINGS_VERIFICATION",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  REGISTRATION_VERIFICATION = "REGISTRATION_VERIFICATION",
  SURVEYS = "SURVEYS",
}