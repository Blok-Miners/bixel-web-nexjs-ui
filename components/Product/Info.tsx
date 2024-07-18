import { icons } from "@/lib/socials"
import { extractUsername } from "@/lib/utils"
import { FaMapMarkerAlt } from "react-icons/fa"
import { FaEarthAsia, FaGithub } from "react-icons/fa6"

export default function Info({
  about,
  // socials,
  country,
  github,
  website,
}: {
  about: string
  country: string
  github: string
  website: string
  // socials: { [key: string]: string }
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">About:</div>
        <div className="text-sm">{about}</div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt /> {country}
        </div>
        <div className="flex items-center gap-2">
          <FaEarthAsia />
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaGithub />
          <a href={github} target="_blank" rel="noopener noreferrer">
            {extractUsername(github)}
          </a>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Socials:</div>
        {Object.entries(socials).map((item) => {
          const [key, value]: string[] = item
          return (
            <div key={key} className="flex items-center gap-2">
              {icons[key]()}{" "}
              <a href={value} target="_blank" rel="noopener noreferrer">
                {extractUsername(value)}
              </a>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
