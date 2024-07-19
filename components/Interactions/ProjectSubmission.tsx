"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Form, FormField } from "../ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const ProjectSubmission = () => {
  const [githubUrl, setGithubUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted GitHub URL:", githubUrl)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-xl grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4"
    >
      <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
        Project Submission
      </span>
      <div className="col-span-2 h-fit space-y-2 rounded-xl p-2">
        <span className="text-sm">Description </span>

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
        <Label htmlFor="email">GitHub URL</Label>
        <Input
          type="url"
          placeholder="URL"
          className="bg-transparent"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
      </div>
      <Button type="submit" className="col-span-2 m-2">
        Submit
      </Button>
    </form>
  )
}
