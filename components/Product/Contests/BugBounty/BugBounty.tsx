"use client"
import { useState } from "react"
import { BugDialog } from "./BugDialog"
import Image from "next/image"
import { FaCheck } from "react-icons/fa"
import { ScrollArea } from "../../../ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function BugBounty({ contestId }: { contestId: string }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contestLoading, setContestLoading] = useState(false)
  return (
    <Card className="row-span-2 flex h-full flex-col">
      <CardHeader className="text-center font-bold">
        BUG BOUNTY
        <div className="font-light text-th-accent-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          odit quia voluptatem totam illum saepe.
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ScrollArea className="flex h-full flex-col gap-4 overflow-auto rounded-lg border border-th-accent-2 p-4">
          <div className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-th-black/60 p-2 hover:bg-th-black">
            <div className="flex items-center gap-2">
              <div className="aspect-square h-12">
                <Image
                  src="/product/Logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-full w-full"
                />
              </div>
              <div className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                sequi.
              </div>
            </div>

            {false && (
              <div className="flex gap-1 rounded-md bg-th-black-2 p-1">
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  // onClick={() => handleAction("ACCEPT")}
                  className="w-10 bg-th-black px-2 !text-white hover:bg-th-black/40"
                >
                  {!isLoading && <Check color="#22c55e" strokeWidth={3} />}
                </Button>
                <Button
                  // onClick={() => handleAction("REJECT")}
                  className="w-10 bg-th-black px-2 hover:bg-th-black/40"
                >
                  {!isLoading && <X color="#fa0505" strokeWidth={3} />}
                </Button>
              </div>
            )}
            {true && (
              <div className="flex gap-1 rounded-md bg-th-black-2 p-1">
                <Check color="#22c55e" strokeWidth={3} /> Verified
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <BugDialog open={open} setOpen={setOpen} />
      </CardFooter>
    </Card>
  )
}
