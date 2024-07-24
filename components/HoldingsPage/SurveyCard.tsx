"use client"
import { Loader2 } from "lucide-react"

import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import { SurveyService } from "@/services/survey"

export default function SurveyCard({
  id,
  interactionId,
}: {
  id: string
  interactionId: string
}) {
  const service = new SurveyService()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  const getRegistrationVerification = async () => {
    try {
      const res = await service.getSurvey(interactionId)
      if (res) {
        setData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const verifyRegistration = async () => {
  //   try {
  //     const res: IResponse = await service.verifyRegistration(id)
  //     if (res) {
  //       if (res.success === true) {
  //         setVerified(true)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    getRegistrationVerification()
    // verifyRegistration()
  }, [])

  const registerSurveySubmission = async () => {
    setLoading(true)
    try {
      const res = await service.registerSurveySubmission(id)
      // verifyRegistration()
      setLoading(false)
      setVerified(true)
      console.log(res)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    registerSurveySubmission()
  }
  return (
    <>
      {data && (
        <Card className="flex h-full flex-col">
          <CardHeader className="text-center font-bold">
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
          <CardFooter>
            {verified ? (
              <div className="w-full rounded-xl bg-th-accent-2/10 p-4 text-center font-bold text-green-600">
                Verified
              </div>
            ) : (
              <Button onClick={handleVerify} className="w-full">
                {loading ? <Loader2 className="animate-spin" /> : "Verify"}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  )
}
