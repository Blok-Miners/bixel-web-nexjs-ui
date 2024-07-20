"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function HoldingsContract({ chain, setChainID, chainId }: any) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2 text-lg font-bold">Contract Details</div>
      <div className="col-span-2 flex flex-col gap-2">
        <div>Contract Address</div>
        <Input
          name="address"
          type="text"
          placeholder="Enter contract address"
          className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div>Asset type</div>
        <Select>
          <SelectTrigger
            className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
          >
            <SelectValue placeholder="Select asset type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ERC-721" className="text-white">
                ERC-721
              </SelectItem>
              <SelectItem value="ERC-1155" className="text-white">
                ERC-1155
              </SelectItem>
              <SelectItem value="ERC-20" className="text-white">
                ERC-20
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <div>Chain</div>
        <Select value={chainId} onValueChange={setChainID}>
          <SelectTrigger
            className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
          >
            <SelectValue placeholder="Select a chain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {chain &&
                chain.map((item: any, index: any) => {
                  return (
                    <SelectItem value={item.id} className="text-white">
                      {item.name}
                    </SelectItem>
                  )
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <div>Description</div>
        <Textarea
          name="description"
          placeholder="Enter description"
          className="w-full rounded-lg border border-th-accent-2 p-4"
        />
      </div>
    </div>
  )
}
