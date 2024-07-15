"use client"

import { useEffect, useState } from "react"
import CanvasGrid from "./CanvasGrid"
import { ISelectedSquares } from "@/types/grid"
import InfoDrawer from "./InfoDrawer"
import { useSelection } from "@/hooks/useSelectioin"

const drawnPixels = {
  "0-0": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "0-1": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "0-2": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "0-3": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "1-0": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "1-1": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "1-2": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "1-3": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "2-0": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "2-1": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "2-2": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "2-3": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "3-0": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "3-1": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "3-2": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
  "3-3": {
    image: "/pixel.png",
    color: "#E8B4F8",
  },
}

// const drawnPixels = () => {

// }

export default function Display() {
  const gridWidth = window.innerWidth * 0.75
  const gridHeight = gridWidth * (10 / 16)
  const squareSize = gridHeight / 250
  const [open, setOpen] = useState(false)
  const { selectedSquares, setSelectedSquares, handleSelectSquare } =
    useSelection()

  useEffect(() => {
    if (Object.keys(selectedSquares).length > 0) setOpen(true)
  }, [selectedSquares])

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
      />
      <InfoDrawer selected={selectedSquares} open={open} setOpen={setOpen} />
    </>
  )
}
