"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react"
import { Button } from "../ui/button"
import { useAccount, useDisconnect } from "wagmi"
import { shortenAddress } from "@/lib/utils"
import { useEffect, useState } from "react"
import { UserService } from "@/services/user"
import LoginDialog from "./LoginDialog"
import { AxiosError } from "axios"
import { useWallet } from "@/hooks/useWallet"
import { ILoginError } from "@/types/services/user"
import Link from "next/link"

export default function ConnectWallet() {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const [openDialog, setOpenDialog] = useState(false)
  const { isLoggedIn, setIsLoggedIn } = useWallet()

  const handleLogin = async () => {
    if (!isConnected || !address) return
    try {
      const userService = new UserService()
      const res = await userService.login({ walletAddress: address })
      localStorage.setItem("access_token", res.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      setIsLoggedIn(false)
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response!.data &&
        ((error as AxiosError).response!.data! as ILoginError).message ===
          "USER_NOT_FOUND"
      ) {
        setOpenDialog(true)
        return
      }
      console.error({ LoginError: error })
    }
  }

  useEffect(() => {
    handleLogin()
  }, [isConnected, address])

  return (
    <>
      <div className="flex gap-2">
        {isLoggedIn && (
          <Link href={"/dashboard"}>
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
        )}
        <Button onClick={() => open()}>
          {isConnected && address && isLoggedIn
            ? shortenAddress(address)
            : "Connect Wallet"}
        </Button>
      </div>
      <LoginDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  )
}
