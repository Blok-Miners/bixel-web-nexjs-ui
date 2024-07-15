"use client"

import { IChildren } from "@/types/generic"
import { ISelectedSquares } from "@/types/grid"
import { createContext, Dispatch, useState } from "react"

export interface ISelectionContext {
  selectedSquares: { [key: string]: boolean }
  handleSelectSquare: (coords: { x: number; y: number }) => void
  setSelectedSquares: Dispatch<{ [key: string]: boolean }>
}

export const SelectionContext = createContext<ISelectionContext | null>(null)

export default function SelectionProvider({ children }: IChildren) {
  const [selectedSquares, setSelectedSquares] = useState<ISelectedSquares>({})

  const handleSelectSquare = (coords: { x: number; y: number }) => {
    const key = `${coords.x}-${coords.y}`
    setSelectedSquares((prevSelected) => ({
      ...prevSelected,
      [key]: !prevSelected[key],
    }))
  }
  return (
    <SelectionContext.Provider
      value={{ selectedSquares, setSelectedSquares, handleSelectSquare }}
    >
      {children}
    </SelectionContext.Provider>
  )
}
