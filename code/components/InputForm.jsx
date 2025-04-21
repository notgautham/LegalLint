"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function InputForm({ onAnalyze }) {
  const [terms, setTerms] = useState("");
  const [clicked, setClicked] = useState(false);

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTerms(text);
    } catch (err) {
      alert("Clipboard access denied. Please allow permissions or copy text first.");
    }
  };

  const handleClear = () => {
    setTerms("");
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!terms.trim()) return;
  
    if (typeof onAnalyze === "function") {
      onAnalyze({ terms });
    }
  
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };
  
  

  return (
    <motion.form
      onSubmit={handleAnalyze}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full max-w-3xl p-6 rounded-2xl bg-white/5 backdrop-blur-[2px] 
                 border border-white/10 shadow-lg flex flex-col gap-5"
    >
      <label className="text-base font-semibold text-white">
        Paste Terms & Conditions
      </label>

      {/* Textarea with Top Bar Controls */}
      <div className="relative rounded-md bg-white/10 border border-white/10">
        {/* Top bar with Paste/Clear buttons and placeholder */}
        <div className="flex justify-between items-center px-4 pt-2">
          <span className="text-white/50 text-sm">
            Paste the agreement text below...
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="text-xs bg-white/10 border border-white/20 
                         text-white px-2 py-1 rounded-md hover:bg-white/20 transition-all"
            >
              Paste
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs bg-white/10 border border-white/20 
                         text-white px-2 py-1 rounded-md hover:bg-white/20 transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          rows={8}
          className={cn(
            "w-full px-4 pb-3 pt-2 mt-1 text-white bg-transparent",
            "placeholder-white/50 border-none resize-none",
            "outline-none focus:outline-none focus:ring-0 transition-all"
          )}
        />

      </div>

      {/* Animated Analyze Button */}
      <motion.button
        type="submit"
        whileTap={{ scale: 1.03 }}
        animate={clicked ? { scale: 1.03 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="mt-4 py-3 px-6 rounded-lg font-semibold text-white relative 
                   bg-gradient-to-r from-purple-600 to-violet-500 overflow-hidden
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400 before:to-violet-600 
                   before:opacity-0 before:transition-opacity before:duration-500 
                   hover:before:opacity-100"
      >
        <span className="relative z-10">Analyze</span>
      </motion.button>
    </motion.form>
  );
}
