"use client"
import { useEffect, useState } from "react"
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
import { Textarea } from "../ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  summary: z.string().min(10, {
    message: "Summary must be at least 10 characters.",
  }).max(300, {
    message: "Summary must be at most 300 characters.",
  }),
  steps: z.string().min(10, {
    message: "Steps must be at least 10 characters.",
  }).max(500, {
    message: "Summary must be at most 500 characters.",
  }),
})

export function BugDialog({ open, setOpen }: any) {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      steps: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setImage(file)
    console.log(file)

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

  // useEffect(() => {
  //   if (open === false) {
  //     setPreview(null)
  //   }
  // }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Submit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="mx-auto">Bug Report</DialogTitle>
        <ScrollArea className="max-h-[80vh] scrollbar-hide">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormItem>
                <FormLabel>Choose Image</FormLabel>
                <Input
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
                      <Textarea placeholder="" {...field} />
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
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <div className="flex justify-between">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <DialogFooter className="sm:justify-start mt-4">
            <DialogClose asChild>
              <Button className="w-full" variant={"secondary"}>
                Discard
              </Button>
            </DialogClose>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
