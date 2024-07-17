import Box from "@/components/BugBounty/Box"
import Iframe from "@/components/Iframe/Iframe"
import Actions from "@/components/Product/Actions"
import Banner from "@/components/Product/Banner"
import Info from "@/components/Product/Info"
import Video from "@/components/Shared/Video"
import { ProductService } from "@/services/product"

const productService = new ProductService()

const product = {
  id: "2d9c1f0b-2e08-4cef-8779-34d30811e5a1",
  name: "prashant",
  logo: "https://bixel-uploads.s3.amazonaws.com/Logo/1721201716446_undefined",
  banner:
    "https://bixel-uploads.s3.amazonaws.com/Banner/1721201718254_undefined",
  about: "iuveivbcejhcbdsfv",
  websiteUrl: "htttp://lof.com",
  email: "something@gmail.com",
  phone: null,
  socialMediaLinks:
    '{"twitter":"https://www.twitter.com/s4m7yjkoz9","linkedin":"https://www.linkedin.com/s4m7yjkoz9","facebook":"https://www.facebook.com/s4m7yjkoz9","instagram":"https://www.instagram.com/s4m7yjkoz9","youtube":"https://www.youtube.com/s4m7yjkoz9"}',
  contractAuditReport: "http://contract.com",
  country: "India",
  github: "github.com",
  video: "https://bixel-uploads.s3.amazonaws.com/Video/1721201718502_undefined",
  directContact: '{"email":"robinsarawat@gmail.com","phone":23452}',
}

export default async function page({
  params,
}: {
  params: {
    id: string
  }
}) {
  const product = await productService.getProduct(params.id)
  console.log(product)
  return (
    <div className="flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <Banner
          banner={product.banner}
          logo={product.logo}
          name={product.name}
        />
        <Actions id={params.id} />
      </div>
      <div className="flex">
        <div className="h-full min-h-[80vh] min-w-[280px] bg-th-black-2 p-8">
          <Info
            about={product.about}
            socials={JSON.parse(product.socialMediaLinks)}
            website={product.websiteUrl}
            country={product.country}
            github={product.github}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 bg-th-black p-6">
          <Box />
          <Iframe />
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
