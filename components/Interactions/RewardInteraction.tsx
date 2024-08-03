"use client"

import React, { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"
import { ScrollArea } from "../ui/scroll-area"
import { ContestService } from "@/services/contest"
import { Loader2 } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

import {
  IFetchSocialMedia,
  ISocialMediaInteraction,
  ISocialSubmissions,
  SocialMediaEnum,
} from "@/types/services/contest"
import { getAccessToken } from "@/lib/utils"
import SocialMediaDisplay from "./SocialMediaDisplay"

export const RewardInteraction = ({
  id,
  mode,
}: {
  id: string
  mode: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const contestService = new ContestService()
  const [expanded, setExpanded] = useState<number | null>(null)
  const [interactionDetails, setInteractionDetails] =
    useState<ISocialMediaInteraction>()
  const [socialMedias, setSocialMedias] = useState<IFetchSocialMedia[]>()
  const [username, setUsername] = useState<string>("")
  const [opened, setOpened] = useState<{ [key: number]: boolean }>({})
  const [allSubmissions, setAllSubmissions] = useState<ISocialSubmissions[]>()
  const [loading, setLoading] = useState(false)
  const [showVerify, setShowVerify] = useState(true)
  const [isOwner, setIsOwner] = useState(false)

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  const checkOwnership = async () => {
    try {
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
    socialMedia: IFetchSocialMedia,
    index: number,
  ) => {
    if (!opened[index]) {
      window.open(socialMedia.url)
      setOpened((prev) => ({ ...prev, [index]: true }))
    }
    if (socialMedia.activity === "VISIT") {
      await verify(socialMedia)
    } else {
      handleToggle(index)
    }
    setShowVerify(true)
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
      const res = await contestService.allSocialMediaTaskCompleted(id)
      // console.log(res)
      setAllSubmissions(res)
    } catch (error) {
      console.log(error)
    }
  }

  const verify = async (socialMedia: IFetchSocialMedia) => {
    try {
      setLoading(true)
      const res = await contestService.verifySocialMediaTask(
        socialMedia._id,
        username,
        id,
      )
      setLoading(false)
      setShowVerify(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getSocialMediaInteractionDetails()
    allSocialMediaCompletedTasks()
  }, [showVerify])

  useEffect(() => {
    allSocialMediaCompletedTasks()
  }, [])
  // console.log(showVerify)

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
                    {(socialMedia.type === SocialMediaEnum.DISCORD ||
                      socialMedia.type === SocialMediaEnum.TELEGRAM) &&
                    socialMedia.activity === "JOIN" ? (
                      <SocialMediaDisplay
                        socialMedia={socialMedia}
                        contestId={id}
                        allSubmissions={allSubmissions!}
                      />
                    ) : allSubmissions?.some(
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
                        className={`bg-none p-2 px-3 ${
                          opened[index]
                            ? socialMedia.activity === "VISIT"
                              ? `text-green-500`
                              : ``
                            : ``
                        }`}
                        onClick={() => handleSubmit(socialMedia, index)}
                      >
                        {opened[index] ? (
                          socialMedia.activity !== "VISIT" ? (
                            expanded === index ? (
                              <FaChevronUp
                                className="h-4 w-4"
                                onClick={() => setShowVerify(false)}
                              />
                            ) : (
                              <FaChevronDown
                                className="h-4 w-4"
                                onClick={() => setShowVerify(true)}
                              />
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
                          <Button onClick={() => verify(socialMedia)}>
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
        {mode === "LEADERBOARD" && isOwner && (
          <Button
            className="col-span-2"
            onClick={() => router.push(`/leaderboard/${id}`)}
          >
            Leaderboard
          </Button>
        )}
      </div>
    </div>
  )
}
