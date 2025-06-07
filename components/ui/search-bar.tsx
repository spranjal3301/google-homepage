"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, Mic, Camera, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { KeyboardEvent } from "react"

interface SearchSuggestion {
  query: string
  type: "suggestion" | "history"
}

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => void
  suggestions?: SearchSuggestion[]
  isLoading?: boolean
}

export function SearchBar({ value, onChange, onSearch, suggestions = [], isLoading = false }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault()
          if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
            onSearch(suggestions[selectedSuggestion].query)
          } else {
            onSearch(value)
          }
          setIsFocused(false)
          inputRef.current?.blur()
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedSuggestion((prev) => (prev > -1 ? prev - 1 : -1))
          break
        case "Escape":
          setIsFocused(false)
          setSelectedSuggestion(-1)
          inputRef.current?.blur()
          break
      }
    },
    [selectedSuggestion, suggestions, value, onSearch],
  )

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      onChange(suggestion.query)
      onSearch(suggestion.query)
      setIsFocused(false)
    },
    [onChange, onSearch],
  )

  const clearSearch = useCallback(() => {
    onChange("")
    inputRef.current?.focus()
  }, [onChange])

  useEffect(() => {
    if (!isFocused) {
      setSelectedSuggestion(-1)
    }
  }, [isFocused])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        className={`relative flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full shadow-sm transition-all duration-200 ${
          isFocused ? "shadow-lg ring-1 ring-blue-500/20 dark:ring-blue-400/20" : "hover:shadow-md"
        }`}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center pl-4">
          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="flex-1 px-4 py-3 text-base bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder=""
          autoComplete="off"
          role="combobox"
          aria-expanded={isFocused && suggestions.length > 0}
          aria-haspopup="listbox"
          aria-label="Search"
          aria-describedby="search-suggestions"
        />

        <div className="flex items-center pr-4 space-x-2">
          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Clear search"
                tabIndex={0}
              >
                <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search by voice"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            tabIndex={0}
          >
            <Mic className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          </motion.button>

          <motion.button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search by image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            tabIndex={0}
          >
            <Camera className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            id="search-suggestions"
            role="listbox"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={`${suggestion.query}-${index}`}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedSuggestion
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={index === selectedSuggestion}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center space-x-3">
                  <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-gray-900 dark:text-gray-100">{suggestion.query}</span>
                  {suggestion.type === "history" && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">Recent</span>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="px-4 py-3 text-center">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
