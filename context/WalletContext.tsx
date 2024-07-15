"use client"

import { IChildren } from "@/types/generic"
import { ISelectedSquares } from "@/types/grid"
import { createContext, Dispatch, ReactNode, useState } from "react"

export interface IWalletContext {}

export const WalletContext = createContext<IWalletContext | null>(null)

export default function WalletProvider({ children }: IChildren) {
  return <WalletContext.Provider value={{}}>{children}</WalletContext.Provider>
}
