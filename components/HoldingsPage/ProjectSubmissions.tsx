"use client"

import React, { useEffect } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { ContestService } from "@/services/contest"
import { ProductService } from "@/services/product"

interface ProjectSubmissionsProps {
  id: string;
}

export const ProjectSubmissions = ({ id } : ProjectSubmissionsProps) => {

  const getTransactions = async () => {
    try {
      const transactionService = new ProductService()
      const transactions = await transactionService.getProductSubmissions(id)
      console.log(transactions)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])


  return (
    <div className="rounded-2xl border border-th-accent-2 bg-th-accent-2/10 p-8">
      <div className="mb-6 w-full text-center text-xl font-medium">
        Project Submissions
      </div>

      <ScrollArea className="[box-shadow: inset gray 0px 0px 60px -12px] insetshadow h-[75vh]">
        <div className="mb-4 grid grid-cols-3 gap-x-5 gap-y-2 rounded-2xl border border-th-accent-2/40 p-4">
          <div className="col-span-1 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Project Name :</Label>
            <div className="rounded-md bg-th-accent-2/10 p-2">random name</div>
          </div>
          <div className="col-span-1 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Video URL :</Label>
            <div className="rounded-md bg-th-accent-2/10 p-2">random url</div>
          </div>
          <div className="col-span-1 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Demo URL :</Label>
            <div className="rounded-md bg-th-accent-2/10 p-2">random url</div>
          </div>
          <div className="col-span-1 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Github URL :</Label>
            <div className="rounded-md bg-th-accent-2/10 p-2">random url</div>
          </div>
          <div className="col-span-1 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Contract Address :</Label>
            <div className="rounded-md bg-th-accent-2/10 p-2">
              random address
            </div>
          </div>
          <div className="col-span-1 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Chain :</Label>
            <div className="rounded-md bg-th-accent-2/10 p-2">random chain</div>
          </div>
          <div className="col-span-3 items-center space-y-2 p-2">
            <Label className="text-th-accent-2">Project Description :</Label>
            <div className="h-40 rounded-md bg-th-accent-2/10 p-2">
              random description
            </div>
          </div>
          <Button className="col-span-3 mx-auto w-fit items-center space-y-2 p-2 px-6">
            Verify
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
