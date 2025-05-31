'use client'

import { useEffect, useRef } from "react"
import Analyzer from "@/components/Analyzer"

export default function ScrollLayoutWrapper({ children }) {
  const inputFormRef = useRef(null)

  useEffect(() => {
    // Reset scroll to top on every reload
    window.scrollTo(0, 0)

    // Scroll to input form after 2 seconds
    const timer = setTimeout(() => {
      inputFormRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center text-white drop-shadow-lg">
          LegalLint
        </h1>
      </section>

      <section ref={inputFormRef} className="relative min-h-screen pt-[15rem]">
        <Analyzer />
      </section>
    </>
  )
}
