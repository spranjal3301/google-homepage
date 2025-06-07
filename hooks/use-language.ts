"use client"

import { useState, useCallback } from "react"

// Updated translations to include all language codes from language-options
const translations = {
  en: {
    googleSearch: "Google Search",
    imFeelingLucky: "I'm Feeling Lucky",
    offeredIn: "Google offered in:",
  },
  es: {
    googleSearch: "Buscar con Google",
    imFeelingLucky: "Voy a tener suerte",
    offeredIn: "Google disponible en:",
  },
  fr: {
    googleSearch: "Recherche Google",
    imFeelingLucky: "J'ai de la chance",
    offeredIn: "Google disponible en:",
  },
  de: {
    googleSearch: "Google-Suche",
    imFeelingLucky: "Auf gut Glück!",
    offeredIn: "Google angeboten auf:",
  },
  hi: {
    googleSearch: "Google खोज",
    imFeelingLucky: "मुझे अच्छा लग रहा है",
    offeredIn: "Google में उपलब्ध:",
  },
  bn: {
    googleSearch: "গুগল সার্চ",
    imFeelingLucky: "আমি ভাগ্যবান",
    offeredIn: "গুগলে উপলব্ধ:",
  },
  te: {
    googleSearch: "గూగుల్ సెర్చ్",
    imFeelingLucky: "నేను అదృష్టవంతుడిని",
    offeredIn: "గూగుల్ అందుబాటులో:",
  },
  mr: {
    googleSearch: "गुगल शोध",
    imFeelingLucky: "माझं सुदांगी आहे",
    offeredIn: "गुगल उपलब्ध:",
  },
  ta: {
    googleSearch: "கூகுள் தேடல்",
    imFeelingLucky: "எனக்கு அனுமானம்",
    offeredIn: "கூகுளில் வழங்கப்படுகிறது:",
  },
  gu: {
    googleSearch: "ગૂગલ શોધ",
    imFeelingLucky: "હું નસીબવંતુ છું",
    offeredIn: "ગૂગલણે ઉપલબ્ધ:",
  },
  kn: {
    googleSearch: "ಗೂಗಲ್ ಹುಡುಕು",
    imFeelingLucky: "ನಾನು ಅದೃಷ್ಟವಂತ",
    offeredIn: "ಗೂಗಲ್ ಲಭ್ಯವಿದೆ:",
  },
  ml: {
    googleSearch: "ഗൂഗിൾ തിരയൽ",
    imFeelingLucky: "എനിക്ക് ഭാഗ്യം",
    offeredIn: "ഗൂഗിളിൽ ലഭ്യമാണ്:",
  },
  pa: {
    googleSearch: "ਗੂਗਲ ਖੋਜ",
    imFeelingLucky: "ਮੈਂ ਕਿਸਮਤ ਵਾਲਾ ਹਾਂ",
    offeredIn: "ਗੂਗਲ ਵਿੱਚ ਉਪਲਬਧ:",
  },
}

export type LanguageCode = keyof typeof translations

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en")

  const setLanguage = useCallback((lang: LanguageCode) => {
    setCurrentLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)
  }, [])

  const t = useCallback(
    (key: keyof typeof translations.en) => {
      return translations[currentLanguage][key] || translations.en[key]
    },
    [currentLanguage],
  )

  return { t, currentLanguage, setLanguage }
}
