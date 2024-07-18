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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button"
import { CircleX, Link2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import Loader from "../Shared/Loader"
import { PixelService } from "@/services/pixel"
import { formatUnits } from "viem"
import { useAccount } from "wagmi"
import { Address } from "@/types/web3"
import { ProductService } from "@/services/product"
import { CompanyProfile } from "@/types/services/product"
import Link from "next/link"
import { useWallet } from "@/hooks/useWallet"
import { UserTypeEnum } from "@/types/services/user"

export default function InfoDrawer({
  plans,
  selected,
  open,
  setOpen,
  drawnPixels,
}: IInfoDrawer) {
  const { address } = useAccount()
  const { user } = useWallet()
  const [info, setInfo] = useState({
    title: "",
    website: "",
    description: "",
  })
  const [grid, setGrid] = useState({
    rows: 1,
    cols: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState({
    totalPixels: Object.keys(selected).length,
    totalPrice: Object.keys(selected).length * 10,
  })
  const [group, setGroup] = useState("")
  const [product, setProduct] = useState<CompanyProfile | undefined>()
  const [selectedType, setSelectedType] = useState<InfoStateEnum>(
    InfoStateEnum.NO_OWNER,
  )
  const [owner, setOwner] = useState<Address | undefined>()
  const router = useRouter()

  const getGridDimensions = () => {
    const rows: Set<number> = new Set()
    const columns: Set<number> = new Set()

    for (const key of Object.keys(selected)) {
      if (selected[key]) {
        const [column, row] = key.split("-").map(Number)
        rows.add(row)
        columns.add(column)
      }
    }
    setGrid({
      rows: rows.size,
      cols: columns.size,
    })
  }

  const getProduct = async (groupId: string) => {
    if (!groupId) return
    const productService = new ProductService()
    try {
      const res = await productService.getProductFromGroupId(groupId)
      console.log({ res })
      if (!res) return

      setProduct(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getOwner = async () => {
    console.log({
      owner: drawnPixels[Object.keys(selected)[0]].owner,
      group: drawnPixels[Object.keys(selected)[0]].groupId,
      address,
      user,
    })
    setOwner(drawnPixels[Object.keys(selected)[0]].owner)
    const groupId = drawnPixels[Object.keys(selected)[0]].groupId
    setGroup(groupId)
    if (!groupId) return setProduct(undefined)
    await getProduct(groupId)
  }

  const getSelectedInfo = async () => {
    try {
      const blokMetaIds: string[] = Object.keys(selected).map((key) => {
        if (!drawnPixels[key]) return "_"
        return drawnPixels[key].metadata
      })
      const blokSet = new Set(blokMetaIds)
      if (blokSet.size === 0) {
        setSelectedType(InfoStateEnum.NO_OWNER)
        setIsLoading(false)
        return
      } else if (blokSet.size > 1) {
        setSelectedType(InfoStateEnum.MULTI_OWNER)
        setIsLoading(false)
        return
      } else {
        if (blokSet.has("_")) {
          setSelectedType(InfoStateEnum.NO_OWNER)
          return
        } else {
          setSelectedType(InfoStateEnum.SINGLE_OWNER)
          const blokMeta = Array.from(blokSet)[0]
          const pixelService = new PixelService()
          const blok = await pixelService.getMetadataInfo(blokMeta)
          setInfo({
            title: blok.title,
            description: blok.description,
            website: blok.website,
          })
          setIsLoading(false)
          await getOwner()
        }
      }
    } catch (error) {
      console.log({ InfoDrawerError: error })
    }
  }

  const handleRent = () => {
    router.push("/purchase")
  }

  const reset = () => {
    setGrid({ rows: 1, cols: 1 })
    setInfo({ title: "", description: "", website: "" })
    setSelectedType(InfoStateEnum.NO_OWNER)
    setOwner(undefined)
    setSelectedInfo({ totalPixels: 0, totalPrice: 0 })
  }

  useEffect(() => {
    reset()
    getGridDimensions()
    setSelectedInfo({
      totalPixels: Object.keys(selected).length,
      totalPrice: 0,
    })
    getSelectedInfo()
  }, [selected])

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="bg-th-black-2 text-[#CBE4DE] after:hidden md:!inset-y-0 md:inset-x-auto md:!right-0 md:m-4 md:max-w-[12rem] md:rounded-xl md:border-none md:!shadow md:outline-none">
        <DrawerHeader>
          <DrawerTitle>Bixel Insight</DrawerTitle>
          <DrawerDescription>Get to know the Bixel</DrawerDescription>
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
            <div className="text-2xl font-semibold">Buy/Lease Bixels</div>
            {/* <div className="text-sm">
              You have selected {selectedInfo.totalPixels} pixels
            </div> */}
            <div className="text-sm">
              You can buy or lease bixels for following prices. Click on the
              button below to proceed.
            </div>
            <div className="flex items-center justify-between text-lg">
              <span>Pixels:</span>
              <span className="font-semibold">{selectedInfo.totalPixels}</span>
            </div>
            <div className="flex flex-col justify-between gap-2 text-lg">
              <span>Lease Price:</span>
              <div className="grid grid-cols-3 gap-2">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-col items-center justify-center rounded-lg bg-th-black p-4 text-center text-lg"
                  >
                    <span className="text-xs">{plan.title}</span>
                    <span className="text-sm font-bold">
                      ${" "}
                      {(selectedInfo.totalPixels * plan.price).toLocaleString(
                        "en-US",
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span>Buy Price:</span>
              <span className="font-semibold">
                $ {(selectedInfo.totalPixels * 10_000).toLocaleString("en-US")}
              </span>
            </div>
          </div>
        )}
        {!isLoading && selectedType === InfoStateEnum.SINGLE_OWNER && (
          <div className="mt-4 flex flex-col gap-4 px-4">
            <div className="text-2xl font-semibold">{info.title}</div>
            <div
              style={{
                gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
              }}
              className="relative grid w-full border border-th-white/20"
            >
              {Object.keys(selected).map((key) => (
                <div className="relative aspect-square w-full" key={key}>
                  <Image
                    src={drawnPixels[key].image}
                    alt={drawnPixels[key].id}
                    className="h-full w-full object-fill"
                    fill
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">About</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-left">
                    {info.description.substring(0, 200)}...
                  </TooltipTrigger>
                  <TooltipContent className="w-64 border-none bg-th-black">
                    <div className="text-white">{info.description}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center gap-2 font-light">
                <Link2 />
                <a
                  href={info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {info.website}
                </a>
              </div>
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
            <Button onClick={handleRent} className="w-full">
              Lease
            </Button>
            <Button className="w-full" variant={"outline"}>
              Buy
            </Button>
          </DrawerFooter>
        )}
        {!isLoading && selectedType === InfoStateEnum.SINGLE_OWNER && (
          <DrawerFooter className="flex w-full flex-col gap-4">
            {product &&
              (user?.userType === UserTypeEnum.ADMIN || product.approved) && (
                <Link href={`/product/${product.id}`}>
                  <Button onClick={handleRent} className="w-full">
                    Active Events
                  </Button>
                </Link>
              )}
            {!product && owner === address && (
              <Link href={`/product/create/${group}`}>
                <Button className="w-full" variant={"outline"}>
                  Create Product Page
                </Button>
              </Link>
            )}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
