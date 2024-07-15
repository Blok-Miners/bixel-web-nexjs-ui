import { ISelectionContext, SelectionContext } from "@/context/SelectionContext"
import { useContext } from "react"

export function useSelection() {
  const ctx = useContext(SelectionContext) as ISelectionContext
  return ctx
}
