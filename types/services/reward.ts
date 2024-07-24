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
export interface ICreateCouponPool {
  coupon: string
  contestId: string
  totalWinners: number
}

export enum AssetTypeEnum {
  Token = "Token",
  Coupon = "Coupon",
  NFT = "NFT",
}

export enum INftType{
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}


export interface ICreateNFTPool {
  address: Address
  chainId: string
  NFTs:string[]
  distributedNFTS:number
  contestId:string
  totalWinners: number
  nftType:INftType
}