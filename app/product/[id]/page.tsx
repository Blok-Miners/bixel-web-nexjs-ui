import Box from "@/components/BugBounty/Box"
import Iframe from "@/components/Iframe/Iframe"
import Actions from "@/components/Product/Actions"
import Banner from "@/components/Product/Banner"
import Info from "@/components/Product/Info"

export default function page() {
  return (
    <div className="flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <Banner />
        <Actions id="f97aw34o8fgo" />
      </div>
      <div className="flex h-[92vh]">
        <div className="h-full w-[340px] bg-th-black-2 p-8">
          <Info />
        </div>
        <div className="grid h-full flex-1 grid-cols-2 gap-4 bg-th-black p-6">
          <Box />
          <Iframe />
        </div>
      </div>
    </div>
  )
}
