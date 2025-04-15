"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export default function InputForm() {
  const [terms, setTerms] = useState("")

  // Button to read text from user’s clipboard
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setTerms(text)
    } catch (err) {
      alert("Unable to read clipboard. Please allow permissions or copy something first.")
    }
  }

  const handleAnalyze = (e) => {
    e.preventDefault()
    if (terms.trim()) {
      // TODO: call your analyze function / pass to backend
      console.log("Analyzing T&C:", terms)
    }
  }

  return (
    <motion.form
      onSubmit={handleAnalyze}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full max-w-3xl p-6 rounded-2xl bg-white/10 backdrop-blur-md 
                 shadow-xl border border-white/20 flex flex-col gap-5"
    >
      <label className="text-base font-semibold text-white">
        Paste Terms & Conditions
      </label>
      <div className="flex gap-2">
        <textarea
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          placeholder="Paste the agreement text here..."
          rows={8}
          className="w-full px-4 py-3 rounded-md bg-white/10 text-white 
                     placeholder-white/50 border border-white/20 
                     outline-none focus:ring-2 focus:ring-violet-500 
                     transition resize-none"
        />
        {/* Button to paste from clipboard */}
        <button
          type="button"
          onClick={handlePasteClipboard}
          className="px-4 py-2 h-fit self-start mt-1 
                     bg-violet-600 text-white font-medium rounded-md 
                     hover:brightness-110 transition-all"
        >
          Paste
        </button>
      </div>

      {/* Analyze button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 py-3 px-6 
                   bg-gradient-to-r from-purple-600 to-violet-500 
                   text-white font-semibold rounded-lg 
                   shadow-lg hover:brightness-110 transition-all"
      >
        Analyze
      </motion.button>
    </motion.form>
  )
}
