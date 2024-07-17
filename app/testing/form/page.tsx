"use client"

import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Country } from "country-state-city"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

interface ProfileFormData {
  logo?: FileList
  banner?: FileList
  name: string
  about?: string
  team: {
    memberImage?: FileList
    memberName: string
    memberEmail: string
  }[]
  websiteUrl?: string
  registeredEmail: string
  phoneNumber: string
  socialMediaLinks?: {
    facebookUrl?: string
    linkedinUrl?: string
    twitterUrl?: string
  }
  contractAuditReportUrl?: string
  registeredCountry: string
  githubUrl?: string
}

const profileSchema = z.object({
  logo: z.any() ,
  banner: z.any() ,
  name: z.string().min(1, "Name is required"),
  about: z.string() ,
  team: z
    .array(
      z.object({
        memberImage: z.any() ,
        memberName: z.string().min(1, "Team member name is required"),
        memberEmail: z.string().email("Invalid email"),
      }),
    )
     ,
  websiteUrl: z.string().url("Invalid URL") ,
  registeredEmail: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  socialMediaLinks: z
    .object({
      facebookUrl: z.string().url("Invalid URL") ,
      linkedinUrl: z.string().url("Invalid URL") ,
      twitterUrl: z.string().url("Invalid URL") ,
    })
     ,
  contractAuditReportUrl: z.string().url("Invalid URL") ,
  registeredCountry: z.string().min(1, "Country is required"),
  githubUrl: z.string().url("Invalid URL") ,
})

export default function ProfileCreation() {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  const [team, setTeam] = useState<
    {
      memberImage?: FileList
      memberName: string
      memberEmail: string
    }[]
  >([])

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const addTeamMember = () => {
    setTeam([
      ...team,
      {
        memberImage: undefined,
        memberName: "",
        memberEmail: "",
      },
    ])
  }

  const removeTeamMember = (index: number) => {
    const updatedTeam = [...team]
    updatedTeam.splice(index, 1)
    setTeam(updatedTeam)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded bg-th-black text-white shadow-md"
      >
        <div className="relative bg-th-black-2">
          <div className="grid w-full items-center gap-1.5">
            <div className="relative m-4">
              <Input
                className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                id="banner"
                type="file"
                accept="image/*"
                {...register("banner")}
                onChange={handleBannerChange}
              />
              <div className="flex h-72 w-full items-center justify-center rounded-lg border-2 border-dashed border-th-accent-2">
                {bannerPreview ? (
                  <Image
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                    width={1920}
                    height={500}
                  />
                ) : (
                  <span className="text-gray-500">Upload a banner image</span>
                )}
              </div>
            </div>
            {errors.banner && (
              <p className="text-red-500">{errors.banner.message as string}</p>
            )}
          </div>

          <div className="absolute left-[10rem] top-[9rem] grid w-full max-w-sm items-center gap-1.5 rounded-full">
            <div className="relative rounded-full">
              <Input
                className="absolute inset-0 z-20 h-full w-full cursor-pointer rounded-full opacity-0"
                id="logo"
                type="file"
                accept="image/*"
                {...register("logo")}
                onChange={handleLogoChange}
              />
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-th-accent-2">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-full w-full rounded-full object-cover"
                    width={500}
                    height={500}
                  />
                ) : (
                  <span className="text-gray-500">Upload a logo</span>
                )}
              </div>
            </div>
            {errors.logo && (
              <p className="text-red-500">{errors.logo.message as string}</p>
            )}
          </div>
        </div>
        <div className="mx-4 max-w-3xl space-y-4 rounded-lg bg-th-black-2 p-5">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="text"
                    id="name"
                    {...field}
                  />
                </FormControl>
                {errors.name && (
                  <FormMessage className="text-red-500">
                    {errors.name.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    id="about"
                    {...field}
                  />
                </FormControl>
                {errors.about && (
                  <FormMessage className="text-red-500">
                    {errors.about.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="url"
                    id="websiteUrl"
                    {...field}
                  />
                </FormControl>
                {errors.websiteUrl && (
                  <FormMessage className="text-red-500">
                    {errors.websiteUrl.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="registeredEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registered Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="email"
                    id="registeredEmail"
                    {...field}
                  />
                </FormControl>
                {errors.registeredEmail && (
                  <FormMessage className="text-red-500">
                    {errors.registeredEmail.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="tel"
                    id="phoneNumber"
                    {...field}
                  />
                </FormControl>
                {errors.phoneNumber && (
                  <FormMessage className="text-red-500">
                    {errors.phoneNumber.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="socialMediaLinks.facebookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook URL</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="url"
                    id="facebookUrl"
                    {...field}
                  />
                </FormControl>
                {errors.socialMediaLinks?.facebookUrl && (
                  <FormMessage className="text-red-500">
                    {errors.socialMediaLinks.facebookUrl.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="socialMediaLinks.linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="url"
                    id="linkedinUrl"
                    {...field}
                  />
                </FormControl>
                {errors.socialMediaLinks?.linkedinUrl && (
                  <FormMessage className="text-red-500">
                    {errors.socialMediaLinks.linkedinUrl.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="socialMediaLinks.twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="url"
                    id="twitterUrl"
                    {...field}
                  />
                </FormControl>
                {errors.socialMediaLinks?.twitterUrl && (
                  <FormMessage className="text-red-500">
                    {errors.socialMediaLinks.twitterUrl.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="contractAuditReportUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Audit Report URL</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="url"
                    id="contractAuditReportUrl"
                    {...field}
                  />
                </FormControl>
                {errors.contractAuditReportUrl && (
                  <FormMessage className="text-red-500">
                    {errors.contractAuditReportUrl.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="registeredCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registered Country</FormLabel>
                <FormControl>
                  <Controller
                    control={control}
                    name="registeredCountry"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {Country.getAllCountries().map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.registeredCountry && (
                  <FormMessage className="text-red-500">
                    {errors.registeredCountry.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                    type="url"
                    id="githubUrl"
                    {...field}
                  />
                </FormControl>
                {errors.githubUrl && (
                  <FormMessage className="text-red-500">
                    {errors.githubUrl.message as string}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          {team.map((member, index) => (
            <div
              key={index}
              className="rounded-lg border border-th-accent-2 p-4"
            >
              <h3 className="mb-2 text-lg font-medium">
                Team Member {index + 1}
              </h3>

              <FormField
                control={control}
                name={`team.${index}.memberImage` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Image</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const fileList = e.target.files
                          field.onChange(fileList)
                        }}
                        // Do not set the `value` prop for file inputs
                      />
                    </FormControl>
                    {errors.team?.[index]?.memberImage && (
                      <FormMessage className="text-red-500">
                        {errors.team?.[index]?.memberImage?.message as string}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`team.${index}.memberName` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    {errors.team?.[index]?.memberName && (
                      <FormMessage className="text-red-500">
                        {errors.team?.[index]?.memberName?.message as string}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`team.${index}.memberEmail` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Email</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    {errors.team?.[index]?.memberEmail && (
                      <FormMessage className="text-red-500">
                        {errors.team?.[index]?.memberEmail?.message as string}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="mt-4 bg-red-500 text-white hover:bg-red-700"
              >
                Remove Member
              </Button>
            </div>
          ))}
          <div className="w-full flex flex-col gap-2">
            <Label>Add Team Member</Label>
            <Button
              type="button"
              onClick={addTeamMember}
              className="text-white w-fit"
            >
              Add Team Member
            </Button>
          </div>
          <div className="flex w-full items-center justify-end">
            <Button type="submit" className="text-white">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
