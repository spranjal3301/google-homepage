"use client"

import { useState, useEffect, useCallback } from "react"
import { debounce } from "@/lib/utils"

interface SearchSuggestion {
  query: string
  type: "suggestion" | "history"
}

const POPULAR_SEARCHES = [
  "weather today",
  "news",
  "translate",
  "calculator",
  "maps",
  "youtube",
  "gmail",
  "facebook",
  "amazon",
  "netflix",
]

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([])
        return
      }

      setIsLoading(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Get search history from localStorage
        const searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]").slice(0, 3)

        // Filter popular searches based on query
        const filteredPopular = POPULAR_SEARCHES.filter((search) =>
          search.toLowerCase().includes(searchQuery.toLowerCase()),
        )
          .slice(0, 5)
          .map((query) => ({ query, type: "suggestion" as const }))

        // Add history items
        const historyItems = searchHistory
          .filter(
            (item: string) =>
              item.toLowerCase().includes(searchQuery.toLowerCase()) &&
              item.toLowerCase() !== searchQuery.toLowerCase(),
          )
          .slice(0, 2)
          .map((query: string) => ({ query, type: "history" as const }))

        const allSuggestions = [...historyItems, ...filteredPopular].slice(0, 8)

        setSuggestions(allSuggestions)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, 300),
    [],
  )

  useEffect(() => {
    fetchSuggestions(query)
  }, [query, fetchSuggestions])

  return { suggestions, isLoading }
}
