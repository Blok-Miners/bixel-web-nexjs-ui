"use client"

import { IInfoDrawer, InfoStateEnum } from "@/types/infoDrawer"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { CircleX } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import Loader from "../Shared/Loader"

export default function InfoDrawer({ selected, open, setOpen }: IInfoDrawer) {
  const [info, setInfo] = useState({
    title: "Bixel.io",
    image: "https://bixel-uploads.s3.amazonaws.com/Bixel.png",
    description:
      "Bixel is a pixel art editor that helps you create beautiful and engaging pixel art in minutes.",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState({
    totalPixels: Object.keys(selected).length,
    totalPrice: Object.keys(selected).length * 10,
  })
  const [selectedType, setSelectedType] = useState<InfoStateEnum>(
    InfoStateEnum.NO_OWNER,
  )
  const router = useRouter()
  const getSelectedInfo = async () => {
    try {
    } catch (error) {
      console.log({ InfoDrawerError: error })
    }
  }

  const handleBuy = () => {
    router.push("/purchase")
  }

  useEffect(() => {
    setSelectedInfo({
      totalPixels: Object.keys(selected).length,
      totalPrice: Object.keys(selected).length * 10,
    })
    getSelectedInfo()
  }, [selected])

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="bg-th-black-2 text-[#CBE4DE] after:hidden md:!inset-y-0 md:inset-x-auto md:!right-0 md:m-4 md:max-w-[12rem] md:rounded-xl md:border-none md:!shadow md:outline-none">
        <DrawerHeader>
          <DrawerTitle>Pixel Insight</DrawerTitle>
          <DrawerDescription>Get to know the Pixel</DrawerDescription>
          <DrawerClose className="absolute right-4 top-4">
            <CircleX />
          </DrawerClose>
        </DrawerHeader>
        <Separator className="px-4" />
        {isLoading && (
          <div className="flex h-full w-full justify-center p-4 pt-24">
            <Loader />
          </div>
        )}
        {!isLoading && selectedType === InfoStateEnum.NO_OWNER && (
          <div className="mt-4 flex flex-col gap-4 px-4">
            <div className="text-2xl font-semibold">Buy/Rent Pixels</div>
            {/* <div className="text-sm">
              You have selected {selectedInfo.totalPixels} pixels
            </div> */}
            <div className="text-sm">
              You can buy or rent pixels for following prices. Click on the
              button below to proceed.
            </div>
            <div className="flex items-center justify-between text-lg">
              <span>Pixels:</span>
              <span className="font-semibold">{selectedInfo.totalPixels}</span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span>Rental Price:</span>
              <span className="font-semibold">
                $ {selectedInfo.totalPrice.toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span>Purchase Price:</span>
              <span className="font-semibold">
                ${" "}
                {(selectedInfo.totalPrice * 10 * 1.18).toLocaleString("en-US")}
              </span>
            </div>
          </div>
        )}
        {!isLoading && selectedType === InfoStateEnum.SINGLE_OWNER && (
          <div className="mt-4 flex flex-col gap-4 px-4">
            <div className="text-2xl font-semibold">{info.title}</div>
            <div className="text-sm">{info.description}</div>
            <div className="relative aspect-[4/3] w-full border border-th-white/20">
              <Image
                src={info.image}
                alt={info.title}
                className="h-full w-full object-contain"
                fill
              />
            </div>
          </div>
        )}
        {!isLoading && selectedType === InfoStateEnum.MULTI_OWNER && (
          <div className="mt-4 flex flex-col gap-4 px-4">
            <div className="text-2xl font-semibold">Sorry!</div>
            <div className="text-sm">
              Some of the pixels from your selection are owned by other users.
            </div>
          </div>
        )}
        {!isLoading && selectedType === InfoStateEnum.NO_OWNER && (
          <DrawerFooter className="flex w-full flex-row gap-4">
            <Button className="w-full">Rent</Button>
            <Button onClick={handleBuy} className="w-full" variant={"outline"}>
              Buy
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
