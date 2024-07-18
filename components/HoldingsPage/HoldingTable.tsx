import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { PixelService } from "@/services/pixel"

interface Pixel {
  id: string
  groupId: string | null
  expiry: string
  x: string
  y: string
  metadata: string
  metadataUrl: string
  listing_status: string
}

export const HoldingsTable = () => {
  const PixelDetails = async () => {
    try {
      const pixelService = new PixelService()
      const res = await pixelService.getMyPixels()
      console.log(res)
      const grouped = groupByGroupId(res)
      console.log(grouped)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    PixelDetails()
  }, [])

  const groupByGroupId = (pixels: Pixel[]) => {
    return pixels.reduce((acc: Record<string, Pixel[]>, pixel: Pixel) => {
      if (pixel.groupId) {
        if (!acc[pixel.groupId]) {
          acc[pixel.groupId] = []
        }
        acc[pixel.groupId].push(pixel)
      }
      return acc
    }, {})
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-th-accent-2 text-th-accent-2">
            <TableHead className="text-th-accent">Coordinates</TableHead>
            <TableHead className="text-th-accent">Expiring On</TableHead>
            <TableHead className="text-th-accent">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-th-accent-2">
            <TableCell className="font-medium">1,1</TableCell>
            <TableCell>1/1/2024</TableCell>
            <TableCell>
              <Button>Renew</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
