"use client"

import React from "react"
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const projectSubmissionSchema = z.object({
  projectName: z.string().nonempty("Project Name is required"),
  rulesForSubmission: z.string().nonempty("Project Description is required"),
  videoUrl: z.string().url("Invalid URL").nonempty("Video URL is required"),
  demoUrl: z.string().url("Invalid URL").nonempty("Demo URL is required"),
  githubUrl: z.string().url("Invalid URL").nonempty("GitHub URL is required"),
  contractAddress: z.string().nonempty("Contract Address is required"),
  chainType: z.string().nonempty("Chain Type is required"),
  teamMembers: z.array(
    z.object({
      name: z.string().nonempty("Name is required"),
      discordUsername: z.string().nonempty("Discord Username is required"),
    }),
  ),
})

interface ProjectData {
  projectName: string
  rulesForSubmission: string
  videoUrl: string
  demoUrl: string
  githubUrl: string
  contractAddress: string
  chainType: string
  teamMembers: { name: string; discordUsername: string }[]
}

const ProjectSubmission: React.FC = () => {
  const methods = useForm<ProjectData>({
    resolver: zodResolver(projectSubmissionSchema),
    defaultValues: {
      projectName: "",
      rulesForSubmission: "",
      videoUrl: "",
      demoUrl: "",
      githubUrl: "",
      contractAddress: "",
      chainType: "",
      teamMembers: [{ name: "", discordUsername: "" }],
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  })

  const onSubmit = (data: ProjectData) => {
    console.log("Submitted data:", data)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full max-w-xl grid-cols-2 gap-4 rounded-2xl bg-th-accent-2/10 p-4"
      >
        <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
          Project Submission
        </span>
        <div className="col-span-2 h-fit space-y-2 rounded-xl p-2">
          <span className="text-sm">Description</span>
          <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, voluptas! Itaque ad laborum voluptates, voluptatibus
            quas quidem tempore!
          </div>
        </div>

        <div className="col-span-1 space-y-2 rounded-xl p-2">
          <span className="text-sm">Start Date</span>
          <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
            1/1/2024
          </div>
        </div>

        <div className="col-span-1 space-y-2 rounded-xl p-2">
          <span className="text-sm">End Date</span>
          <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
            1/1/2025
          </div>
        </div>

        <div className="col-span-2 space-y-2 rounded-xl p-2">
          <span className="text-sm">Project URL</span>
          <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
            https://www.projecturl.com
          </div>
        </div>

        <FormField
          control={control}
          name="projectName"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-2 rounded-xl p-2">
              <FormLabel>
                Project Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project Name"
                  className="rounded-lg bg-transparent"
                />
              </FormControl>
              <FormMessage>{errors.projectName?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-2 rounded-xl p-2">
              <FormLabel>
                Video URL <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="URL"
                  className="rounded-lg bg-transparent"
                />
              </FormControl>
              <FormMessage>{errors.videoUrl?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="demoUrl"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-2 rounded-xl p-2">
              <FormLabel>
                Demo URL <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="URL"
                  className="rounded-lg bg-transparent"
                />
              </FormControl>
              <FormMessage>{errors.demoUrl?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-2 rounded-xl p-2">
              <FormLabel>
                GitHub URL <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="URL"
                  className="rounded-lg bg-transparent"
                />
              </FormControl>
              <FormMessage>{errors.githubUrl?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contractAddress"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-2 rounded-xl p-2">
              <FormLabel>
                Contract Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Contract Address"
                  className="rounded-lg bg-transparent"
                />
              </FormControl>
              <FormMessage>{errors.contractAddress?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="chainType"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-2 rounded-xl p-2">
              <FormLabel>
                Select Chain <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full rounded-xl border-none bg-th-accent-2/10 text-base font-medium focus:ring-0">
                    <SelectValue
                      placeholder="Select"
                      className="outline-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-xl font-medium text-white">
                    <SelectItem value="Chain 1" className="text-white">
                      Chain 1
                    </SelectItem>
                    <SelectItem value="Chain 2" className="text-white">
                      Chain 2
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.chainType?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rulesForSubmission"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-2 rounded-xl p-2">
              <FormLabel>
                Project Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Project Description"
                  className="rounded-lg bg-transparent"
                />
              </FormControl>
              <FormMessage>{errors.rulesForSubmission?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="col-span-2 space-y-2 rounded-xl p-2">
          <div className="flex items-center gap-4">
            <FormLabel>
              Team Members <span className="text-red-500">*</span>
            </FormLabel>
            <Button
              type="button"
              className="text-xs"
              onClick={() => append({ name: "", discordUsername: "" })}
            >
              Add Member
            </Button>
          </div>
          <div>
            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-6 gap-4 py-2">
                <FormField
                  control={control}
                  name={`teamMembers.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="col-span-3 space-y-2 rounded-xl">
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name"
                          className="rounded-lg bg-transparent"
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.teamMembers?.[index]?.name?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`teamMembers.${index}.discordUsername`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 space-y-2 rounded-xl">
                      <FormLabel>
                        Discord Username <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Discord Username"
                          className="rounded-lg bg-transparent"
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.teamMembers?.[index]?.discordUsername?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex items-end">
                  <Button
                    type="button"
                    className="bg-red-700 text-xs hover:bg-red-600"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="col-span-2 m-2">
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}

export default ProjectSubmission
