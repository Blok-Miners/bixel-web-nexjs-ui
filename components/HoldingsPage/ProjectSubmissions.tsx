"use client"

import React, { useEffect, useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { ContestService } from "@/services/contest"

interface ProjectSubmissionsProps {
  id: string
}

interface Submission {
  _id: string
  projectName: string
  videoURL: string
  demoURL: string
  githubURL: string
  contractAddress: string
  chain: string
  description: string
  createdAt: string
  updatedAt: string
  user: string
  verified: boolean
}

export const ProjectSubmissions = ({ id }: ProjectSubmissionsProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  const getContestDetails = async () => {
    const ContestServices = new ContestService()
    try {
      const reward = await ContestServices.getTestContestDetails(id)
      console.log(reward)
    } catch (error) {
      console.log(error)
    }
  }

  const getProjectDetails = async () => {
    try {
      const projectService = new ContestService()
      const res = await projectService.getProjectDetails(id)
      setSubmissions(res.submissions || [])
      console.log(res)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    getContestDetails()
    getProjectDetails()
  }, [])

  const handleClaim = async (id: string, userId: string, approved: boolean) => {
    try {
      const response = await new ContestService().verifyUserProjectSubmission(
        id,
        userId,
        approved,
      )
      return response
    } catch (error) {
      throw error
    }
  }

  // const getContestDetails = async () => {
  //   if (!id) return
  //   const ContestServices = new ContestService()
  //   const reward = await ContestServices.getContestDetails(id)
  //   console.log(reward)
  // }

  return (
    <div className="rounded-2xl border border-th-accent-2 bg-th-accent-2/10 p-8">
      <div className="mb-6 w-full text-center text-xl font-medium">
        Project Submissions
      </div>

      <ScrollArea className="h-[75vh]">
        <div className="mb-4 rounded-2xl p-4">
          {submissions.length > 0 ? (
            submissions.map((submission, index) => (
              <div
                key={index}
                className="mb-6 grid grid-cols-3 gap-x-5 gap-y-2 rounded-md border border-th-accent-2/40 bg-th-accent-2/10 p-4 last:mb-0"
              >
                <div className="col-span-1 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">Project Name :</Label>
                  <div className="h-10 truncate rounded-md bg-th-accent-2/10 p-2">
                    {submission.projectName}
                  </div>
                </div>
                <div className="col-span-1 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">Video URL :</Label>
                  <div className="h-10 truncate rounded-md bg-th-accent-2/10 p-2">
                    {submission.videoURL}
                  </div>
                </div>
                <div className="col-span-1 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">Demo URL :</Label>
                  <div className="h-10 truncate rounded-md bg-th-accent-2/10 p-2">
                    {submission.demoURL}
                  </div>
                </div>
                <div className="col-span-1 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">Github URL :</Label>
                  <div className="h-10 truncate rounded-md bg-th-accent-2/10 p-2">
                    {submission.githubURL}
                  </div>
                </div>
                <div className="col-span-1 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">Contract Address :</Label>
                  <div className="h-10 truncate rounded-md bg-th-accent-2/10 p-2">
                    {submission.contractAddress}
                  </div>
                </div>
                <div className="col-span-1 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">Chain :</Label>
                  <div className="h-10 truncate rounded-md bg-th-accent-2/10 p-2">
                    {submission.chain}
                  </div>
                </div>
                <div className="col-span-3 items-center space-y-2 p-2">
                  <Label className="text-th-accent-2">
                    Project Description :
                  </Label>
                  <div className="h-28 rounded-md bg-th-accent-2/10 p-2">
                    {submission.description}
                  </div>
                </div>
                <Button
                  className="col-span-3 mx-auto w-fit items-center space-y-2 p-2 px-6"
                  onClick={() => handleClaim(id, submission._id, true)}
                >
                  {submission.verified ? "Verified" : "Verify"}
                </Button>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center">
              No submissions available.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
