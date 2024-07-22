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
import PhoneInput from "react-phone-number-input"
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
import { ProfileService } from "@/services/profile"
import { useRouter } from "next/navigation"

const MAX_FILE_SIZE = 5000000

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

  facebookUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  telegramUrl?: string
  youtubeUrl?: string

  contractAuditReportUrl: string
  registeredCountry: string
  githubUrl?: string
  moreLinks?: string[]
  video?: FileList

  email: string
  phone: string
}

const profileSchema = z.object({
  logo: z.any(),
  banner: z.any(),
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1).max(300),
  // team: z.array(
  //   z.object({
  //     memberImage: z.any(),
  //     memberName: z.string().min(1, "Team member name is required"),
  //     memberEmail: z.string().email("Invalid email"),
  //   }),
  // ),
  websiteUrl: z.string().url("Invalid URL"),
  registeredEmail: z.string().email("Invalid email"),
  phoneNumber: z.string(),

  facebookUrl: z.string().url("Invalid URL"),
  linkedinUrl: z.string().url("Invalid URL"),
  twitterUrl: z.string().url("Invalid URL"),
  telegramUrl: z.string().url("Invalid URL"),
  youtubeUrl: z.string().url("Invalid URL"),
  email: z.string().email("Invalid email"),
  phone: z.string(),

  contractAuditReportUrl: z.string().url("Invalid URL"),
  registeredCountry: z.string().min(1, "Country is required"),
  githubUrl: z.string().url("Invalid URL"),
  moreLinks: z.array(z.string().url("Invalid URL")),
  video: z
    .any()
    .refine((file: FileList) => file?.length !== 0, "File is required"),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB."),
})

export default function ProfileCreation({
  params,
}: {
  params: { groupId: string }
}) {
  const [loading, setLoading] = useState(false)
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })
  const router = useRouter()

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

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setLoading(true)
    const profile = new ProfileService()
    const formData = new FormData()

    if (data.logo) {
      formData.append("logo", data.logo[0])
    }
    if (data.banner) {
      formData.append("banner", data.banner[0])
    }
    if (data.video) {
      formData.append("video", data.video[0])
    }

    formData.append("name", data.name)
    formData.append("about", data.about || "")
    formData.append("websiteUrl", data.websiteUrl || "")
    formData.append("email", data.registeredEmail)
    formData.append("phone", data.phoneNumber)
    formData.append("contractAuditReport", data.contractAuditReportUrl || "")
    formData.append("country", data.registeredCountry)
    formData.append("github", data.githubUrl || "")

    const socialMediaLinks = {
      facebookUrl: data.facebookUrl || "",
      linkedinUrl: data.linkedinUrl || "",
      twitterUrl: data.twitterUrl || "",
      telegramUrl: data.telegramUrl || "",
      youtubeUrl: data.youtubeUrl || "",
    }
    formData.append("socialMediaLinks", JSON.stringify(socialMediaLinks))

    const directContact = {
      email: data.email,
      number: data.phone,
    }

    formData.append("directContact", JSON.stringify(directContact))

    console.log(formData)

    try {
      const response = await profile.createProfile(formData, params.groupId)
      setLoading(false)
      router.push(`/product/${response.id}`)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl bg-th-black p-6 text-white shadow-md"
      >
        <div className="mx-auto max-w-5xl space-y-4 rounded-lg bg-th-black-2 p-6">
          <div className="relative mb-16 bg-th-black-2">
            <div className="grid w-full items-center gap-1.5">
              <div className="relative bg-th-accent-2/20">
                <Input
                  className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                  id="banner"
                  type="file"
                  accept="image/*"
                  {...register("banner")}
                  onChange={handleBannerChange}
                />
                <div className="flex h-72 w-full items-center justify-center rounded-lg border-2 border-th-accent-2">
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
                <p className="text-red-500">
                  {errors.banner.message as string}
                </p>
              )}
            </div>

            <div className="relative-input-wrapper absolute left-[4rem] top-[12rem] grid w-fit items-center gap-1.5 rounded-full">
              <div className="relative rounded-full bg-[#3B4B4C] shadow-xl">
                <Input
                  className="absolute inset-0 z-20 h-full w-full cursor-pointer rounded-full opacity-0"
                  id="logo"
                  type="file"
                  accept="image/*"
                  {...register("logo")}
                  onChange={handleLogoChange}
                />
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-th-accent-2">
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                    <PhoneInput
                      className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                      type="phone"
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
              name="facebookUrl"
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
                  {errors.facebookUrl && (
                    <FormMessage className="text-red-500">
                      {errors.facebookUrl.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="linkedinUrl"
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
                  {errors.linkedinUrl && (
                    <FormMessage className="text-red-500">
                      {errors.linkedinUrl.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="twitterUrl"
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
                  {errors.twitterUrl && (
                    <FormMessage className="text-red-500">
                      {errors.twitterUrl.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="telegramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram URL</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                      type="url"
                      id="telegram Url"
                      {...field}
                    />
                  </FormControl>
                  {errors.telegramUrl && (
                    <FormMessage className="text-red-500">
                      {errors.telegramUrl.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube URL</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                      type="url"
                      id="youtube Url"
                      {...field}
                    />
                  </FormControl>
                  {errors.youtubeUrl && (
                    <FormMessage className="text-red-500">
                      {errors.youtubeUrl.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                      type="email"
                      id="email"
                      {...field}
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage className="text-red-500">
                      {errors.email.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      className="rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                      type="phone"
                      id="phone"
                      {...field}
                    />
                  </FormControl>
                  {errors.phone && (
                    <FormMessage className="text-red-500">
                      {errors.phone.message as string}
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
                                className="text-white"
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

            <div className="col-span-1 flex flex-col gap-4">
              <FormField
                control={control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video</FormLabel>
                    <FormControl>
                      <Input
                        className="cursor-pointer rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2"
                        type="file"
                        id="video"
                        accept="video/*"
                        {...register("video")}
                      />
                    </FormControl>
                    {errors.video && (
                      <FormMessage className="text-red-500">
                        {errors.video.message as string}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="moreLinks"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel>More Links</FormLabel>
                  {field.value?.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        className="flex-grow rounded-md border border-th-accent-2 bg-th-black-2 px-4 py-2 focus:outline-none"
                        type="url"
                        value={link}
                        onChange={(e) => {
                          const updatedLinks = [...(field.value || [])]
                          updatedLinks[index] = e.target.value
                          field.onChange(updatedLinks)
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedLinks = [...(field.value || [])]
                          updatedLinks.splice(index, 1)
                          field.onChange(updatedLinks)
                        }}
                        className="bg-red-500 text-white hover:bg-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => field.onChange([...(field.value || []), ""])}
                    className="hover:bg-th-accent-3 mt-2 w-fit bg-th-accent-2 px-10 text-white"
                  >
                    Add Link
                  </Button>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-end">
            <Button
              isLoading={loading}
              disabled={loading}
              type="submit"
              className="text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
