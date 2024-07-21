import { Address } from "../web3"

export interface ICreateTokenPool {
  address: Address
  symbol: string
  chainId: string
  txHash: Address
  tokenPerWinner: number
  totalTokens: number
  contestId: string
  totalWinners: number
}
