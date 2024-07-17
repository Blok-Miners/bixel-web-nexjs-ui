"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import ConnectWallet from "./ConnectWallet"
import { useRouter } from "next/navigation"
export default function Navbar() {
  const Router = useRouter()

  return (
    <nav className="flex h-16 items-center justify-between px-8 shadow">
      <Link href={"/"} className="text-2xl font-bold">
        Bixel
      </Link>
      <div className="flex items-center gap-4">
        <Button onClick={() => Router.push("/dashboard")}>Dashboard</Button>

        <ConnectWallet />
      </div>
    </nav>
  )
}
