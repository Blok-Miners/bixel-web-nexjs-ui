import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
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
  const [transactions, setTransactions] = useState<Record<string, any>>({})
  const [groupedPixels, setGroupedPixels] = useState<Record<string, Pixel[]>>(
    {},
  )
  const PixelDetails = async () => {
    try {
      const pixelService = new PixelService()
      const res = await pixelService.getMyPixels()
      const grouped = groupByGroupId(res)
      setGroupedPixels(grouped)
      console.log(grouped)
      await fetchTransactionDetails(Object.keys(grouped))
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    PixelDetails()
  }, [])

  const groupByGroupId = (pixels: Pixel[]) => {
    const grouped = pixels.reduce(
      (acc: Record<string, Pixel[]>, pixel: Pixel) => {
        if (pixel.groupId) {
          if (!acc[pixel.groupId]) {
            acc[pixel.groupId] = []
          }
          acc[pixel.groupId].push(pixel)
        }
        return acc
      },
      {},
    )

    Object.keys(grouped).forEach((groupId) => {
      grouped[groupId].sort((a, b) => {
        if (a.x === b.x) {
          return parseInt(a.y) - parseInt(b.y)
        }
        return parseInt(a.x) - parseInt(b.x)
      })
    })

    return grouped
  }

  const fetchTransactionDetails = async (groupIds: string[]) => {
    try {
      const transactionDetails = await Promise.all(
        groupIds.map(async (groupId) => {
          const pixelService = new PixelService()
          const transaction =
            await pixelService.getLastTransactionByGroupId(groupId)
          return { groupId, transaction }
        }),
      )
      const transactionsMap = transactionDetails.reduce(
        (acc: Record<string, any>, { groupId, transaction }) => {
          acc[groupId] = transaction
          return acc
        },
        {},
      )
      setTransactions(transactionsMap)
      console.log(transactionsMap)
    } catch (error) {
      console.log({ error })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const getPlanDescription = (planId: string) => {
    switch (planId) {
      case "0":
        return "1 month"
      case "1":
        return "6 months"
      case "2":
        return "12 months"
      default:
        return "Unknown plan"
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-th-accent-2 text-th-accent-2">
            <TableHead className="text-th-accent">Coordinates</TableHead>
            <TableHead className="text-th-accent">Expiring On</TableHead>
            <TableHead className="text-th-accent">Plan</TableHead>
            <TableHead className="text-th-accent">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(groupedPixels).map((groupId) => {
            const group = groupedPixels[groupId]
            const firstCoordinate = `(${group[0].x}, ${group[0].y})`
            const lastCoordinate = `(${group[group.length - 1].x}, ${group[group.length - 1].y})`

            return (
              <TableRow key={groupId} className="border-th-accent-2">
                <TableCell className="font-medium">{`${firstCoordinate} - ${lastCoordinate}`}</TableCell>
                {transactions[groupId] && (
                  <TableCell>
                    {formatDate(transactions[groupId].updatedAt)}
                  </TableCell>
                )}

                {transactions[groupId] && (
                  <TableCell>
                    {getPlanDescription(transactions[groupId].planId)}
                  </TableCell>
                )}

                <TableCell>
                  <Button>Renew</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
