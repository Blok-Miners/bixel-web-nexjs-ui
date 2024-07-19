"use client"
import { useState } from "react"
import { FaFacebookF } from "react-icons/fa"
import { FaLongArrowAltRight } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FaTelegramPlane } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"

export default function CreateSocialReward() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      color: "#1877F2",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      color: "#E1306C",
    },
    {
      name: "Linkedin",
      icon: <FaLinkedinIn />,
      color: "#0077B5",
    },
    {
      name: "Twitter",
      icon: <FaXTwitter />,
      color: "#000000",
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      color: "#0088CC",
    },
    {
      name: "Youtube",
      icon: <FaYoutube />,
      color: "#FF0000",
    },
  ]
  const [step, setStep] = useState(1)
  return (
    <>
      <div className="flex gap-4 px-4 text-sm text-slate-200 shadow-lg">
        <button
          onClick={() => setStep(1)}
          className={`font-medium ${step === 1 && "border-b border-th-accent-2 text-th-accent-2"} flex cursor-pointer items-center gap-2 p-2 text-sm`}
        >
          {/* <div>
            <FaLongArrowAltRight />
          </div> */}
          <div>Social Links</div>
        </button>
      </div>
      <div className="mt-8 px-4">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 font-bold">
              <FaPlus /> Add Social Links
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((item, index) => (
                <button style={{ backgroundColor: item.color }} className={`flex items-center gap-2 rounded-lg p-2 px-4 font-semibold shadow-lg`}>
                  {item.icon} <div>{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
