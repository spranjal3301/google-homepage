"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AppsMenu } from "@/components/ui/apps-menu"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"

export function Header() {
  const { focusedIndex, handleKeyDown } = useKeyboardNavigation(5)

  return (
    <motion.header
      className="flex items-center justify-between p-4 md:p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center space-x-4">
        <Link
          href="#"
          className={`text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded px-2 py-1 ${
            focusedIndex === 0 ? "ring-2 ring-blue-500" : ""
          }`}
          tabIndex={0}
        >
          About
        </Link>
        <Link
          href="#"
          className={`text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded px-2 py-1 ${
            focusedIndex === 1 ? "ring-2 ring-blue-500" : ""
          }`}
          tabIndex={0}
        >
          Store
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="#"
          className={`text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded px-2 py-1 ${
            focusedIndex === 2 ? "ring-2 ring-blue-500" : ""
          }`}
          tabIndex={0}
        >
          Gmail
        </Link>
        <Link
          href="#"
          className={`text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded px-2 py-1 ${
            focusedIndex === 3 ? "ring-2 ring-blue-500" : ""
          }`}
          tabIndex={0}
        >
          Images
        </Link>
        <ThemeToggle />
        <AppsMenu />
        <motion.button
          className={`bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transform hover:scale-105 ${
            focusedIndex === 4 ? "ring-2 ring-blue-500 scale-105" : ""
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          tabIndex={0}
        >
          Sign in
        </motion.button>
      </div>
    </motion.header>
  )
}
