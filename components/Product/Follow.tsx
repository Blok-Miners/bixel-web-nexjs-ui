"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { ProductService } from "@/services/product"
import { Address } from "@/types/web3"
import { useAccount } from "wagmi"

export default function Follow({ id, owner }: { id: string; owner: Address }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const { address } = useAccount()

  const getFollowStatus = async () => {
    try {
      const productService = new ProductService()
      const res = await productService.getFollowStatus(id)
      setIsFollowing(!!res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    setLoading(true)
    try {
      const productService = new ProductService()
      await productService.follow(id)
      setIsFollowing(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFollowStatus()
  }, [])

  console.log({ address, owner })

  if (owner === address) return <></>

  return isFollowing ? (
    <Button
      disabled={loading}
      className="!h-12 w-36 text-lg font-semibold"
      isLoading={loading}
    >
      {!loading && (
        <div className="flex items-center justify-center gap-2">
          <FaHeart />
          Following
        </div>
      )}
    </Button>
  ) : (
    <Button
      disabled={loading}
      className="!h-12 w-36 text-lg font-semibold"
      isLoading={loading}
      onClick={handleFollow}
    >
      {!loading && (
        <div className="flex items-center justify-center gap-2">
          <FaRegHeart />
          Follow
        </div>
      )}
    </Button>
  )
}
