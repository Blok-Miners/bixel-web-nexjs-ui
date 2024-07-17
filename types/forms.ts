import { z } from "zod"

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "brandName must be at least 2 characters.",
  }),
  website: z.string().url({
    message: "Invalid URL format.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})
