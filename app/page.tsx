import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/sections/main-content"
import { Footer } from "@/components/layout/footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <MainContent />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  )
}
