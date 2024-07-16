import { IoPersonCircleOutline } from "react-icons/io5"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex h-[50vh] flex-row items-center justify-center gap-4 p-8 text-black">
      <Link href="/dashboard/company">
        <div className="flex flex-col gap-2 rounded-md border-2 border-black bg-th-accent-2 p-8 font-bold hover:bg-th-accent">
          <HiOutlineBuildingOffice2 className="text-7xl" />
          Company
        </div>
      </Link>
      <Link href={"/dashboard/individual"}>
        <div className="flex flex-col gap-2 rounded-md border-2 border-black bg-th-accent-2 p-8 font-bold hover:bg-th-accent">
          <IoPersonCircleOutline className="text-7xl" />
          Individual
        </div>
      </Link>
    </div>
  )
}
