"use client"

import React, { useEffect, useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ActivityService } from "@/services/activity"
import { Activity } from "@/types/services/activity"
import { formatUnits } from "viem"

export const ActivityCard = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const getActivity = async () => {
    const activityService = new ActivityService()
    const activity = await activityService.getUserActivity()
    if (!activity) return
    setActivities(activity)
  }
  useEffect(() => {
    getActivity()
  }, [])
  return (
    <div className="flex flex-col gap-2">
      <div className="text-start text-lg">Activities</div>
      <ScrollArea className="h-[20rem] w-full rounded-2xl bg-th-accent-2/10 p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-th-accent-2">
              <TableHead className="text-th-accent">Product</TableHead>
              <TableHead className="text-th-accent">Activity</TableHead>
              {/* <TableHead className="text-th-accent">Reward</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.product.name}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                {/* <TableCell>
                  {Number(
                    formatUnits(BigInt(activity.amount), activity.tokenDecimal),
                  ).toLocaleString("en-US")}
                  {activity.tokenSymbol}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
