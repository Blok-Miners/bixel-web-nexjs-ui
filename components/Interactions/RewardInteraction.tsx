"use client"

import React, { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import Link from "next/link"
import { Input } from "../ui/input"
import { FaChevronUp } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { ScrollArea } from "../ui/scroll-area"
import { ContestService } from "@/services/contest"
import { Loader2 } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

import {
  IFetchSocialMedia,
  ISocialMedia,
  ISocialMediaInteraction,
  ISocialSubmissions,
} from "@/types/services/contest"
import { userAgent } from "next/server"

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

export const RewardInteraction = ({ id }: { id: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const contestService = new ContestService()
  const Router = useRouter()
  const [expanded, setExpanded] = useState<number | null>(null) // Track which item is expanded
  const [interactionDetails, setInteractionDetails] =
    useState<ISocialMediaInteraction>()
  const [socialMedias, setSocialMedias] = useState<IFetchSocialMedia[]>()
  const [username, setUsername] = useState<string>("")
  const [opened, setOpened] = useState(false)
  const [allSubmissions, setAllSubmissions] = useState<ISocialSubmissions[]>()
  const [loading, setLoading] = useState(false)
  const [showVerify, setShowVerify] = useState(true)
  const [isOwner, setIsOwner] = useState(false)

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? null : index) // Toggle the expanded state
  }

  const checkOwnership = async () => {
    try {
      const contestService = new ContestService()
      const isOwnerResponse = await contestService.isProductOwner(id)
      setIsOwner(isOwnerResponse.isOwner)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkOwnership()
  }, [id])

  const handleSubmit = async (
    activity: string,
    index: number,
    interactionId: string,
    url: string,
  ) => {
    if (!opened) {
      window.open(url)
      setOpened(true)
    }
    if (activity !== "VISIT") return handleToggle(index)
    await verify(interactionId)
  }

  const getSocialMediaInteractionDetails = async () => {
    try {
      const res = await contestService.getSocialMediaInteractionDetails(id)
      setInteractionDetails(res.socialMediaInteractionDetails)
      setSocialMedias(res.socialMediaDetails)
    } catch (error) {
      console.log(error)
    }
  }

  const allSocialMediaCompletedTasks = async () => {
    try {
      const res = await contestService.isSocialMediaTaskVerified(id)
      setAllSubmissions(res)
    } catch (error) {
      console.log(error)
    }
  }

  const verify = async (interactionId: string) => {
    try {
      setLoading(true)
      const res = await contestService.verifySocialMediaTask(
        interactionId,
        username,
        id,
      )
      setInteractionDetails(res.socialMediaInteractionDetails)
      setLoading(false)
      setShowVerify(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSocialMediaInteractionDetails()
    allSocialMediaCompletedTasks()
  }, [showVerify])

  useEffect(() => {
    allSocialMediaCompletedTasks()
  }, [])

  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4">
        <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
          Social Media
        </span>

        <div className="col-span-2 space-y-2 rounded-2xl px-4 py-1 text-xl font-bold">
          <Label>Description</Label>
          <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
            {interactionDetails?.description}
          </div>
        </div>

        <ScrollArea className="col-span-2 h-[25rem] rounded-2xl border border-th-accent-2/10 p-4 text-xl font-bold">
          {socialMedias &&
            socialMedias.map(
              (socialMedia: IFetchSocialMedia, index: number) => (
                <div
                  key={index}
                  className="my-4 flex flex-col items-center justify-between gap-4 rounded-xl bg-th-accent-2/10 p-4 text-base font-medium"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="text-start capitalize">
                      {socialMedia.type.toLowerCase()}
                    </div>
                    {allSubmissions?.some(
                      (item) => item.socialMedia === socialMedia._id,
                    ) ? (
                      allSubmissions?.filter(
                        (item) => item.socialMedia === socialMedia._id,
                      )?.[0]?.verified ? (
                        <div className="text-green-500">Verified</div>
                      ) : (
                        <div className="text-red-500">Pending</div>
                      )
                    ) : (
                      <Button
                        variant={"ghost"}
                        className="bg-none p-2 px-3"
                        onClick={() =>
                          handleSubmit(
                            socialMedia.activity,
                            index,
                            socialMedia._id,
                            socialMedia.url,
                          )
                        }
                      >
                        {opened ? (
                          socialMedia.activity !== "VISIT" ? (
                            expanded === index ? (
                              <FaChevronUp className="h-4 w-4" />
                            ) : (
                              <FaChevronDown className="h-4 w-4" />
                            )
                          ) : (
                            "Verified"
                          )
                        ) : (
                          "Open"
                        )}
                      </Button>
                    )}
                  </div>
                  {socialMedia.activity !== "VISIT" &&
                    expanded === index &&
                    showVerify && (
                      <div className="mt-2 w-full space-y-2">
                        <Label>Username</Label>
                        <div className="flex w-full gap-6">
                          <Input
                            type="text"
                            className="w-full"
                            placeholder={`Enter your ${socialMedia.type.toLowerCase()} username`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <Button onClick={() => verify(socialMedia._id)}>
                            {loading ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                </div>
              ),
            )}
        </ScrollArea>
        {isOwner && (
          <Button
            className="col-span-2"
            onClick={() => router.push(`${pathname}/socialMedia/${id}`)}
          >
            View Submission
          </Button>
        )}
      </div>
    </div>
  )
}
