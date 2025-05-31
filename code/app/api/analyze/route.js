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
  You are a legal policy analyzer AI. Analyze the following Terms and Conditions and return ONLY a valid JSON object with the structure below. Be direct, critical, and professional.

  Required JSON fields:

  1. "summary": 2–3 sentence overview of the agreement.
  2. "scores": Rate 1 (Very Risky) to 5 (Safe) for each topic. Also provide a short explanation for each score:
      - privacy
      - data_sharing
      - cancellation
      - user_rights
      - amendments
  3. "suspicious_flags": A list of concerning clauses in the following format:
      - "issue": Brief label of the concern
      - "clause": Exact sentence or excerpt from the T&C
    Include items related to:
      - vague or sweeping permissions
      - unclear data retention
      - broad liability waivers
      - aggressive or one-sided terms
  4. "aggressive_language": List of phrases like "perpetual", "non-revocable", "sole discretion", etc.
  5. "clarity_score": A JSON object with:
      - "score": integer (1 to 5)
      - "comment": One-line explanation of how readable/understandable the agreement is
  6. "risk_level": One of: Low, Medium, High
  7. "recommendation": One-line conclusion like "Safe to accept", "Proceed with caution", or "Seek legal advice"

  ---

  Example:

  {
    "summary": "The agreement grants the platform wide rights over user data and content. It includes automatic renewals and liability waivers.",
    "scores": {
      "privacy": { "score": 2, "comment": "User data is collected and shared with third parties with limited user control." },
      "data_sharing": { "score": 2, "comment": "No opt-out provided for partner data sharing." },
      "cancellation": { "score": 3, "comment": "Account deletion is allowed but with retained data for up to 180 days." },
      "user_rights": { "score": 3, "comment": "Users retain content ownership, but grant broad licenses." },
      "amendments": { "score": 2, "comment": "The platform can modify terms unilaterally without prior notice." }
    },
    "suspicious_flags": [
      {
        "issue": "Unilateral amendments",
        "clause": "We may update these terms at any time without notifying users."
      },
      {
        "issue": "Broad data sharing",
        "clause": "We may share your information with selected partners and affiliates."
      }
    ],
    "aggressive_language": ["perpetual", "non-revocable", "sole discretion"],
    "clarity_score": {
      "score": 3,
      "comment": "Some clauses are complex and filled with legal jargon."
    },
    "risk_level": "Medium",
    "recommendation": "Proceed with caution"
  }

  ---

  Now, analyze the following Terms and Conditions and return only the JSON object in the exact format above.  
  Do not include any explanations, markdown, or introductory sentences. Respond with valid JSON only.

  Your "risk_level" must be one of: Low, Medium, High  
  Choose the matching "recommendation":  
  • Low  → "Safe to accept"  
  • Medium → "Proceed with caution"  
  • High → "Seek legal advice"  
  Return only the JSON object—no extra text.


⚠️ Important Instructions:
- Respond with a **single valid JSON object** only.
- Do NOT wrap your response in markdown or triple backticks.
- Do NOT include any explanation, labels, or extra text.
- Do NOT nest the JSON inside another object (e.g., inside "summary").
- Output must start with { and end with }.


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
