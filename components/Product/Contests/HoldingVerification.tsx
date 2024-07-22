"use client"

import React, { useState } from "react"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const HoldingVerification = ({ id }: { id: string }) => {
  const [assetType, setAssetType] = useState("")

  const handleButtonClick = () => {
    console.log("Selected Asset Type:", assetType)
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4">
      <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
        Holding Verification
      </span>
      <div className="col-span-2 space-y-2 rounded-xl p-2 text-sm">
        <span className="text-sm">Contract Address</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          0x11111111111111111111111111
        </div>
      </div>
      <div className="col-span-1 space-y-2 rounded-xl p-2 text-sm">
        <span className="text-sm">Chain Id</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          0x1111111111
        </div>
      </div>

      <div className="flex col-span-1 flex-col space-y-2 rounded-xl p-2">
        <span className="text-sm">Asset Type</span>
        <div className="col-span-1 flex  rounded-xl bg-th-accent-2/10 py-2">
          <Select onValueChange={(value) => setAssetType(value)}>
            <SelectTrigger className="w-full  rounded-xl border-none bg-transparent focus:ring-0 text-base font-medium">
              <SelectValue placeholder="Select" className="outline-none " />
            </SelectTrigger>
            <SelectContent className="text-white text-xl font-medium">
              <SelectItem value="NFT" className="text-white">
                NFT
              </SelectItem>
              <SelectItem value="Token" className="text-white">
                Token
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="col-span-2 m-2" onClick={() => handleButtonClick()}>
        Verify
      </Button>
    </div>
  )
}
