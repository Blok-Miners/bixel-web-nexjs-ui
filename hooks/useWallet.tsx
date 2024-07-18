import { IWalletContext, WalletContext } from "@/context/WalletContext"
import { useContext } from "react"

export function useWallet() {
  const ctx = useContext(WalletContext) as IWalletContext
  return ctx
}
