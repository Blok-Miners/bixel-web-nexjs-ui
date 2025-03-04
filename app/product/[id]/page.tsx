import Actions from "@/components/Product/Actions"
import Banner from "@/components/Product/Banner"
import Contests from "@/components/Product/Contests/Contests"
import Follow from "@/components/Product/Follow"
import Info from "@/components/Product/Info"
import Socials from "@/components/Product/Socials"
import { ProductService } from "@/services/product"

const productService = new ProductService()

export default async function page({
  params,
}: {
  params: {
    id: string
  }
}) {
  const product = await productService.getProduct(params.id)
  return (
    <div className="flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <Banner
          banner={product.banner}
          logo={product.logo}
          name={product.name}
        />
        <Actions id={params.id} owner={product.owner} />
        <div className="absolute bottom-8 right-8 z-10 flex gap-4">
          <Socials socials={product.socialMediaLinks} />
          <Follow id={params.id} owner={product.owner.walletAddress} />
        </div>
      </div>
      <div className="relative flex min-h-screen">
        <div className="sticky left-0 top-0 h-full min-h-screen min-w-[320px] max-w-[320px] bg-th-black-2 p-8">
          <Info
            about={product.about}
            // socials={JSON.parse(product.socialMediaLinks)}
            website={product.websiteUrl}
            country={product.country}
            github={product.github}
          />
        </div>
        <Contests
          id={product.id}
          ownerId={product.owner.walletAddress}
          videoUrl={product.video}
        />
      </div>
    </div>
  )
}
