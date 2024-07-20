"use client"

import { useEffect, useState } from "react"
import CanvasGrid from "./CanvasGrid"
import { ISelectedSquares } from "@/types/grid"
import InfoDrawer from "./InfoDrawer"
import { useSelection } from "@/hooks/useSelectioin"
import { PixelService } from "@/services/pixel"
import { BlokData, DrawnPixels } from "@/types/services/pixel"
import { useReadContract, useReadContracts } from "wagmi"
import { contractAbi } from "@/lib/contractAbi"
import { contractAddress } from "@/lib/payment"
import { formatUnits } from "viem"

export default function Display() {
  const gridWidth = window.innerWidth * 0.75
  const gridHeight = gridWidth * (10 / 16)
  const squareSize = gridHeight / 250
  const [open, setOpen] = useState(false)
  const [drawnPixels, setDrawnPixels] = useState<DrawnPixels>({})
  const { selectedSquares, setSelectedSquares, handleSelectSquare } =
    useSelection()
  const imageCache: { [key: string]: HTMLImageElement } = {}
  const [plans, setPlans] = useState<
    { id: number; title: string; price: number; duration: number }[]
  >([])

  const { data: plan } = useReadContracts({
    contracts: [
      {
        abi: contractAbi,
        address: contractAddress,
        functionName: "planDetails",
        args: [0],
      },
      {
        abi: contractAbi,
        address: contractAddress,
        functionName: "planDetails",
        args: [1],
      },
      {
        abi: contractAbi,
        address: contractAddress,
        functionName: "planDetails",
        args: [2],
      },
    ],
  })

  const getAllBloks = async () => {
    try {
      const pixelService = new PixelService()
      const res: BlokData[] = await pixelService.getAllBloks()
      console.log({ res })

      const drawn: DrawnPixels = res.reduce(
        (acc, { x, y, image, id, blokId, metadata, currentOwner, groupId }) => {
          const key = `${x}-${y}`
          //@ts-ignore
          acc[key] = {
            id,
            blokId,
            metadata,
            image: image.url,
            color: image.colorCode,
            owner: currentOwner.walletAddress,
            groupId,
          }
          return acc
        },
        {} as DrawnPixels,
      )

      setDrawnPixels(drawn)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    if (Object.keys(selectedSquares).length > 0) setOpen(true)
  }, [selectedSquares])

  useEffect(() => {
    getAllBloks()
    setSelectedSquares({})
  }, [])

  useEffect(() => {
    if (!plan) return
    setPlans([
      {
        id: 0,
        price: Number(formatUnits((plan[0].result as bigint[])[0], 18)),
        duration: 0,
        title: "1 Month",
      },
      {
        id: 1,
        price: Number(formatUnits((plan[1].result as bigint[])[0], 18)),
        duration: 0,
        title: "6 Months",
      },
      {
        id: 2,
        price: Number(formatUnits((plan[2].result as bigint[])[0], 18)),
        duration: 0,
        title: "12 Months",
      },
    ])
  }, [plan])

  return (
    <>
      <CanvasGrid
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        squareSize={squareSize}
        selectedSquares={selectedSquares}
        setSelectedSquares={setSelectedSquares}
        onSelectSquare={handleSelectSquare}
        drawnPixels={drawnPixels}
        imageCache={imageCache}
      />
      <InfoDrawer
        plans={plans}
        selected={selectedSquares}
        open={open}
        setOpen={setOpen}
        drawnPixels={drawnPixels}
      />
    </>
  )
}
