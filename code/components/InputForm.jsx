'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function InputForm({ onSubmit }) {
  const [company, setCompany] = useState('')
  const [terms, setTerms] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (terms.trim()) {
      onSubmit({ company, terms })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="w-full max-w-3xl mt-6 p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 flex flex-col gap-5"
    >
      <label className="text-sm font-medium text-white/80">Company Name (optional)</label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="e.g. Meta, TikTok"
        className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500 transition"
      />

      <label className="text-sm font-medium text-white/80">Paste Terms & Conditions</label>
      <textarea
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        placeholder="Paste the agreement text here..."
        rows={8}
        className="px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 py-3 px-6 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition-all"
      >
        Analyze Agreement
      </motion.button>
    </motion.form>
  )
}
