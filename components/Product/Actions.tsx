"use client"

import { Check, Pencil, X } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function Actions({ id }: { id: string }) {
  const handleAction = async (action: "ACCEPT" | "REJECT") => {}
  return (
    <div className="absolute right-8 top-8 flex gap-1 rounded-md bg-th-black-2 p-1">
      <Button
        onClick={() => handleAction("ACCEPT")}
        className="w-10 bg-th-black px-2 hover:bg-th-black/40"
      >
        <Check color="#22c55e" strokeWidth={3} />
      </Button>
      <Button
        onClick={() => handleAction("REJECT")}
        className="w-10 bg-th-black px-2 hover:bg-th-black/40"
      >
        <X color="#fa0505" strokeWidth={3} />
      </Button>
      <Link href={"/product"}>
        <Button className="w-10 bg-th-black px-2 hover:bg-th-black/40">
          <Pencil size={16} color="#ffffff" strokeWidth={3} />
        </Button>
      </Link>
    </div>
  )
}
