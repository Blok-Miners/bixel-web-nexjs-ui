"use client"

import PaymentBox from "@/components/Purchase/PaymentBox"
import ProductPageForm from "@/components/Purchase/ProductPageForm"
import PurchaseHeader from "@/components/Purchase/PurchaseHeader"
import { useSelection } from "@/hooks/useSelectioin"
import { generateTokenId } from "@/lib/utils"
import { PixelService } from "@/services/pixel"
import { formSchema } from "@/types/forms"
import {
  IBuyPixel,
  IImageUploadResponse,
  IPixel,
  Listing_Status,
} from "@/types/services/pixel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function PurchaseInfoPage({
  searchParams,
}: {
  searchParams: {
    renewId?: string
  }
}) {
  const { selectedSquares } = useSelection()
  const [disabled, setDisabled] = useState(false)
  const [metadata, setMetadata] = useState<string[]>([])
  const [metadataId, setMetadataId] = useState<string | undefined>()
  const [uploadedImages, setUploadedImages] = useState<IImageUploadResponse[]>(
    [],
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      website: "",
      description: "",
    },
  })

  const buyPixel = async (values: z.infer<typeof formSchema>) => {
    try {
      const { title, website, description } = values
      const data: IPixel[] = Object.keys(selectedSquares).map((key, i) => {
        const [column, row] = key.split("-").map(Number)
        const blokId = generateTokenId(row, column)
        const pixel: IPixel = {
          x: column,
          y: row,
          image: uploadedImages[i].id,
          blokId,
          listing_status: Listing_Status.Rental,
        }
        return pixel
      })
      const body: IBuyPixel = {
        title,
        website,
        description,
        data: data,
      }
      const pixelService = new PixelService()
      const res = await pixelService.buyPixels(body)
      // return res
      setMetadata(res.urls)
      setMetadataId(res.metadataId)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {/* <PurchaseHeader /> */}
      <ProductPageForm
        form={form}
        submit={buyPixel}
        setUploadedImages={setUploadedImages}
        renewId={searchParams.renewId}
      />
      <PaymentBox
        uploadedImages={uploadedImages}
        metadata={metadata}
        getMetadataUrls={form.handleSubmit(buyPixel)}
        metadataId={metadataId}
      />
    </div>
  )
}
