'use client'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-wide drop-shadow-lg"
    >
      <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
        LegalLint
      </span>
    </motion.h1>
  )
}
