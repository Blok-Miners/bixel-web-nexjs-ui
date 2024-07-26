"use client"
import { Loader2 } from "lucide-react"

import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import React, { useEffect, useState } from "react"
import { SurveyService } from "@/services/survey"
import { ContestService } from "@/services/contest"
import { useRouter } from "next/navigation"
interface IResponse {
  success: boolean
}

export default function SurveyCard({
  id,
  interactionId,
  mode,
}: {
  id: string
  interactionId: string
  mode: string
}) {
  const service = new SurveyService()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  const [email, setEmail] = useState<string>("")
  const getSurvey = async () => {
    try {
      const res = await service.getSurvey(interactionId)
      if (res) {
        setData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const router = useRouter()
  const [isOwner, setIsOwner] = useState(false)
  const checkOwnership = async () => {
    try {
      const contestService = new ContestService()
      const isOwnerResponse = await contestService.isProductOwner(id)
      setIsOwner(isOwnerResponse.isOwner)
    } catch (error) {
      console.log(error)
    }
  }

  const verifyRegistration = async () => {
    try {
      const res: IResponse = await service.verifyRegistration(id)
      if (res) {
        if (res.success === true) {
          setVerified(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    getSurvey()
    verifyRegistration()
    checkOwnership()
  }, [])

  const registerSurveySubmission = async () => {
    if (!email) return
    setLoading(true)
    try {
      const res = await service.registerSurveySubmission(email, id)
      verifyRegistration()
      setLoading(false)
      console.log(res)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerSurveySubmission()
  }
  return (
    <>
      {data && (
        <Card className="flex h-full flex-col">
          <CardHeader className="text-center text-xl font-bold">
            Survey
            {/* <div className=" font-light text-th-accent-2"></div> */}
          </CardHeader>
          <CardContent className="mt-4 flex h-full flex-col gap-2">
            <a
              href={`${data.formURL}`}
              target="_blank"
              rel="noreferrer noopener"
              className="col-span-2 w-full truncate rounded-lg bg-th-black/60 p-4 text-center font-medium"
            >
              {`${data.formURL}`}
            </a>
            <span className="text-center text-sm font-light">
              Follow the link and fill the form
            </span>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {verified ? (
              <div className="w-full rounded-xl bg-th-accent-2/10 p-4 text-center font-bold text-green-600">
                Verified
              </div>
            ) : (
              <form
                onSubmit={handleVerify}
                className="flex w-full flex-col gap-4"
              >
                <div>Enter your email to verify</div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full"
                  required
                />
                <Button type="submit" className="w-full">
                  {loading ? <Loader2 className="animate-spin" /> : "Verify"}
                </Button>
              </form>
            )}
            {mode === "LEADERBOARD" && isOwner && (
              <Button
                className="w-full"
                onClick={() => router.push(`/leaderboard/${id}`)}
              >
                Leaderboard
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  )
}
