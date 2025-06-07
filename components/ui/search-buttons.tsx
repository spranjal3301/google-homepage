"use client"

import { motion } from "framer-motion"

interface SearchButtonsProps {
  onGoogleSearch: () => void
  onLuckySearch: () => void
  searchText: string
  luckyText: string
}

export function SearchButtons({ onGoogleSearch, onLuckySearch, searchText, luckyText }: SearchButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
      <motion.button
        onClick={onGoogleSearch}
        className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-50 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-3 rounded text-sm transition-all duration-200 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {searchText}
      </motion.button>
      <motion.button
        onClick={onLuckySearch}
        className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-50 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-3 rounded text-sm transition-all duration-200 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {luckyText}
      </motion.button>
    </div>
  )
}
