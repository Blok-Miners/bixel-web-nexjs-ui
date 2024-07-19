import Image from "next/image"

export default function Banner({
  banner,
  logo,
  name,
}: {
  banner: string
  logo: string
  name: string
}) {
  return (
    <div className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden">
      <Image
        className="h-full w-full object-cover"
        src={banner}
        alt="Banner"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-r from-th-black-2 to-transparent opacity-80"></div>
      <div className="absolute bottom-4 left-10 flex items-center gap-4">
        <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-white">
          <Image
            className="h-full w-full object-cover"
            src={logo}
            alt="Banner"
            fill
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 text-lg font-bold uppercase">
          <div className="">{name}</div>
          {/* <div>This is a small tagline</div> */}
        </div>
      </div>
    </div>
  )
}
