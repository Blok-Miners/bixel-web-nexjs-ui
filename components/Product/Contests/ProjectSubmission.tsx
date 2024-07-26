"use client"

import React, { useEffect, useState } from "react"
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../../ui/textarea"
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { MdOutlineDelete } from "react-icons/md"
import { ChainService } from "@/services/chain"
import { UserProjectSubmissionService } from "@/services/userProjectSubmission"
import ConfirmationDialog from "@/components/Shared/ConfirmationDialog"
import { Loader2 } from "lucide-react"
import { ContestService } from "@/services/contest"
import { useRouter, usePathname } from "next/navigation"
export interface IProjectData {
  projectName: string
  videoURL: string
  demoURL: string
  githubURL: string
  description: string
  contractAddress?: string
  chain?: string
  members: { name: string; githubUsername: string }[]
  project: string
}

const projectSubmissionSchema = z.object({
  projectName: z.string().nonempty("Project Name is required"),
  rulesForSubmission: z.string().nonempty("Project Description is required"),
  videoUrl: z.string().url("Invalid URL").nonempty("Video URL is required"),
  demoUrl: z.string().url("Invalid URL").nonempty("Demo URL is required"),
  githubUrl: z.string().url("Invalid URL").nonempty("GitHub URL is required"),
  contractAddress: z.string().optional(),
  chainType: z.string().optional(),
  teamMembers: z.array(
    z.object({
      name: z.string().nonempty("Name is required"),
      githubUsername: z.string().nonempty("Discord Username is required"),
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
  teamMembers: { name: string; githubUsername: string }[]
}

interface IData {
  description?: string
  url?: string
}

const ProjectSubmission = ({
  id,
  projectId,
}: {
  id: string
  projectId: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const chains = new ChainService()
  const [chain, setChain] = useState([])
  const getAllChain = async () => {
    const allChain = await chains.getChains()
    if (allChain) {
      setChain(allChain)
    }
  }
  const [data, setData] = useState<IData | undefined>()
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
  const getProjectDetails = async () => {
    const service = new UserProjectSubmissionService()
    try {
      const response = await service.getProjectDetails(projectId)
      console.log(response)
      setData(response)
    } catch (error) {
      console.log(error)
    }
  }

  // const getContestDetails = async () => {
  //   const ContestServices = new ContestService()
  //   try {
  //     const reward = await ContestServices.getTestContestDetails(id)
  //     const res = await ContestServices.getProjectDetails(
  //       reward.contestDetails.interaction,
  //     )

  //     setSubmissions(res.submissions || [])
  //     checkOwnership()
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   getContestDetails()
  //   checkOwnership()
  // }, [])

  useEffect(() => {
    getProjectDetails()
    checkOwnership()
  }, [id])

  useEffect(() => {
    getAllChain()
  }, [])
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
      teamMembers: [{ name: "", githubUsername: "" }],
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

  const [loading, setLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [title, setTitle] = useState("")

  const [message, setMessage] = useState("")

  const onSubmit = async (data: ProjectData) => {
    setLoading(true)
    const service = new UserProjectSubmissionService()
    console.log("Submitted data:", data)
    try {
      const projectData: IProjectData = {
        projectName: data.projectName,
        videoURL: data.videoUrl,
        demoURL: data.demoUrl,
        githubURL: data.githubUrl,
        description: data.rulesForSubmission,
        members: data.teamMembers,
        project: projectId,
      }

      if (data.contractAddress) {
        projectData.contractAddress = data.contractAddress
      }

      if (data.chainType) {
        projectData.chain = data.chainType
      }

      const res = await service.submitUserProject(projectData, id)
      console.log(res)
      setOpenDialog(true)
      setTitle("Success")
      setMessage("Project submitted successfully")
      setLoading(false)
      methods.reset()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={title}
        message={message}
      />
      {data && (
        <div className="flex w-full flex-col gap-4 rounded-2xl bg-th-accent-2/10 p-4">
          <span className="col-span-2 rounded-2xl px-4 py-1 text-center text-xl font-bold">
            Project Submission
          </span>
          <div className="col-span-2 h-fit space-y-2 rounded-xl p-2">
            <span className="text-sm">Description</span>
            <div className="h-fit rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
              {data?.description}
            </div>
          </div>

          {/* <div className="col-span-1 space-y-2 rounded-xl p-2">
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
        </div> */}

          <div className="col-span-2 space-y-2 rounded-xl p-2">
            <span className="text-sm">Project URL</span>
            <div className="rounded-xl bg-th-accent-2/10 p-4 text-base font-medium">
              {data?.url}
            </div>
          </div>
          {!isOwner && (
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 row-span-2 grid w-full grid-cols-2 gap-4"
              >
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
                      <FormMessage>
                        {errors.contractAddress?.message}
                      </FormMessage>
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full rounded-xl border-none bg-th-accent-2/10 text-base font-medium focus:ring-0">
                            <SelectValue
                              placeholder="Select"
                              className="outline-none"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {chain &&
                                chain.map((item: any, index: any) => {
                                  return (
                                    <SelectItem
                                      key={index}
                                      value={item.id}
                                      className="text-white"
                                    >
                                      {item.name}
                                    </SelectItem>
                                  )
                                })}
                            </SelectGroup>
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
                        Project Description{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Project Description"
                          className="rounded-lg bg-transparent"
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.rulesForSubmission?.message}
                      </FormMessage>
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
                      onClick={() => append({ name: "", githubUsername: "" })}
                    >
                      Add Member
                    </Button>
                  </div>
                  <div>
                    {fields.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-6 gap-4 py-2"
                      >
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
                          name={`teamMembers.${index}.githubUsername`}
                          render={({ field }) => (
                            <FormItem className="col-span-2 space-y-2 rounded-xl">
                              <FormLabel>
                                Discord Username{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Discord Username"
                                  className="rounded-lg bg-transparent"
                                />
                              </FormControl>
                              <FormMessage>
                                {
                                  errors.teamMembers?.[index]?.githubUsername
                                    ?.message
                                }
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <div className="flex items-end">
                          <Button
                            type="button"
                            className="bg-red-700 text-xl text-white hover:bg-red-600"
                            onClick={() => remove(index)}
                          >
                            <MdOutlineDelete />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="col-span-2 m-2">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" color="white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </FormProvider>
          )}
          {isOwner && (
            <div className="col-span-2 flex flex-col flex-grow justify-end">
              <Button
                className=""
                onClick={() => {
                  router.push(`${pathname}/project/${id}`)
                }}
              >
                View Submission
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ProjectSubmission
