import Image from "next/image"

export default function Banner() {
  return (
    <div className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden">
      <Image
        className="w-full"
        src="/product/Banner.jpg"
        alt="Banner"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-th-black-2 to-transparent opacity-80"></div>
      <div className="absolute bottom-4 left-10 flex items-center gap-4">
        <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-white">
          <Image
            className="h-full w-full"
            src="/product/Logo.png"
            alt="Banner"
            width={1920}
            height={1080}
          />
        </div>
        <div className="text-lg uppercase font-bold flex flex-col gap-2 mt-4">
          <div className="">Web3 Company</div>
          <div>This is a small tagline</div>
        </div>
      </div>
    </div>
  )
}
