"use client"

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
import { ScrollArea } from "../ui/scroll-area"
import { ContestService } from "@/services/contest"

interface ProjectSubmissionsProps {
  id: string
}

export const SocialMediaSubmissions = ({ id }: ProjectSubmissionsProps) => {
  const [isOwner, setIsOwner] = useState(false)
  const [submissions, setSubmissions] = useState<any[]>([])

  const fetchSocialMediaSubmissions = async () => {
    try {
      const submissions = await new ContestService().getSocialMediaDetails(id)
      setSubmissions(submissions)
      console.log(submissions)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClaim = async (id: string, userId: string) => {
    try {
      await new ContestService().verifyProductsSocialMediaSubmission(id, userId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkOwnership()
    fetchSocialMediaSubmissions()
  }, [id])

  const checkOwnership = async () => {
    try {
      const contestService = new ContestService()
      const isOwnerResponse = await contestService.isProductOwner(id)
      setIsOwner(isOwnerResponse.isOwner)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ScrollArea className="h-[400px] rounded-2xl bg-th-accent-2/10 p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-th-accent-2 text-th-accent-2">
              <TableHead className="text-th-accent">Social Media</TableHead>
              <TableHead className="text-th-accent">Interaction Type</TableHead>
              <TableHead className="text-th-accent">Username</TableHead>
              <TableHead className="text-th-accent">Verify</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={index}>
                <TableCell>{submission.socialMedia.type}</TableCell>
                <TableCell>{submission.socialMedia.activity}</TableCell>
                <TableCell>{submission.username}</TableCell>
                <TableCell>
                  {submission.verified ? (
                    <Button disabled>Verified</Button>
                  ) : (
                   isOwner && <Button
                      onClick={() =>
                        handleClaim(submission._id, submission.user)
                      }
                    >
                      Verify
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
