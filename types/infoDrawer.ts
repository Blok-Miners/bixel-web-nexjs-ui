import { Dispatch } from "react"
import { ISelectedSquares } from "./grid"

export interface IInfoDrawer {
  selected: ISelectedSquares
  open: boolean
  setOpen: Dispatch<boolean>
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
