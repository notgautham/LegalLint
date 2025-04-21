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
You are a legal policy analyzer AI. Your job is to read Terms and Conditions and return a JSON object with:

1. "summary": Concise summary of the agreement (2-3 lines).
2. "scores": Rate each category from 1 (Very Risky) to 5 (Safe), with a short explanation for each:
    - privacy
    - data_sharing
    - cancellation
    - user_rights
    - amendments
3. "suspicious_flags": List of risky or aggressive clauses (e.g., "no refunds", "we may share your data with third parties").
4. "aggressive_language": Legal phrases that imply power imbalance or lack of consent (e.g., "non-revocable", "perpetual").
5. "risk_level": One of: Low, Medium, High — based on the lowest scoring categories.
6. "recommendation": One line advice to the user: ("Safe to accept", "Proceed with caution", "Seek legal help").

Return ONLY a valid JSON in this format:

{
  "summary": "string",
  "scores": {
    "privacy": { "score": 4, "comment": "..." },
    "data_sharing": { "score": 3, "comment": "..." },
    "cancellation": { "score": 2, "comment": "..." },
    "user_rights": { "score": 1, "comment": "..." },
    "amendments": { "score": 3, "comment": "..." }
  },
  "suspicious_flags": ["...", "..."],
  "aggressive_language": ["...", "..."],
  "risk_level": "Medium",
  "recommendation": "Proceed with caution"
}

Now analyze the following T&C and return only that JSON:

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
