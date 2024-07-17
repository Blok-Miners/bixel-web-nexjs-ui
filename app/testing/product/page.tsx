import Box from "@/components/BugBounty/Box"
import Iframe from "@/components/Iframe/Iframe"
import Banner from "@/components/Product/Banner"
import Links from "@/components/Product/Links"

export default function page() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="h-52 overflow-hidden rounded-lg border border-th-accent-2">
        <Banner />
      </div>
      <div className="flex h-[92vh] gap-6">
        <div className="h-full w-[300px] rounded-lg border border-th-accent-2 bg-th-black-2 p-6">
          <Links/>
        </div>
        <div className="h-full flex-1 rounded-lg border border-th-accent-2 bg-th-black-2 p-6 grid grid-cols-2 gap-4">
            <Box/>
            <Iframe/>
        </div>
      </div>
    </div>
  )
}
