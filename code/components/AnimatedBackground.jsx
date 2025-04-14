'use client'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

export default function AnimatedBackground({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn(
        'fixed inset-0 z-0 bg-[conic-gradient(at_top_left,_#3b82f6_0%,_#8b5cf6_25%,_#ec4899_50%,_#3b82f6_100%)] animate-aceternityGradient bg-[length:300%_300%]',
        className
      )}
    />
  )
}
