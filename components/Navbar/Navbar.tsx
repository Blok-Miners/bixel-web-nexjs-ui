import Link from "next/link"
import { Button } from "../ui/button"
import ConnectWallet from "./ConnectWallet"

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between px-8 shadow">
      <Link href={"/"} className="text-2xl font-bold">
        Bixel
      </Link>
      <div className="flex items-center gap-4">
        <ConnectWallet />
      </div>
    </nav>
  )
}
