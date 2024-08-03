"use client"
import {
  IFetchSocialMedia,
  ISocialSubmissions,
  SocialMediaEnum,
} from "@/types/services/contest"
import { Button } from "../ui/button"
import { useState } from "react"
import { ContestService } from "@/services/contest"
import { LoginButton } from "@telegram-auth/react"
import Loader from "../Shared/Loader"
import { useRouter } from "next/navigation"

export default function SocialMediaDisplay({
  socialMedia,
  contestId,
  allSubmissions,
}: {
  socialMedia: IFetchSocialMedia
  contestId: string
  allSubmissions: ISocialSubmissions[]
}) {
  const router = useRouter()
  const contestService = new ContestService()
  const [loading, setLoading] = useState(false)
  const handleOpen = () => {
    window.open(socialMedia.url)
  }

  const handleVerify = async () => {
    if (socialMedia.type === SocialMediaEnum.TELEGRAM) {
      setLoading(true)
      //@ts-ignore
      window.Telegram.Login.auth(
        {
          bot_id: process.env.NEXT_PUBLIC_BOT_TOKEN,
        },
        async (data: any) => {
          if (data) {
            const res = await contestService.verifySocialMediaTask(
              socialMedia._id,
              "something",
              contestId,
              data.id,
            )
          }
        },
      )
      setLoading(false)
    } else if (socialMedia.type === SocialMediaEnum.DISCORD) {
      const res = await contestService.verifySocialMediaTask(
        socialMedia._id,
        "something",
        contestId,
      )
      router.push(
        `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}&state=${JSON.stringify(res.submission)}&scope=guilds`,
      )
    }
  }

  return (
    <>
      <div className="hidden">
        <LoginButton
          botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
          // authCallbackUrl={authUrl}
          buttonSize="small"
          //   cornerRadius={5}
          showAvatar={false}
          lang="en"
        />
      </div>

      {allSubmissions?.filter(
        (item) => item.socialMedia === socialMedia._id,
      )?.[0]?.verified ? (
        <div className="text-green-500">Verified</div>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={handleVerify}>Verify</Button>
          )}

          <Button onClick={handleOpen}>Open</Button>
        </>
      )}
    </>
  )
}
