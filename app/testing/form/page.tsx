"use client"

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/ui/datepicker"
import IndustrySelector from "@/components/Dashboard/Industries"
import { useState } from "react"

interface ProfileFormData {
  profilePicture?: FileList
  bannerPicture?: FileList
  name: string
  description?: string
  legalName?: string
  foundedDate: Date | null
  closedDate: Date | null
  numberOfEmployees?: number
  companyType?: string
  websiteUrl?: string
  facebookUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  contactEmail?: string
  phoneNumber?: string
  fullDescription?: string
  founderImage?: FileList
  founderName: string
  founderEmail: string
  chartURL?: string
  boardMembers?: {
    boardMemberImage?: FileList
    boardMemberName: string
    boardMemberEmail: string
  }[]
}

const profileSchema = z.object({
  profilePicture: z.any().optional(),
  bannerPicture: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  legalName: z.string().optional(),
  foundedDate: z.date().nullable(),
  closedDate: z.date().optional().nullable(),
  numberOfEmployees: z.number().optional(),
  companyType: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").optional(),
  facebookUrl: z.string().url("Invalid URL").optional(),
  linkedinUrl: z.string().url("Invalid URL").optional(),
  twitterUrl: z.string().url("Invalid URL").optional(),
  contactEmail: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  fullDescription: z.string().optional(),
  founderImage: z.any().optional(),
  founderName: z.string().min(1, "Founder name is required"),
  founderEmail: z.string().email("Invalid email"),
  chartURL: z.string().url("Invalid URL").optional(),
  boardMembers: z
    .array(
      z.object({
        boardMemberImage: z.any().optional(),
        boardMemberName: z.string().min(1, "Board member name is required"),
        boardMemberEmail: z.string().email("Invalid email"),
      }),
    )
    .optional(),
})

export default function ProfileCreation(){
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const [boardMembers, setBoardMembers] = useState<
    {
      boardMemberImage?: FileList
      boardMemberName: string
      boardMemberEmail: string
    }[]
  >([])

  const addBoardMember = () => {
    setBoardMembers([
      ...boardMembers,
      {
        boardMemberImage: undefined,
        boardMemberName: "",
        boardMemberEmail: "",
      },
    ])
  }

  const removeBoardMember = (index: number) => {
    const updatedBoardMembers = [...boardMembers];
    updatedBoardMembers.splice(index, 1);
    setBoardMembers(updatedBoardMembers);
  };

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded bg-th-black-2 px-[10rem] pt-[3rem] shadow-md text-white"
    >
      <h1 className="text-3xl font-bold underline">Edit New Company</h1>

      <div className="grid w-full max-w-sm items-center gap-1.5 pt-[3rem]">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          id="profilePicture"
          type="file"
          {...register("profilePicture")}
        />
        {errors.profilePicture && (
          <p className="text-red-500">
            {errors.profilePicture.message as string}
          </p>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="bannerPicture">Banner Picture</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          id="bannerPicture"
          type="file"
          {...register("bannerPicture")}
        />
        {errors.bannerPicture && (
          <p className="text-red-500">
            {errors.bannerPicture.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="text"
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          id="description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="legalName">Legal Name</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="text"
          id="legalName"
          {...register("legalName")}
        />
        {errors.legalName && (
          <p className="text-red-500">{errors.legalName.message as string}</p>
        )}
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex items-center gap-4">
          <Label htmlFor="foundedDate">Founded Date</Label>
          <Controller
            name="foundedDate"
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
          {errors.foundedDate && (
            <p className="text-red-500">
              {errors.foundedDate.message as string}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="closedDate">Closed Date</Label>
          <Controller
            name="closedDate"
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
          {errors.closedDate && (
            <p className="text-red-500">
              {errors.closedDate.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="numberOfEmployees">Number of Employees</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="number"
          id="numberOfEmployees"
          {...register("numberOfEmployees")}
        />
        {errors.numberOfEmployees && (
          <p className="text-red-500">
            {errors.numberOfEmployees.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="companyType">Company Type</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="text"
          id="companyType"
          {...register("companyType")}
        />
        {errors.companyType && (
          <p className="text-red-500">{errors.companyType.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="url"
          id="websiteUrl"
          {...register("websiteUrl")}
        />
        {errors.websiteUrl && (
          <p className="text-red-500">{errors.websiteUrl.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="facebookUrl">Facebook URL</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="url"
          id="facebookUrl"
          {...register("facebookUrl")}
        />
        {errors.facebookUrl && (
          <p className="text-red-500">{errors.facebookUrl.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="url"
          id="linkedinUrl"
          {...register("linkedinUrl")}
        />
        {errors.linkedinUrl && (
          <p className="text-red-500">{errors.linkedinUrl.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="twitterUrl">Twitter URL</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="url"
          id="twitterUrl"
          {...register("twitterUrl")}
        />
        {errors.twitterUrl && (
          <p className="text-red-500">{errors.twitterUrl.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="email"
          id="contactEmail"
          {...register("contactEmail")}
        />
        {errors.contactEmail && (
          <p className="text-red-500">
            {errors.contactEmail.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="fullDescription">Full Description</Label>
        <Textarea
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          id="fullDescription"
          {...register("fullDescription")}
        />
        {errors.fullDescription && (
          <p className="text-red-500">
            {errors.fullDescription.message as string}
          </p>
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="fullDescription">Industries</Label>
        <IndustrySelector />
      </div>
      <div>
        <Label htmlFor="founderImage">Founder Image</Label>
        <Input
          className="w-fit rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="file"
          id="founderImage"
          {...register("founderImage")}
        />
        {errors.founderImage && (
          <p className="text-red-500">
            {errors.founderImage.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="founderName">Founder Name</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="text"
          id="founderName"
          {...register("founderName")}
        />
        {errors.founderName && (
          <p className="text-red-500">{errors.founderName.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="founderEmail">Founder Email</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="email"
          id="founderEmail"
          {...register("founderEmail")}
        />
        {errors.founderEmail && (
          <p className="text-red-500">
            {errors.founderEmail.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="chartURL">Chart URL</Label>
        <Input
          className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
          type="url"
          id="chartURL"
          {...register("chartURL")}
        />
        {errors.chartURL && (
          <p className="text-red-500">{errors.chartURL.message as string}</p>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold underline">Board Members</h2>
        {boardMembers.map((member, index) => (
          <div key={index} className="space-y-3">
            <div>
              <label htmlFor={`boardMembers[${index}].boardMemberImage`}>
                Board Member Image
              </label>
              <Input
                className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
                type="file"
                id={`boardMembers[${index}].boardMemberImage`}
                {...register(`boardMembers.${index}.boardMemberImage` as const)}
              />
              {errors.boardMembers?.[index]?.boardMemberImage && (
                <p className="text-red-500">
                  {errors.boardMembers[index].boardMemberImage?.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`boardMembers[${index}].boardMemberName`}>
                Board Member Name
              </label>
              <Input
                className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
                type="text"
                id={`boardMembers[${index}].boardMemberName`}
                {...register(`boardMembers.${index}.boardMemberName` as const)}
              />
              {errors.boardMembers?.[index]?.boardMemberName && (
                <p className="text-red-500">
                  {errors.boardMembers[index].boardMemberName?.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`boardMembers[${index}].boardMemberEmail`}>
                Board Member Email
              </label>
              <Input
                className="rounded-md border border-th-black bg-white px-4 py-2 focus:outline-none"
                type="email"
                id={`boardMembers[${index}].boardMemberEmail`}
                {...register(`boardMembers.${index}.boardMemberEmail` as const)}
              />
              {errors.boardMembers?.[index]?.boardMemberEmail && (
                <p className="text-red-500">
                  {errors.boardMembers[index].boardMemberEmail?.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeBoardMember(index)}
              className="rounded-md bg-red-500 px-4 py-2 text-white"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addBoardMember}
          className="rounded-md bg-th-accent-2 px-4 py-2 text-white"
        >
          Add Board Member
        </button>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  )
}


