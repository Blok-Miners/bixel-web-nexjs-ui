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
import { Transaction } from "@/services/transaction"
import { shortenAddress } from "@/lib/utils"
import { Address } from "@/types/web3"
import { ScrollArea } from "../ui/scroll-area"
import { PixelService } from "@/services/pixel"

interface ITransaction {
  txHash: Address
  payment_date: string
  planId: number
  amount: string
  expiry_date: string
}

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const getTransactions = async () => {
    try {
      const transactionService = new Transaction()
      const transactions = await transactionService.getTransactions()
      setTransactions(transactions)
      console.log({ transactions })
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <ScrollArea className="h-[400px] rounded-2xl bg-th-accent-2/10 p-4">
      <Table>
        {/* <TableCaption></TableCaption> */}
        <TableHeader>
          <TableRow className="border-th-accent-2">
            <TableHead className="items-center text-th-accent">
              Tx Hash
            </TableHead>
            <TableHead className="items-center text-th-accent">Date</TableHead>
            <TableHead className="items-center text-th-accent">Plan</TableHead>
            <TableHead className="items-center text-th-accent">
              Amount
            </TableHead>
            <TableHead className="text-th-accent">Expiry</TableHead>
            {/* <TableHead className="text-th-accent">Bixels</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow className="border-th-accent-2" key={index}>
              <TableCell className="font-medium">
                {shortenAddress(transaction.txHash)}
              </TableCell>
              <TableCell>{transaction.payment_date}</TableCell>
              <TableCell>{transaction.planId}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.expiry_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
