"use client";
import { GlowingEffect } from "@/components/results/glowing-effect";
import {
  FileText,
  Flame,
  Shield,
  AlertTriangle,
  BadgeAlert,
  AlertCircle
} from "lucide-react";

/* ---------- generic CardShell (hover glow + slight scale) ---------- */
const CardShell = ({ children, accentClass = "", className = "" }) => (
  <div
    className={`relative rounded-2xl border p-2 md:rounded-3xl md:p-3 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/20 ${accentClass} ${className}`}
  >
    <GlowingEffect spread={40} glow disabled={false} proximity={64} />
    <div className="relative flex flex-col h-full p-6 gap-4 overflow-auto">
      {children}
    </div>
  </div>
);

/* ---------- Risk‐Score Bar ---------- */
const ScoreBar = ({ label, obj }) => {
  if (!obj) return null;
  const pct = Math.max(1, Math.min(5, obj.score)) * 20;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-neutral-100">{label}</span>
        <span className="text-sm font-medium text-neutral-300">
          {obj.score}/5
        </span>
      </div>
      <div className="w-full h-2 rounded bg-neutral-800">
        <div
          className="h-full rounded bg-violet-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* ⬇ bigger, clearer comment */}
      <p className="text-sm leading-snug text-neutral-300">{obj.comment}</p>
    </div>
  );
};

/* ---------- Verdict Color Map ---------- */
const verdictAccent = {
  Low: "bg-gradient-to-br from-green-600/20 to-green-900/10 border-green-700",
  Medium:
    "bg-gradient-to-br from-yellow-600/20 to-yellow-900/10 border-yellow-700",
  High: "bg-gradient-to-br from-red-600/20 to-red-900/10 border-red-700",
};

export default function GlowingOutput({ result }) {
  if (!result) return null;

  const {
    summary = "—",
    scores = {},
    aggressive_language = [],
    suspicious_flags = [],
    risk_level = "Unknown",
    recommendation = "—",
    clarity_score,
  } = result;

  const aggText =
    aggressive_language.length > 0
      ? aggressive_language.join(", ")
      : "None detected";

  return (
    <div className="w-[41%] max-w-6xl mx-auto pb-20">
      <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
        {/* ------- All Risk Scores (spans 3 columns) ------- */}
        <li className="lg:col-span-3">
          <CardShell>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-violet-400" />
              <h3 className="text-2xl font-bold text-white">All Risk Scores</h3>
            </div>
            <div className="mt-4 space-y-6">
              <ScoreBar label="Privacy" obj={scores.privacy} />
              <ScoreBar label="Data Sharing" obj={scores.data_sharing} />
              <ScoreBar label="Cancellation" obj={scores.cancellation} />
              <ScoreBar label="User Rights" obj={scores.user_rights} />
              <ScoreBar label="Amendments" obj={scores.amendments} />
              {clarity_score && <ScoreBar label="Clarity" obj={clarity_score} />}
            </div>
          </CardShell>
        </li>

        {/* ------- Left column: Aggressive + Summary ------- */}
        <li className="sm:col-span-2 lg:col-span-1 flex h-full">
          <div className="flex flex-col w-full h-full gap-5">
            {/* Aggressive Language */}
            <CardShell className="flex-1">
              <div className="flex items-center gap-3">
                <Flame className="h-5 w-5 text-neutral-200" />
                <h3 className="text-xl font-semibold text-white">
                  Aggressive Language
                </h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-neutral-300 flex-1">
                {aggText}
              </p>
            </CardShell>

            {/* Summary */}
            <CardShell className="flex-1">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-neutral-200" />
                <h3 className="text-xl font-semibold text-white">Summary</h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-neutral-300 flex-1">
                {summary}
              </p>
            </CardShell>
          </div>
        </li>

        {/* ------- Suspicious Clauses (spans 2) ------- */}
        <li className="sm:col-span-2 lg:col-span-2">
          <CardShell className="h-full">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">
                Suspicious Clauses
              </h3>
            </div>

            <ul className="mt-4 space-y-5 text-base leading-relaxed text-neutral-300">
              {suspicious_flags.length ? (
                suspicious_flags.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="mt-1 h-4 w-4 text-yellow-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white">{f.issue}:</span>{" "}
                      <span className="italic text-violet-300">“{f.clause}”</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2">
                  <AlertCircle className="mt-1 h-4 w-4 text-neutral-500 shrink-0" />
                  <span>No suspicious clauses flagged.</span>
                </li>
              )}
            </ul>
          </CardShell>
        </li>

        {/* ------- Final Verdict ------- */}
        <li className="lg:col-span-3">
          <CardShell
            accentClass={verdictAccent[risk_level] || verdictAccent.Medium}
          >
            <div className="flex items-center gap-3">
              <BadgeAlert className="h-6 w-6 text-current" />
              <h3 className="text-2xl font-bold text-current">
                Final Verdict:&nbsp;
                <span className="capitalize">{risk_level}</span>
              </h3>
            </div>
            <p className="text-lg text-current">{recommendation}</p>
          </CardShell>
        </li>
      </ul>
    </div>
  );
}
