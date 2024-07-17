import { Address } from "../web3"

export interface IUploadImages {
  images: IImage[]
}

export interface IImage {
  base64String: string
  filename: string
  colorCode: string
  pixelId: number
}

export interface IBuyPixel {
  data: IPixel[]
  title: string
  description: string
  website: string
}

export interface IPixel {
  x: number
  y: number
  image: string
  blokId: number
  listing_status: Listing_Status
}

export enum Listing_Status {
  Rental = "Rental",
  Sale = "Sale",
}

export interface IImageUploadResponse {
  id: string
  url: string
  colorCode: string
  pixelId: number
  assigned: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ITransactionIntent {
  data: IPixel[]
  metadata: string
  txHash: Address
  listing_status: Listing_Status
  expiryDate: Date
  planId: number
}

export interface IIntentPixel {
  x: number
  y: number
  image: string
  blokId: number
  listing_status: Listing_Status
  metadataUrl: string
}

export interface DrawnPixels {
  [key: string]: {
    id: string
    blokId: number
    image: string
    color: string
    metadata: string
    owner: Address
  }
}

export interface BlokData {
  id: string
  x: number
  y: number
  metadata: string
  metadataUrl: string
  blokId: number
  listing_status: string
  image: {
    id: string
    url: string
    colorCode: string
    pixelId: string
    assigned: boolean
    createdAt: string
    updatedAt: string
  }
  currentOwner: {
    id: string
    email: string
    walletAddress: Address
  }
}
