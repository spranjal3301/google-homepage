"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { GoogleLogo } from "@/components/ui/google-logo"
import { SearchBar } from "@/components/ui/search-bar"
import { SearchButtons } from "@/components/ui/search-buttons"
import { LanguageOptions } from "@/components/ui/language-options"
import { useSearchSuggestions } from "@/hooks/use-search-suggestions"
import { useLanguage } from "@/hooks/use-language"

export function MainContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const { suggestions, isLoading } = useSearchSuggestions(searchQuery)
  const { t, currentLanguage, setLanguage } = useLanguage()

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      // Analytics tracking
      if (typeof window !== "undefined" && "gtag" in window) {
        ;(window as any).gtag("event", "search", {
          search_term: query,
        })
      }

      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank")
    }
  }, [])

  const handleLuckySearch = useCallback(() => {
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&btnI=1`, "_blank")
    }
  }, [searchQuery])

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
      <div className="w-full max-w-2xl">
        {/* Google Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <GoogleLogo />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            suggestions={suggestions}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Search Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        >
          <SearchButtons
            onGoogleSearch={() => handleSearch(searchQuery)}
            onLuckySearch={handleLuckySearch}
            searchText={t("googleSearch")}
            luckyText={t("imFeelingLucky")}
          />
        </motion.div>

        {/* Language Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
        >
          <LanguageOptions currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
        </motion.div>
      </div>
    </main>
  )
}
