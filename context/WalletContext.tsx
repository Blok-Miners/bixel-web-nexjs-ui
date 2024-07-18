"use client"

import { UserService } from "@/services/user"
import { IChildren } from "@/types/generic"
import { IUser } from "@/types/services/user"
import { createContext, Dispatch, useEffect, useState } from "react"
import { useAccount } from "wagmi"

export interface IWalletContext {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<boolean>
  user: IUser | undefined
  setUser: Dispatch<IUser | undefined>
}

export const WalletContext = createContext<IWalletContext | null>(null)

export default function WalletProvider({ children }: IChildren) {
  const { address } = useAccount()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<IUser | undefined>()
  const getUser = async () => {
    const userService = new UserService()
    const res = await userService.getUser()
    setUser(res)
  }

  useEffect(() => {
    getUser()
  }, [isLoggedIn, address])

  return (
    <WalletContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser }}
    >
      {children}
    </WalletContext.Provider>
  )
}
