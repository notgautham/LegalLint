"use client"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ScrollBlurOverlay() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0, 1])

  return (
    <>
      {/* Top Blur */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none fixed top-0 left-0 w-full h-20 z-30"
      >
        <div className="w-full h-full bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm" />
      </motion.div>

      {/* Bottom Blur */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none fixed bottom-0 left-0 w-full h-20 z-30"
      >
        <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm" />
      </motion.div>
    </>
  )
}