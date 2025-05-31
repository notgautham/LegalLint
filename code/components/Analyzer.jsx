"use client";
import { useState, useRef, useEffect } from "react";
import InputForm from "@/components/InputForm";
import GlowingOutput from "@/components/results/GlowingOutput";

export default function Analyzer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const outputRef = useRef(null);

  const handleAnalyze = async ({ terms }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: terms }),
      });

      const data = await res.json();
      console.log("✅ API Response:", data);
      setResult(data);
    } catch (err) {
      console.error("❌ Failed to fetch LLM result:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <div className="flex flex-col items-center gap-12 w-full px-4 py-12">
      <InputForm onAnalyze={handleAnalyze} />
      {loading && (
        <p className="text-white text-lg mt-10">Analyzing, please wait...</p>
      )}
      {/* <<< Easily adjustable margin here >>> */}
      <div ref={outputRef} className="mt-[500px] w-full">
        {result && <GlowingOutput result={result} />}
      </div>
    </div>
  );
}
