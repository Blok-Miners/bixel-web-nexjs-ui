"use client"
import { useState } from "react"
import CreateBlockchainReward from "./CreateBlockchainReward"
import CreateSocialReward from "./CreateSocialReward"

export default function CreateReward() {
  const [reward, setReward] = useState("blockchain")
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, files } = e.target

  //   if (type === "file" && files) {
  //     const file = files[0]
  //     const reader = new FileReader()

  //     reader.onload = (event: any) => {
  //       try {
  //         const json = JSON.parse(event.target.result as string)
  //         setBlockchainData({ ...blockchainData, abi: json })
  //       } catch (error) {
  //         console.error("Error parsing JSON:", error)
  //       }
  //     }

  //     if (file) {
  //       reader.readAsText(file)
  //     }
  //   } else {
  //     setBlockchainData({ ...blockchainData, [name]: value })
  //   }
  // }

  return (
    <div className="mx-auto mt-6 max-w-6xl">
      <div className="mx-auto text-2xl font-bold">Create Reward</div>
      <div className="mt-6 flex gap-4">
        <div className="h-[80vh] w-[350px] rounded-xl bg-th-black-2 p-4">
          {/* <div className="text-lg font-bold">Reward type</div> */}
          <div className="mt-6 flex flex-col gap-4 text-lg font-bold">
            <div
              className={` ${
                reward === "blockchain" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("blockchain")
              }}
            >
              Contract Interaction
            </div>
            <div
              className={` ${
                reward === "social" ? "bg-th-black" : "bg-th-black-2"
              } cursor-pointer rounded-lg p-2 px-4`}
              onClick={() => {
                setReward("social")
              }}
            >
              Social
            </div>
          </div>
        </div>
        <div className="h-[80vh] w-[1000px] rounded-xl bg-th-black-2 p-4">
          {reward === "blockchain" ? (
            <CreateBlockchainReward />
          ) : reward === "social" ? (
            <CreateSocialReward />
          ) : null}
        </div>
      </div>
    </div>
  )
}
