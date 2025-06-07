"use client"

import { useState } from "react"
import { Grid3X3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AppsMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const apps = [
    { name: "Search", icon: "🔍", href: "https://www.google.com" },
    { name: "Images", icon: "🖼️", href: "https://images.google.com" },
    { name: "Maps", icon: "🗺️", href: "https://maps.google.com" },
    { name: "Play", icon: "▶️", href: "https://play.google.com" },
    { name: "YouTube", icon: "📺", href: "https://youtube.com" },
    { name: "News", icon: "📰", href: "https://news.google.com" },
    { name: "Gmail", icon: "✉️", href: "https://gmail.com" },
    { name: "Drive", icon: "💾", href: "https://drive.google.com" },
    { name: "Calendar", icon: "📅", href: "https://calendar.google.com" },
  ]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="Google apps"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Grid3X3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-20 p-4"
              role="menu"
              aria-label="Google apps menu"
            >
              <div className="grid grid-cols-3 gap-4">
                {apps.map((app, index) => (
                  <motion.a
                    key={app.name}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    role="menuitem"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">{app.icon}</div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{app.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
