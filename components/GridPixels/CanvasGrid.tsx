import React, { useRef, useEffect, useState, Dispatch } from "react"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { DrawnPixels } from "@/types/services/pixel"

interface CanvasGridProps {
  gridWidth: number
  gridHeight: number
  squareSize: number
  selectedSquares: { [key: string]: boolean }
  onSelectSquare: (coords: { x: number; y: number }) => void
  setSelectedSquares: Dispatch<{ [key: string]: boolean }>
  drawnPixels: DrawnPixels
  imageCache: { [key: string]: HTMLImageElement }
}

const threshold: number = 4

const CanvasGrid: React.FC<CanvasGridProps> = ({
  gridWidth,
  gridHeight,
  squareSize,
  selectedSquares,
  onSelectSquare,
  setSelectedSquares,
  drawnPixels,
  imageCache,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [scale, setScale] = useState(1)
  const [mouseDown, setMouseDown] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [endX, setEndX] = useState(0)
  const [endY, setEndY] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [lastPanX, setLastPanX] = useState(0)
  const [lastPanY, setLastPanY] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setContext(ctx)
  }, [canvasRef])

  const drawGrid = () => {
    if (!context) return

    const canvas = canvasRef.current
    if (!canvas) return

    const numSquaresX = gridWidth / squareSize
    const numSquaresY = gridHeight / squareSize

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Apply current scale and pan offset
    context.setTransform(scale, 0, 0, scale, offsetX, offsetY)

    // Calculate visible area
    const visibleMinX = -offsetX / scale
    const visibleMaxX = visibleMinX + canvas.width / scale
    const visibleMinY = -offsetY / scale
    const visibleMaxY = visibleMinY + canvas.height / scale

    // Draw grid
    for (let y = 0; y < numSquaresY; y++) {
      for (let x = 0; x < numSquaresX; x++) {
        const squareX = x * squareSize
        const squareY = y * squareSize

        // Only draw squares that are visible
        if (
          squareX + squareSize < visibleMinX ||
          squareX > visibleMaxX ||
          squareY + squareSize < visibleMinY ||
          squareY > visibleMaxY
        ) {
          continue
        }

        if (!!drawnPixels[`${x}-${y}`]) {
          drawImage(drawnPixels[`${x}-${y}`], squareX, squareY, context)
          continue
        }

        // Draw square
        if (selectedSquares[`${x}-${y}`]) {
          context.strokeStyle = "#2C4457"
          context.strokeRect(squareX, squareY, squareSize, squareSize)
        } else {
          context.strokeStyle = "#2C3333"
          context.strokeRect(squareX, squareY, squareSize, squareSize)
        }
      }
    }
  }

  useEffect(() => {
    drawGrid()
    // context.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation
  }, [
    gridWidth,
    gridHeight,
    squareSize,
    selectedSquares,
    scale,
    offsetX,
    offsetY,
    drawnPixels,
    context,
  ])

  const drawImage = (
    value: { image: string; color: string },
    squareX: number,
    squareY: number,
    context: CanvasRenderingContext2D,
  ) => {
    if (scale > threshold) {
      const cachedImg = imageCache[value.image]
      if (cachedImg) {
        context.drawImage(cachedImg, squareX, squareY, squareSize, squareSize)
      } else {
        const img = new Image()
        img.src = value.image
        img.onload = () => {
          imageCache[value.image] = img
          context.drawImage(img, squareX, squareY, squareSize, squareSize)
        }
      }
    } else {
      context.fillStyle = value.color
      context.fillRect(squareX, squareY, squareSize, squareSize)
    }
  }

  const handleZoomIn = () => {
    const newScale = Math.min(scale * 1.5, 100) // Adjust zoom factor as needed
    setScale(newScale)
  }

  const handleZoomOut = () => {
    const newScale = Math.max(scale / 1.5, 1) // Adjust zoom factor as needed
    console.log({newScale})
    setScale(newScale <= 1 ? 1 : newScale)
  }

  const handleCanvasMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setMouseDown(true)
    if (isPanning) {
      setLastPanX(event.clientX)
      setLastPanY(event.clientY)
    } else {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const clickX = ((event.clientX - rect.left) * scaleX - offsetX) / scale
      const clickY = ((event.clientY - rect.top) * scaleY - offsetY) / scale

      setStartX(Math.floor(clickX / squareSize))
      setStartY(Math.floor(clickY / squareSize))
      setEndX(Math.floor(clickX / squareSize))
      setEndY(Math.floor(clickY / squareSize))

      // Clear previous selection
      clearSelection()
    }
  }

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (!mouseDown) return

    const canvas = canvasRef.current
    if (!canvas || !context) return

    if (isPanning) {
      const sensitivityFactor = 2.8 // Adjust this factor as needed
      const dx = (event.clientX - lastPanX) * sensitivityFactor // Increased sensitivity
      const dy = (event.clientY - lastPanY) * sensitivityFactor // Increased sensitivity
      let newOffsetX = offsetX + dx
      let newOffsetY = offsetY + dy

      // Boundary checks
      const maxOffsetX = Math.max(0, gridWidth * scale - canvas.width)
      const maxOffsetY = Math.max(0, gridHeight * scale - canvas.height)

      newOffsetX = Math.min(Math.max(newOffsetX, -maxOffsetX), 0)
      newOffsetY = Math.min(Math.max(newOffsetY, -maxOffsetY), 0)

      setOffsetX(newOffsetX)
      setOffsetY(newOffsetY)
      setLastPanX(event.clientX)
      setLastPanY(event.clientY)
    } else {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const clickX = ((event.clientX - rect.left) * scaleX - offsetX) / scale
      const clickY = ((event.clientY - rect.top) * scaleY - offsetY) / scale

      setEndX(Math.floor(clickX / squareSize))
      setEndY(Math.floor(clickY / squareSize))
    }
  }

  const handleCanvasMouseUp = () => {
    setMouseDown(false)

    if (!isPanning) {
      // Select squares within the selection box
      const minX = Math.min(startX, endX)
      const maxX = Math.max(startX, endX)
      const minY = Math.min(startY, endY)
      const maxY = Math.max(startY, endY)

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          onSelectSquare({ x, y })
        }
      }
    }
  }

  const clearSelection = () => {
    setSelectedSquares({})
  }

  const handleCanvasTouchStart = (
    event: React.TouchEvent<HTMLCanvasElement>,
  ) => {
    // event.preventDefault() // Prevent default touch behavior
    const canvas = canvasRef.current
    if (!canvas) return

    setMouseDown(true)
    if (isPanning) {
      setLastPanX(event.touches[0].clientX)
      setLastPanY(event.touches[0].clientY)
    } else {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const clickX =
        ((event.touches[0].clientX - rect.left) * scaleX - offsetX) / scale
      const clickY =
        ((event.touches[0].clientY - rect.top) * scaleY - offsetY) / scale

      setStartX(Math.floor(clickX / squareSize))
      setStartY(Math.floor(clickY / squareSize))
      setEndX(Math.floor(clickX / squareSize))
      setEndY(Math.floor(clickY / squareSize))

      // Clear previous selection
      clearSelection()
    }
  }

  const handleCanvasTouchMove = (
    event: React.TouchEvent<HTMLCanvasElement>,
  ) => {
    // event.preventDefault() // Prevent default touch behavior
    if (!mouseDown) return

    const canvas = canvasRef.current
    if (!canvas || !context) return

    if (isPanning) {
      const sensitivityFactor = 6.8 // Adjust this factor as needed
      const dx = (event.touches[0].clientX - lastPanX) * sensitivityFactor // Increased sensitivity
      const dy = (event.touches[0].clientY - lastPanY) * sensitivityFactor // Increased sensitivity
      let newOffsetX = offsetX + dx
      let newOffsetY = offsetY + dy

      // Boundary checks
      const maxOffsetX = Math.max(0, gridWidth * scale - canvas.width)
      const maxOffsetY = Math.max(0, gridHeight * scale - canvas.height)

      newOffsetX = Math.min(Math.max(newOffsetX, -maxOffsetX), 0)
      newOffsetY = Math.min(Math.max(newOffsetY, -maxOffsetY), 0)

      setOffsetX(newOffsetX)
      setOffsetY(newOffsetY)
      setLastPanX(event.touches[0].clientX)
      setLastPanY(event.touches[0].clientY)
    } else {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const clickX =
        ((event.touches[0].clientX - rect.left) * scaleX - offsetX) / scale
      const clickY =
        ((event.touches[0].clientY - rect.top) * scaleY - offsetY) / scale

      setEndX(Math.floor(clickX / squareSize))
      setEndY(Math.floor(clickY / squareSize))
    }
  }

  const handleCanvasTouchEnd = () => {
    setMouseDown(false)

    if (!isPanning) {
      // Select squares within the selection box
      const minX = Math.min(startX, endX)
      const maxX = Math.max(startX, endX)
      const minY = Math.min(startY, endY)
      const maxY = Math.max(startY, endY)

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          onSelectSquare({ x, y })
        }
      }
    }
  }

  return (
    <div className="max-w-screen max-h-hScreen relative mx-auto aspect-[10/16]">
      <canvas
        ref={canvasRef}
        width={gridWidth}
        height={gridHeight}
        className="md:max-h-hScreen aspect-[10/16] max-h-full w-full border border-th-accent-2 md:w-auto block touch-none"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onTouchStart={handleCanvasTouchStart}
        onTouchMove={handleCanvasTouchMove}
        onTouchEnd={handleCanvasTouchEnd}
      ></canvas>
      <div className="bg absolute bottom-4 right-4 flex flex-col gap-1 rounded border border-th-accent-2 bg-th-black-2 p-1 shadow-sm">
        <Button
          variant={"outline"}
          onClick={handleZoomIn}
          className="flex h-8 w-8 items-center justify-center rounded border p-0 text-3xl"
        >
          <Plus />
        </Button>
        <Button
          variant={"outline"}
          onClick={handleZoomOut}
          className="flex h-8 w-8 items-center justify-center rounded border p-0 text-3xl"
        >
          <Minus />
        </Button>
      </div>
      <div className="absolute bottom-4 left-4 flex flex-col gap-1 rounded border border-th-accent-2 bg-th-black-2 text-th-accent-2 shadow-sm">
        <label className="flex cursor-pointer items-center gap-2 p-2 text-sm">
          <Checkbox
            checked={isPanning}
            onCheckedChange={() => setIsPanning(!isPanning)}
          />
          Enable Panning
        </label>
      </div>
    </div>
  )
}

export default CanvasGrid
