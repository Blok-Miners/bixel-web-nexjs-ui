"use client"

import { Check, Pencil, X } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { UserTypeEnum } from "@/types/services/user"
import { Address } from "@/types/web3"
import { useWallet } from "@/hooks/useWallet"
import { ProductService } from "@/services/product"
import { useState } from "react"

export default function Actions({ id, owner }: { id: string; owner: Address }) {
  const [isLoading, setIsLoading] = useState(false)
  const handleAction = async (action: "ACCEPT" | "REJECT") => {
    setIsLoading(true)
    try {
      if (action === "ACCEPT") {
        const productService = new ProductService()
        await productService.approveProduct(id)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  const { user } = useWallet()

  return (
    <div className="absolute right-8 top-8 flex gap-1 rounded-md bg-th-black-2 p-1">
      {user && user.userType === UserTypeEnum.ADMIN && (
        <>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={() => handleAction("ACCEPT")}
            className="w-10 bg-th-black px-2 !text-white hover:bg-th-black/40"
          >
            {!isLoading && <Check color="#22c55e" strokeWidth={3} />}
          </Button>
          {/* <Button
            onClick={() => handleAction("REJECT")}
            className="w-10 bg-th-black px-2 hover:bg-th-black/40"
          >
            <X color="#fa0505" strokeWidth={3} />
          </Button> */}
        </>
      )}
      {owner === user?.walletAddress && (
        <Link href={`/product/create?product=${id}`}>
          <Button className="w-10 bg-th-black px-2 hover:bg-th-black/40">
            <Pencil size={16} color="#ffffff" strokeWidth={3} />
          </Button>
        </Link>
      )}
    </div>
  )
}
