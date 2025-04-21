"use client";
import { GlowingEffect } from "@/components/results/glowing-effect";
import { FileText, Gavel, Flame, Shield, BadgeAlert } from "lucide-react";

const GridItem = ({ area, icon, title, description }) => (
  <li className={`min-h-[14rem] list-none ${area}`}>
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex flex-col justify-between h-full p-6 gap-6 overflow-hidden rounded-xl dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="w-fit rounded-lg border border-gray-600 p-2">
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-black dark:text-white">{title}</h3>
          <p className="text-sm text-black dark:text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  </li>
);

export default function GlowingOutput({ result }) {
  if (!result) return null;

  const {
    summary,
    scores = {},
    aggressive_language = [],
    suspicious_flags = [],
    risk_level,
    recommendation
  } = result;

  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<FileText className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Summary"
        description={summary || "No summary available."}
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
        icon={<Shield className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Privacy Score"
        description={scores?.privacy?.comment || "No details available."}
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]"
        icon={<Gavel className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Suspicious Clauses"
        description={
          suspicious_flags.length
            ? suspicious_flags.map(f => `${f.issue}: "${f.clause}"`).join("\n\n")
            : "None flagged"
        }
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]"
        icon={<Flame className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Aggressive Language"
        description={aggressive_language.length ? aggressive_language.join(", ") : "None"}
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/5/3/13]"
        icon={<BadgeAlert className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={`Final Verdict: ${risk_level || "Unknown"}`}
        description={recommendation || "No recommendation available."}
      />
    </ul>
  );
}
