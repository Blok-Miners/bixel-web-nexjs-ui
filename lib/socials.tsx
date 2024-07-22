import { FaFacebookF } from "react-icons/fa"
import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

export const icons: { [key: string]: () => JSX.Element } = {
  twitterUrl: () => <FaXTwitter />,
  linkedinUrl: () => <FaLinkedinIn />,
  youtubeUrl: () => <FaYoutube />,
  facebookUrl: () => <FaFacebookF />,
  telegramUrl: () => <FaTelegram />,
  instagramUrl: () => <FaInstagram />,
}
