"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react"
import { Button } from "../ui/button"
import { useAccount } from "wagmi"
import { shortenAddress } from "@/lib/utils"
import { useEffect } from "react"
import { UserService } from "@/services/user"

export default function ConnectWallet() {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()

  const handleLogin = async () => {
    if (!isConnected || !address) return
    try {
      const userService = new UserService()
      const res = await userService.login({ walletAddress: address })
      localStorage.setItem("access_token", res.accessToken)
    } catch (error) {
      console.error({ LoginError: error })
    }
  }

  useEffect(() => {
    handleLogin()
  }, [isConnected, address])

  return (
    <Button onClick={() => open()}>
      {isConnected && address ? shortenAddress(address) : "Connect Wallet"}
    </Button>
  )
}
