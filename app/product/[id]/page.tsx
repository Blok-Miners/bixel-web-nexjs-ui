import Box from "@/components/BugBounty/Box"
import Iframe from "@/components/Iframe/Iframe"
import Actions from "@/components/Product/Actions"
import Banner from "@/components/Product/Banner"
import Follow from "@/components/Product/Follow"
import Info from "@/components/Product/Info"
import Socials from "@/components/Product/Socials"
import Video from "@/components/Shared/Video"
import { icons } from "@/lib/socials"
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
        <Actions id={params.id} />
        <div className="absolute bottom-8 right-8 z-10 flex gap-4">
          <Socials socials={JSON.parse(product.socialMediaLinks)} />
          <Follow id={params.id} />
        </div>
      </div>
      <div className="flex">
        <div className="h-full min-h-[80vh] min-w-[280px] bg-th-black-2 p-8">
          <Info
            about={product.about}
            // socials={JSON.parse(product.socialMediaLinks)}
            website={product.websiteUrl}
            country={product.country}
            github={product.github}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 bg-th-black p-6">
          <Box />
          {/* <Iframe /> */}
          <Video src={product.video} />
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
