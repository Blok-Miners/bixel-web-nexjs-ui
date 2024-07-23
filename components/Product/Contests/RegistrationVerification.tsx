"use client"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RegistrationService } from "@/services/registration"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import axios from "axios"
import { Loader2 } from "lucide-react"
interface IResponse {
  success: boolean
}

export default function RegistrationVerification({
  id,
  interactionId,
}: {
  id: string
  interactionId: string
}) {
  const service = new RegistrationService()
  const [data, setData] = useState<any>()
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const getRegistrationVerification = async () => {
    try {
      const res = await service.getRegistrationVerification(interactionId)
      if (res) {
        setData(res)
      }
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

  useEffect(() => {
    getRegistrationVerification()
    verifyRegistration()
  }, [])

  const registerVerification = async () => {
    setLoading(true)
    try {
      const res = await service.registerSubmission(id)
      verifyRegistration()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    registerVerification()
  }
  return (
    <>
      {data && (
        <Card className="flex h-full flex-col">
          <CardHeader className="text-center font-bold">
            Registration Verification
            <div className="font-light text-th-accent-2">
              {/* ! Description Here from api */}
              {data.description}
            </div>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-2">
            <a
              href={`${data.url}`}
              target="_blank"
              rel="noreferrer noopener"
              className="col-span-2 w-full truncate rounded-lg bg-th-black/60 p-4 text-center font-medium"
            >
              {`${data.url}`}
            </a>
            <span className="text-center text-sm font-light">
              Follow the link and register on to the platform
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
