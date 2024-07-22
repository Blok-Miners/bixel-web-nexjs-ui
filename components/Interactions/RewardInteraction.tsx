"use client"

import React, { useState } from "react"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { FaChevronUp } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { ScrollArea } from "../ui/scroll-area"

const socialMediaTypes = [
  { name: "Facebook", link: "https://www.facebook.com" },
  { name: "Instagram", link: "https://www.instagram.com" },
  { name: "Twitter", link: "https://www.twitter.com" },
  { name: "LinkedIn", link: "https://www.linkedin.com" },
  { name: "Facebook", link: "https://www.facebook.com" },
  { name: "Instagram", link: "https://www.instagram.com" },
  { name: "Twitter", link: "https://www.twitter.com" },
  { name: "LinkedIn", link: "https://www.linkedin.com" },
]

export const RewardInteraction = () => {
  const Router = useRouter()
  const [expanded, setExpanded] = useState<number | null>(null) // Track which item is expanded

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? null : index) // Toggle the expanded state
  }

  return (
    <div>
      <div className="grid w-full max-w-xl grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4">
        <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
          Project Submission
        </span>

        <div className="col-span-2 space-y-2 rounded-2xl px-4 py-1 text-xl font-bold">
          <Label>Description</Label>
          <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, voluptas! Itaque ad laborum voluptates, voluptatibus
            quas quidem tempore!
          </div>
        </div>

        <ScrollArea className="h-[25rem] col-span-2 rounded-2xl border border-th-accent-2/10 p-4 text-xl font-bold">
          {socialMediaTypes.map((type, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-4 rounded-xl bg-th-accent-2/10 p-4 text-base font-medium my-4"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-start">{type.name}</div>
                <Button
                  variant={"ghost"}
                  className="bg-none p-2 px-3"
                  onClick={() => handleToggle(index)}
                >
                  {expanded === index ? (
                    <FaChevronUp className="h-4 w-4" />
                  ) : (
                    <FaChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {expanded === index && (
                <div className="mt-2 w-full space-y-2">
                  <Label>Username</Label>
                  <div className="flex w-full gap-6">
                    <Input
                      type="text"
                      className="w-full"
                      placeholder={`Enter your ${type.name} username`}
                    />
                    <Button onClick={() => Router.push(type.link)}>Open</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}
