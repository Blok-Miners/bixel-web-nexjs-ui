import { Address } from "../web3"

interface SocialMediaLinks {
  facebookUrl: string
  linkedinUrl: string
  twitterUrl: string
  telegramUrl: string
  youtubeUrl: string
}

interface DirectContact {
  email: string
  number: string
}

interface Product {
  id: string
  name: string
  groupId: string
  logo: string
  banner: string
  approved: boolean
  about: string
  websiteUrl: string
  email: string
  phone: string
  socialMediaLinks: SocialMediaLinks
  contractAuditReport: string
  country: string
  github: string
  video: string
  directContact: DirectContact
}

export interface Activity {
  id: string
  activity: string
  amount: string
  tokenAddress: Address
  tokenSymbol: string
  tokenDecimal: number
  createdAt: string
  updatedAt: string
  product: Product
}
