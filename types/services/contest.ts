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
export interface ICreateSurveyContest {
  formURL: string
  sheetURL: string
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
  PROJECT_SUBMISSION = "PROJECT_SUBMISSION"
}
export enum SocialMediaEnum {
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
  DISCORD = 'DISCORD',
  TELEGRAM = "TELEGRAM"
}

export interface ISocialMediaInteraction {
  socialMedia?: ISocialMedia[]
  description: string
  productId: string
  noOfWinners: number
  mode: ContestModeEnum
  startDate: Date | null
  endDate: Date | null
}

export interface ISocialMedia {
  type:string,
  url:string,
  activity:string
  botToken?:string
  chatId?:string
}

export interface IChain {
  chainid? : string
  id? : string
  logo?:string
  name?:string
  nativeCoin?:string
  nativeCoinDecimal?:string
  rpc?:string
}

export interface IFetchSocialMedia extends ISocialMedia {
  _id:string
}

export interface ISocialSubmissions{
  socialMedia:string
  verified:boolean
}