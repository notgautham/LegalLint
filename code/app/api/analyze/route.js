// app/api/analyze/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  // 🚩 1  Get user text
  const { text } = await req.json();
  if (!text || text.trim().length < 50) {
    return NextResponse.json({ error: "Text is too short or empty." }, { status: 400 });
  }

  // 🚩 2  Ensure API key
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({ error: "OpenRouter API key missing." }, { status: 500 });
  }

  // 🚩 3  Prompt (ends with strict JSON-only instruction)
  const prompt = `
You are a legal policy analyzer AI. Analyze the following Terms and Conditions and return a JSON object with:

1. "summary": 2–3 sentence overview of the agreement.
2. "scores": Rate 1 (Very Risky) to 5 (Safe), and explain:
    - privacy
    - data_sharing
    - cancellation
    - user_rights
    - amendments
3. "suspicious_flags": List of objects with:
    - "issue": name of the concern
    - "clause": exact sentence/quote from the T&C
4. "aggressive_language": Legal terms like "perpetual", "non-revocable", "sole discretion"
5. "clarity_score": Rate 1–5 and comment on readability for an average user
6. "risk_level": One of: Low, Medium, High
7. "recommendation": 1-line advice like "Safe to accept", "Proceed with caution", or "Seek legal advice"

Strictly return **only** valid JSON in this exact structure—no explanations, markdown, or back-ticks.

T&C Document:
"""${text}"""
`;

  try {
    // 🚩 4  Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",   // set prod URL if deployed
        "X-Title": "LegalLint"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct", // free, reliable model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 800                              // stay within free tier
      })
    });

    // 🚩 5  Upstream error handling
    if (!response.ok) {
      const upstream = await response.text();
      console.error("OpenRouter error:", response.status, upstream);
      return NextResponse.json(
        { error: `Upstream ${response.status}`, detail: upstream },
        { status: 502 }
      );
    }

    // 🚩 6  Primary parse
    const { choices } = await response.json();
    const content = choices?.[0]?.message?.content || "";

    let parsed;
    try {
      // a) remove ```json … ``` wrappers if present
      let cleaned = content
        .replace(/^.*?```json\s*/is, "")
        .replace(/```$/s, "")
        .trim();

      // b) first parse
      parsed = JSON.parse(cleaned);

      // c) handle nested JSON-as-string (e.g., { summary: "{ ... }" })
      if (
        typeof parsed === "object" &&
        typeof parsed.summary === "string" &&
        parsed.summary.trim().startsWith("{")
      ) {
        parsed = JSON.parse(parsed.summary);
      }
    } catch (err) {
      console.warn("⚠️ Could not parse JSON, returning raw:", content);
      parsed = { summary: content };          // fallback so UI never breaks
    }

    // 🚩 7  Return to frontend
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Failed to process document." }, { status: 500 });
  }
}
