"use client"

import PaymentBox from "@/components/Purchase/PaymentBox"
import ProductPageForm from "@/components/Purchase/ProductPageForm"
import PurchaseHeader from "@/components/Purchase/PurchaseHeader"
import { useState } from "react"

export default function PurchaseInfoPage() {
  const [disabled, setDisabled] = useState(true)
  const [metadata, setMetadata] = useState<string | undefined>()
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <PurchaseHeader />
      <PaymentBox disabled={disabled} metadata={metadata} />
      <ProductPageForm />
    </div>
  )
}
