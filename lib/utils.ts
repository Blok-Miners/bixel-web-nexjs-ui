import { Address } from "@/types/web3"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: Address) {
  return `${address.substring(0, 4)}...${address.substring(address.length - 5, address.length)}`
}

export const formatArray = (array: any[]) => {
  return JSON.parse(JSON.stringify(array))
}

export const generateTokenId = (x: number, y: number) => {
  return y * 400 + x + 1
}

export const getAccessToken = () => `Bearer ${localStorage.getItem("access_token")}`
