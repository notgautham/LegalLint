import "./globals.css"
import { IBM_Plex_Sans } from "next/font/google"
import { DotBackground } from "@/components/DotBG"
import { Spotlight } from "@/components/spotlight"
import Analyzer from "@/components/Analyzer"
import ScrollBlurOverlay from "@/components/ScrollBlurOverlay" // ✅

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm"
})

export const metadata = {
  title: "LegalLint"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibm.variable}>
      <body className={`${ibm.className} relative min-h-screen overflow-x-hidden bg-neutral-950`}>
        <DotBackground />
        <Spotlight />
        <ScrollBlurOverlay /> {/* ✅ scroll-based animated blur */}
          <section className="relative h-screen flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-center text-white drop-shadow-lg">
              LegalLint
            </h1>
          </section>
          <section className="relative min-h-screen pt-8">
            <Analyzer />
          </section>
      </body>
    </html>
  )
}
