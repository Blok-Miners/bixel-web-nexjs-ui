import SelectionProvider from "@/context/SelectionContext"
import WalletProvider from "@/context/WalletContext"
import Web3ModalProvider from "@/context/Web3Context"
import { config } from "@/lib/wagmi"
import { IChildren } from "@/types/generic"
import { headers } from "next/headers"
import { cookieToInitialState } from "wagmi"

export default function Providers({ children }: IChildren) {
  const initialState = cookieToInitialState(config, headers().get("cookie"))
  return (
    <Web3ModalProvider initialState={initialState}>
      <SelectionProvider>
        <WalletProvider>{children}</WalletProvider>
      </SelectionProvider>
    </Web3ModalProvider>
  )
}
