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

export default function Display() {
  const gridWidth = window.innerWidth * 0.75
  const gridHeight = gridWidth * (10 / 16)
  const squareSize = gridHeight / 250
  const [open, setOpen] = useState(false)
  const [drawnPixels, setDrawnPixels] = useState<DrawnPixels>({})
  const { selectedSquares, setSelectedSquares, handleSelectSquare } =
    useSelection()
  const imageCache: { [key: string]: HTMLImageElement } = {}

  const { data: plan } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "planDetails",
    args: [0],
  })

  const getAllBloks = async () => {
    try {
      const pixelService = new PixelService()
      const res: BlokData[] = await pixelService.getAllBloks()
      console.log({ res })

      const drawn: DrawnPixels = res.reduce(
        (acc, { x, y, image, id, blokId, metadata }) => {
          const key = `${x}-${y}`
          //@ts-ignore
          acc[key] = {
            id,
            blokId,
            metadata,
            image: image.url,
            color: image.colorCode,
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
  }, [])

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
        pricePerMonth={plan ? (plan as bigint[])[0] : BigInt(0)}
        selected={selectedSquares}
        open={open}
        setOpen={setOpen}
        drawnPixels={drawnPixels}
      />
    </>
  )
}
