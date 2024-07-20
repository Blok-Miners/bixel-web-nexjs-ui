import { Address } from "../web3"

export enum ContestModeEnum {
    TIMEFRAME = 'TIMEFRAME',
    LEADERBOARD = 'LEADERBOARD',
  }
  

export interface ICreateContest {
  contractAddress: Address
  abi: []
  chainId: string
  eventName: string
  url: string
  description: string
  productId:string
  noOfWinners: number
  mode:ContestModeEnum
}
