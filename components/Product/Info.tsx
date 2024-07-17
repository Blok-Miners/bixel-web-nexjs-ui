import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

const socials: { [key: string]: string } = {
  twitter: "https://twitter.com/elon",
  linkedin: "https://linkedin.com/in/elonmusk",
  youtube: "https://www.youtube.com/@Zellsis",
  telegram: "https://telegram.me/elonmusk",
  instagram: "https://instagram.com/elonmusk",
}

const icons: { [key: string]: () => JSX.Element } = {
  twitter: () => <FaXTwitter />,
  linkedin: () => <FaLinkedinIn />,
  youtube: () => <FaYoutube />,
  telegram: () => <FaTelegram />,
  instagram: () => <FaInstagram />,
}

const extractUsername = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url)
    const pathParts = parsedUrl.pathname.split("/").filter(Boolean)
    if (pathParts.length > 1) {
      // Remove known prefixes
      if (pathParts[0] === "in" || pathParts[0] === "user") {
        return pathParts[1]
      }
      return pathParts[0]
    }
    return pathParts.length > 0 ? pathParts[0] : null
  } catch (error) {
    console.error("Invalid URL:", url)
    return null
  }
}

export default function Info() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">About:</div>
        <div className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          aspernatur magnam commodi iure qui dicta.
        </div>
      </div>
      <div className="flex flex-col gap-2">
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
      </div>
    </div>
  )
}
