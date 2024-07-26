"use client"
import { useEffect, useState } from "react"
import { BugDialog } from "./BugDialog"
import Image from "next/image"
import { FaCheck } from "react-icons/fa"
import { ScrollArea } from "../../../ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useAccount } from "wagmi"
import { BugBountyService } from "@/services/bugbounty"
import { BugBounty, BugBountySubmission } from "@/types/services/bugBounty"

export default function BugBountyCard({
  contestId,
  bugBountyId,
  ownerId,
}: {
  contestId: string
  bugBountyId: string
  ownerId: string
}) {
  const [verify, setVerify] = useState(false)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contestLoading, setContestLoading] = useState(false)
  const [bugBounty, setBugBounty] = useState<BugBounty | undefined>()
  const [readOnly, setReadOnly] = useState(false)
  const [info, setInfo] = useState({
    summary: "",
    steps: "",
    image: "",
  })

  const { address } = useAccount()

  const getBugBounty = async () => {
    const bugBountyService = new BugBountyService()
    const bounty = await bugBountyService.getBugBounty(bugBountyId)
    setBugBounty(bounty)
  }

  const selectBug = (submission: BugBountySubmission) => {
    // setInfo({
    //   summary: submission.summary,
    //   steps
    // })
  }

  const handleVerify = async (approved: boolean, submissionId: string) => {
    setIsLoading(true)
    const bountyService = new BugBountyService()
    await bountyService.verifySubmission({
      approved,
      contestId,
      submissionId,
    })
    getBugBounty()
    setIsLoading(false)
  }

  const reset = () => {}

  useEffect(() => {
    getBugBounty()
  }, [])

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="text-center font-bold">
        BUG BOUNTY
        <div className="font-light text-th-accent-2">
          {bugBounty?.description}
        </div>
        <div className="grid grid-cols-2">
          {bugBounty?.contractAddress && (
            <div className="col-span-2 overflow-hidden rounded-lg bg-th-black/20 p-4">
              {bugBounty?.contractAddress}
            </div>
          )}
          {bugBounty?.chain && (
            <div className="rounded-lg bg-th-black/20 p-4">{"chain"}</div>
          )}
          <a
            href={bugBounty?.profileURL}
            target="_blank"
            rel="noreferrer noopener"
            className="col-span-2 truncate rounded-lg bg-th-black/60 p-4 font-medium"
          >
            {bugBounty?.profileURL}
          </a>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ScrollArea>
          <div className="flex h-full flex-col gap-4 overflow-auto rounded-lg border border-th-accent-2 p-4">
            {bugBounty?.submissions ? (
              bugBounty?.submissions.map((submission) => (
                <button
                  onClick={() => selectBug(submission)}
                  key={submission._id}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg bg-th-black/60 p-2 hover:bg-th-black"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative aspect-square h-12 w-12">
                      <Image
                        src={submission.image}
                        alt="Logo"
                        className="h-full w-full"
                        fill
                      />
                    </div>
                    <div className="text-xs">{submission.summary}</div>
                  </div>
                  {!submission.verified && ownerId === address && (
                    <div className="flex gap-1 rounded-md bg-th-black-2 p-1">
                      <Button
                        disabled={isLoading}
                        isLoading={isLoading}
                        onClick={() => handleVerify(true, submission._id)}
                        className="w-10 bg-th-black px-2 !text-white hover:bg-th-black/40"
                      >
                        {!isLoading && (
                          <Check color="#22c55e" strokeWidth={3} />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleVerify(false, submission._id)}
                        className="w-10 bg-th-black px-2 hover:bg-th-black/40"
                      >
                        {!isLoading && <X color="#fa0505" strokeWidth={3} />}
                      </Button>
                    </div>
                  )}
                  {submission.verified && (
                    <div className="flex gap-1 rounded-md bg-th-black-2 p-1">
                      <Check color="#22c55e" strokeWidth={3} /> Verified
                    </div>
                  )}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            reset()
            setOpen(true)
          }}
        >
          Submit Bug Report
        </Button>
        <BugDialog
          info={info}
          readonly={readOnly}
          setReadonly={setReadOnly}
          contestId={contestId}
          bugBountyId={bugBountyId}
          open={open}
          setOpen={setOpen}
        />
      </CardFooter>
    </Card>
  )
}
