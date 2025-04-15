"use client"
import React from "react"
import { cn } from "@/lib/utils"

/**
 * DotBackground
 * A full-page fixed overlay of dots that stays in place on scroll.
 */
export function DotBackground() {
  return (
    <div
      className={cn(
        // Let it cover the entire viewport, behind everything
        "pointer-events-none fixed inset-0 z-0",
        // Use Tailwind or arbitrary property for the dot pattern
        "bg-fixed bg-center [background-size:20px_20px]",
        // Light theme dots vs. dark theme dots
        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
      )}
    />
  )
}
