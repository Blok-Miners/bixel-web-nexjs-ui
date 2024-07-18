"use client"

import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react"
import { useSelection } from "@/hooks/useSelectioin"
import Loader from "../Shared/Loader"
import {
  IBuyPixel,
  IImage,
  IImageUploadResponse,
  IPixel,
  Listing_Status,
} from "@/types/services/pixel"
import { generateTokenId } from "@/lib/utils"
import { PixelService } from "@/services/pixel"
import { formSchema } from "@/types/forms"
import { useRouter } from "next/navigation"

interface Props {
  submit: (values: z.infer<typeof formSchema>) => Promise<void>
  form: UseFormReturn<z.infer<typeof formSchema>>
  setUploadedImages: Dispatch<IImageUploadResponse[]>
}

export default function ProductPageForm({
  submit,
  form,
  setUploadedImages,
}: Props) {
  const { selectedSquares } = useSelection()
  const [info, setInfo] = useState({
    rows: 1,
    cols: 1,
  })
  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(false)
  const [imageParts, setImageParts] = useState<
    {
      row: number
      col: number
      dataUrl: string
      colorCode: string
    }[]
  >([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    const maxWidth = 10 * info.cols
    const maxHeight = 10 * info.rows

    if (!files?.length) return
    setImageLoading(true)
    const file = files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          console.log({
            width: img.width,
            height: img.height,
            aspectRatio: img.width / img.height,
            info,
          })
          if (img.width > maxWidth || img.height > maxHeight) {
            setImageLoading(false)
            return
          }
          divideImage(img, info.rows, info.cols) // For example, divide into 4x4 grid
        }
        //@ts-ignore
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  const getGridDimensions = () => {
    const rows: Set<number> = new Set()
    const columns: Set<number> = new Set()

    for (const key of Object.keys(selectedSquares)) {
      if (selectedSquares[key]) {
        const [column, row] = key.split("-").map(Number)
        rows.add(row)
        columns.add(column)
      }
    }
    console.log({ rows, columns })
    setInfo({
      rows: rows.size,
      cols: columns.size,
    })
  }

  const uploadImages = async () => {
    try {
      if (imageParts.length === 0) return
      const images: IImage[] = imageParts.map((part) => {
        const { row, col, dataUrl, colorCode } = part
        const pixelId = generateTokenId(row, col)
        return {
          base64String: dataUrl,
          filename: `${pixelId}-${Date.now()}`,
          colorCode,
          pixelId,
        }
      })
      const pixelService = new PixelService()
      const res = await pixelService.uploadImages({ images })
      console.log({ data: res.data })
      setUploadedImages(res.data)
      setImageLoading(false)
    } catch (error) {
      setImageLoading(false)
    }
  }

  const calculateDominantColor = (
    data: Uint8ClampedArray,
  ): { r: number; g: number; b: number } => {
    const colorCount: { [key: string]: number } = {}
    let maxColor = ""
    let maxCount = 0

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const color = `${r},${g},${b}`
      colorCount[color] = (colorCount[color] || 0) + 1

      if (colorCount[color] > maxCount) {
        maxCount = colorCount[color]
        maxColor = color
      }
    }

    const [r, g, b] = maxColor.split(",").map(Number)
    return { r, g, b }
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  const divideImage = (img: HTMLImageElement, rows: number, cols: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const { width, height } = img
    const partWidth = width / cols
    const partHeight = height / rows
    const parts = []

    canvas.width = width
    canvas.height = height
    ctx!.drawImage(img, 0, 0, width, height)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const partCanvas = document.createElement("canvas")
        const partCtx = partCanvas.getContext("2d")
        partCanvas.width = partWidth
        partCanvas.height = partHeight
        partCtx!.drawImage(
          canvas,
          col * partWidth,
          row * partHeight,
          partWidth,
          partHeight,
          0,
          0,
          partWidth,
          partHeight,
        )
        const imageData = partCtx!.getImageData(0, 0, partWidth, partHeight)
        const colorRgb = calculateDominantColor(imageData.data)
        parts.push({
          row,
          col,
          dataUrl: partCanvas.toDataURL(),
          colorCode: rgbToHex(colorRgb.r, colorRgb.g, colorRgb.b),
        })
      }
    }

    setImageParts(parts)
  }

  useEffect(() => {
    if (Object.keys(selectedSquares).length === 0) return router.push("/")
    getGridDimensions()
  }, [selectedSquares])

  useEffect(() => {
    uploadImages()
  }, [imageParts])

  return (
    <Card className="col-span-2 row-span-2 flex flex-col rounded-xl">
      <CardHeader className="text-2xl font-bold">Bixel Info</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="grid grid-cols-2 gap-x-8 gap-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you like to name your BIXEL?</FormLabel>
                  <FormControl>
                    <Input placeholder="Bixel ltd." {...field} />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>
                      This is the title of group of Bloks.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="example.com" type="url" {...field} />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>Your business homepage.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>Your business homepage.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormItem className="col-span-2">
              <FormLabel>Select Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="col-span-2"
                disabled={imageLoading}
              />
              <FormDescription>
                Image to be displayed on the Bloks. Image cannot be more than (
                {info.cols * 10}x{info.rows * 10})
              </FormDescription>
              <FormMessage />
            </FormItem>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <div
              className="relative col-span-2 grid min-h-[10rem] gap-1 rounded-md border border-th-accent-2 p-4"
              style={{
                gridTemplateColumns: `repeat(${info.cols}, minmax(0, 1fr))`,
              }}
            >
              {imageParts.map((part, index) => (
                <div key={index}>
                  <img
                    src={part.dataUrl}
                    alt={`part-${part.row}-${part.col}`}
                    className="aspect-square h-full w-full"
                  />
                </div>
              ))}
              {(imageParts.length === 0 || imageLoading) && (
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-th-accent-2/20">
                  {imageLoading ? <Loader /> : "Please Upload Image"}
                </div>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
