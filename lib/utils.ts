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

export const extractUsername = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url)
    const pathParts = parsedUrl.pathname.split("/").filter(Boolean)
    if (pathParts.length > 1) {
      // Remove known prefixes
      if (pathParts[0] === "in" || pathParts[0] === "user") {
        return pathParts[1]
      }
      return pathParts[0]
    }
    return pathParts.length > 0 ? pathParts[0] : null
  } catch (error) {
    console.error("Invalid URL:", url)
    return null
  }
}