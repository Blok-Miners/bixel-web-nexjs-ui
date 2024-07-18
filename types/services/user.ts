import { Address } from "../web3"

export interface ILoginError {
  message: string
}

export interface ILogin {
  walletAddress: Address
}

export interface IRegister extends ILogin {
  email: string
}

export enum UserTypeEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IUser {
  walletAddress: string
  email: string
  userType: UserTypeEnum
  id: string
}
