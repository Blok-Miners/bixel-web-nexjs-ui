"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { ProductService } from "@/services/product"

export default function Follow({ id }: { id: string }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  const getFollowStatus = async () => {
    const productService = new ProductService()
    const res = await productService.getFollowStatus(id)
    setIsFollowing(!!res)
    setLoading(false)
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
