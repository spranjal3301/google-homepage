"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-6">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-1 py-0.5"
            >
              Advertising
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-1 py-0.5"
            >
              Business
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-1 py-0.5"
            >
              How Search works
            </a>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-1 py-0.5"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-1 py-0.5"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-1 py-0.5"
            >
              Settings
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Carbon neutral since 2007</span>
        </div>
      </div>
    </motion.footer>
  )
}
