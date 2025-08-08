// app/page.js
"use client";

import Analyzer from "@/components/Analyzer";
import GlowingOutput from "@/components/results/GlowingOutput";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Analyzer />
      <GlowingOutput />
    </>
  );
}
