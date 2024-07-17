import { Check, Pencil, X } from "lucide-react"
import { Button } from "../ui/button"

export default function Actions({ id }: { id: string }) {
  return (
    <div className="absolute right-8 top-8 flex gap-2 rounded-md bg-th-black-2 p-2">
      <Button className="bg-th-black hover:bg-th-black/40 px-2 w-10">
        <Check color="#22c55e" strokeWidth={3} />
      </Button>
      <Button className="bg-th-black hover:bg-th-black/40 px-2 w-10">
        <X color="#fa0505" strokeWidth={3} />
      </Button>
      <Button className="bg-th-black hover:bg-th-black/40 px-2 w-10">
      <Pencil size={16} color="#ffffff" strokeWidth={3} />
      </Button>
    </div>
  )
}
