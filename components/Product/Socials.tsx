import { icons } from "@/lib/socials"
import { Button } from "../ui/button"

export default function Socials({
  socials,
}: {
  socials: { [key: string]: string }
}) {
  return (
    <div className="flex gap-1 rounded-md bg-th-black-2 p-1">
      {Object.entries(socials).map((item) => {
        const [key, value] = item

        return (
          <a key={key} href={value} target="_blank" rel="noopener noreferrer">
            <Button className="h-10 w-10 bg-th-black px-2 text-lg !text-white hover:bg-th-black/40">
              {icons[key]()}
            </Button>
          </a>
        )
      })}
    </div>
  )
}
