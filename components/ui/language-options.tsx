"use client"

import { LanguageCode } from "@/hooks/use-language"
import { motion } from "framer-motion"

interface Language {
  code: string
  name: string
  nativeName: string
}

interface LanguageOptionsProps {
  currentLanguage: string
  onLanguageChange: (language: LanguageCode) => void
}

const languages: Language[] = [
  {code:"en",name:"English",nativeName:"English"},
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
]

export function LanguageOptions({ currentLanguage, onLanguageChange }: LanguageOptionsProps) {
  return (
    <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Google offered in:</p>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code as any)}
            className={`text-sm transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded px-1 py-0.5 ${
              currentLanguage === lang.code
                ? "text-blue-700 dark:text-blue-400 font-medium"
                : "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${lang.name}`}
          >
            {lang.nativeName}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
