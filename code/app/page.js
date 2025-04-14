"use client";

import Header from "@/components/Header";
import InputForm from "@/components/InputForm";

export default function Page() {
  const handleAnalyze = ({ company, terms }) => {
    console.log({ company, terms });
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
      <Header />
      <InputForm onSubmit={handleAnalyze} />
    </div>
  );
}
