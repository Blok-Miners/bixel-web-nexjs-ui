import { FaFacebookF } from "react-icons/fa"
import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

export const icons: { [key: string]: () => JSX.Element } = {
  twitter: () => <FaXTwitter />,
  linkedin: () => <FaLinkedinIn />,
  youtube: () => <FaYoutube />,
  facebook: () => <FaFacebookF />,
  telegram: () => <FaTelegram />,
  instagram: () => <FaInstagram />,
}
