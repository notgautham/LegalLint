// app/api/analyze/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { text } = await req.json();

  if (!text || text.trim().length < 50) {
    return NextResponse.json({ error: "Text is too short or empty." }, { status: 400 });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({ error: "OpenRouter API key missing." }, { status: 500 });
  }

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
  5. "clarity_score": Rate 1–5 and comment on how readable and understandable the T&C is for an average user
  6. "risk_level": One of: Low, Medium, High
  7. "recommendation": 1-line advice like "Safe to accept", "Proceed with caution", or "Seek legal advice"

  Strictly return only valid JSON in this format:

  {
    "summary": "...",
    "scores": {
      "privacy": { "score": 4, "comment": "..." },
      ...
    },
    "suspicious_flags": [
      {
        "issue": "...",
        "clause": "..."
      }
    ],
    "aggressive_language": ["...", "..."],
    "clarity_score": {
      "score": 4,
      "comment": "..."
    },
    "risk_level": "Medium",
    "recommendation": "..."
  }

  Now analyze the following T&C and return only that JSON.

  T&C Document:
  """${text}"""
`;


  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "cognitivecomputations/dolphin-mixtral-8x7b", // change if needed
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.warn("Could not parse JSON, returning raw:", content);
      parsed = { summary: content }; // fallback
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("OpenRouter API error:", err);
    return NextResponse.json({ error: "Failed to process document." }, { status: 500 });
  }
}
