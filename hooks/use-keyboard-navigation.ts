"use client"

import { useState, useCallback } from "react"
import type { KeyboardEvent } from "react"

export function useKeyboardNavigation(totalItems: number) {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Tab":
          if (e.shiftKey) {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1))
          } else {
            setFocusedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0))
          }
          break
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          setFocusedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0))
          break
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1))
          break
        case "Escape":
          setFocusedIndex(-1)
          break
      }
    },
    [totalItems],
  )

  return { focusedIndex, handleKeyDown, setFocusedIndex }
}
