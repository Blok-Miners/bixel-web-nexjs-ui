"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAccount } from "wagmi"
import { Dispatch, useState } from "react"
import { AxiosError } from "axios"
import { UserService } from "@/services/user"
import { useWallet } from "@/hooks/useWallet"

export default function LoginDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<boolean>
}) {
  const { address } = useAccount()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setIsLoggedIn } = useWallet()

  const handleRegister = async () => {
    if (!address) return setError("Please Connect Wallet")
    setError("")
    setIsLoading(true)
    try {
      const userService = new UserService()
      const res = await userService.register({ email, walletAddress: address })
      localStorage.setItem("access_token", res.accessToken)
      setIsLoggedIn(true)
      setOpen(false)
    } catch (error) {
      setIsLoading(false)
      console.error({ RegistrationError: error })
      setError((error as AxiosError).message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Enter your email to complete your registration
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          <Input type="text" value={address} readOnly />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          {error && (
            <div className="text-right text-xs font-semibold text-red-500">
              * {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={!email || !address || isLoading}
            isLoading={isLoading}
            onClick={handleRegister}
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
