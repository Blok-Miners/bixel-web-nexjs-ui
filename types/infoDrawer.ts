import { Dispatch } from "react"
import { ISelectedSquares } from "./grid"
import { DrawnPixels } from "./services/pixel"

export interface IInfoDrawer {
  plans: {
    id: number
    duration: number
    title: string
    price: number
  }[]
  selected: ISelectedSquares
  open: boolean
  setOpen: Dispatch<boolean>
  drawnPixels: DrawnPixels
}

export enum InfoStateEnum {
  MULTI_OWNER,
  SINGLE_OWNER,
  NO_OWNER,
}

export enum OwnershipEnum {
  OWNER,
  TENANT,
}
