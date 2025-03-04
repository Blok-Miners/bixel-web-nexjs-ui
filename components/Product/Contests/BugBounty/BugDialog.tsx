"use client"

import { Dispatch, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../../../ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BugBountyService } from "@/services/bugbounty"
import { reset } from "viem/actions"
import ConfirmationDialog from "@/components/Shared/ConfirmationDialog"
import { Loader2 } from "lucide-react"
import { truncate } from "fs"

const formSchema = z.object({
  image: z.any(),
  summary: z
    .string()
    .min(10, {
      message: "Summary must be at least 10 characters.",
    })
    .max(300, {
      message: "Summary must be at most 300 characters.",
    }),
  steps: z
    .string()
    .min(10, {
      message: "Steps must be at least 10 characters.",
    })
    .max(500, {
      message: "Steps must be at most 500 characters.",
    }),
})

interface IBugDialog {
  open: boolean
  setOpen: Dispatch<boolean>
  readonly: boolean
  setReadonly: Dispatch<boolean>
  summary?: string
  steps?: string
  contestId?: any
  bugBountyId?: string
  info: {
    summary: string
    steps: string
    image: string
  }
}

export function BugDialog({
  open,
  setOpen,
  readonly,
  summary,
  steps,
  contestId,
  bugBountyId,
}: IBugDialog) {
  const service = new BugBountyService()
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      steps: "",
    },
  })

  const [loading, setLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [title, setTitle] = useState("")

  const [message, setMessage] = useState("")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    console.log(values)
    console.log(image)
    console.log(contestId)
    console.log(bugBountyId)
    const formData = new FormData()
    formData.append("image", image as File)
    formData.append("summary", values.summary)
    formData.append("stepsToUpdate", values.steps)
    formData.append("bugBounty", bugBountyId as string)
    try {
      const res = await service.submitBugBounty(formData, contestId)
      console.log(res)
      setOpen(false)
      setOpenDialog(true)
      setTitle("Success")
      setMessage("Bug submitted successfully")
      setLoading(false)
      form.reset()
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file) {
      setImage(file)
      console.log(file)
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (image === null) {
      setPreview(null)
    }
  }, [image])

  useEffect(() => {
    if (open === false) {
      setImage(null)
      setPreview(null)
    }
  }, [open])

  return (
    <>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={title}
        message={message}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="mx-auto">Bug Report</DialogTitle>
          <ScrollArea className="scrollbar-hide max-h-[80vh]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormItem>
                  <FormLabel>Choose Image</FormLabel>
                  <Input
                    readOnly={readonly}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="placeholder:text-white"
                  />
                  {preview && (
                    <div className="mt-4 w-full overflow-hidden rounded-lg border border-th-accent-2">
                      <Image
                        src={preview}
                        alt="Image Preview"
                        width={100}
                        height={100}
                        className="w-full"
                      />
                    </div>
                  )}
                </FormItem>
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          readOnly={readonly}
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Steps to replicate :
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          readOnly={readonly}
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" color="white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
            <DialogFooter className="mt-4 sm:justify-start">
              <DialogClose asChild>
                <Button className="w-full" variant={"secondary"}>
                  Discard
                </Button>
              </DialogClose>
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
