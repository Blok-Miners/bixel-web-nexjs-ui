"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export const ProjectSubmission = () => {
  const [githubUrl, setGithubUrl] = useState("")
  const [projectName, setProjectName] = useState("")
  const [rulesForSubmission, setRulesForSubmission] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [demoUrl, setDemoUrl] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [chainType, setChainType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted Project Name:", projectName)
    console.log("Submitted Rules For Submission:", rulesForSubmission)
    console.log("Submitted Video URL:", videoUrl)
    console.log("Submitted Demo URL:", demoUrl)
    console.log("Submitted GitHub URL:", githubUrl)
    console.log("Submitted Contract Address:", contractAddress)
    console.log("Selected Chain Type:", chainType)
  }

  const isContractAddressEntered = contractAddress.trim().length > 0

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-xl grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4"
    >
      <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
        Project Submission
      </span>
      <div className="col-span-2 h-fit space-y-2 rounded-xl p-2">
        <span className="text-sm">Description</span>
        <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          voluptas! Itaque ad laborum voluptates, voluptatibus quas quidem
          tempore!
        </div>
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <span className="text-sm">Start Date</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          1/1/2024
        </div>
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <span className="text-sm">End Date</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          1/1/2025
        </div>
      </div>

      <div className="col-span-2 space-y-2 rounded-xl p-2">
        <span className="text-sm">Project URL</span>
        <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
          https://www.projecturl.com
        </div>
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>Project Name</Label> <span className="text-red-500">*</span>
        <Input
          type="text"
          placeholder="Project Name"
          className="rounded-lg bg-transparent"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>Project Description</Label> <span className="text-red-500">*</span>
        <Input
          type="textarea"
          placeholder="Rules For Submission"
          className="rounded-lg bg-transparent"
          value={rulesForSubmission}
          onChange={(e) => setRulesForSubmission(e.target.value)}
          required
        />
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>Video URL</Label> <span className="text-red-500">*</span>
        <Input
          type="url"
          placeholder="URL"
          className="rounded-lg bg-transparent"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>Demo URL</Label> <span className="text-red-500">*</span>
        <Input
          type="url"
          placeholder="URL"
          className="rounded-lg bg-transparent"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          required
        />
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>GitHub URL</Label> <span className="text-red-500">*</span>
        <Input
          type="url"
          placeholder="URL"
          className="rounded-lg bg-transparent"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          required
        />
      </div>
      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>Contract Address</Label>
        <Input
          type="text"
          placeholder="Contract Address"
          className="rounded-lg bg-transparent"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          required
        />
      </div>

      <div className="col-span-1 space-y-2 rounded-xl p-2">
        <Label>Select Chain</Label>

        <Select
          onValueChange={(value) => setChainType(value)}
          disabled={!isContractAddressEntered}
        >
          <SelectTrigger className="w-full rounded-xl border-none bg-th-accent-2/10 text-base font-medium focus:ring-0">
            <SelectValue placeholder="Select" className="outline-none" />
          </SelectTrigger>
          <SelectContent className="text-xl font-medium text-white">
            <SelectItem value="Chain 1" className="text-white">
              Chain 1
            </SelectItem>
            <SelectItem value="Chain 2" className="text-white">
              Chain 2
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="col-span-2 m-2">
        Submit
      </Button>
    </form>
  )
}
