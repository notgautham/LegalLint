"use client";
import { GlowingEffect } from "@/components/results/glowing-effect";
import {
  FileText,
  Shield,
  Share2,
  UserCheck,
  Flame,
  AlertTriangle,
  BadgeAlert,
} from "lucide-react";

/* ---------- shared card ------------ */
const Card = ({ icon, title, description }) => (
  <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
    <GlowingEffect
      spread={40}
      glow
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
    />
    <div className="relative flex flex-col justify-between h-full p-6 gap-6 overflow-hidden rounded-xl dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
      <div className="w-fit rounded-lg border border-gray-600 p-2">{icon}</div>
      <div className="space-y-3 whitespace-pre-wrap break-words">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-black dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  </div>
);

/* ---------- main component ---------- */
export default function GlowingOutput({ result }) {
  if (!result) return null;

  const {
    summary,
    scores = {},
    aggressive_language = [],
    suspicious_flags = [],
    risk_level,
    recommendation,
    clarity_score,
  } = result;

  /* helper pretty printers */
  const listAggressive = aggressive_language.join(", ") || "None";
  const listSuspicious = suspicious_flags.length
    ? suspicious_flags
        .map((f) => `${f.issue}: “${f.clause}”`)
        .join("\n\n")
    : "None flagged";

  const renderScoreLine = (label, obj) =>
    obj ? `${label}: ${obj.score}/5 — ${obj.comment}` : null;

  const scoreLines = [
    renderScoreLine("Privacy", scores.privacy),
    renderScoreLine("Data Sharing", scores.data_sharing),
    renderScoreLine("Cancellation", scores.cancellation),
    renderScoreLine("User Rights", scores.user_rights),
    renderScoreLine("Amendments", scores.amendments),
    clarity_score
      ? `Clarity: ${clarity_score.score}/5 — ${clarity_score.comment}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="w-full max-w-6xl">
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        <li>
          <Card
            icon={<FileText className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Summary"
            description={summary}
          />
        </li>

        <li>
          <Card
            icon={<Shield className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="All Risk Scores"
            description={scoreLines}
          />
        </li>

        <li className="sm:col-span-2 lg:col-span-1">
          <Card
            icon={<Share2 className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Aggressive Language"
            description={listAggressive}
          />
        </li>

        <li className="lg:col-span-2">
          <Card
            icon={<AlertTriangle className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Suspicious Clauses"
            description={listSuspicious}
          />
        </li>

        <li>
          <Card
            icon={<BadgeAlert className="h-4 w-4 text-black dark:text-neutral-400" />}
            title={`Final Verdict: ${risk_level ?? "Unknown"}`}
            description={recommendation || "No recommendation."}
          />
        </li>
      </ul>
    </div>
  );
}
