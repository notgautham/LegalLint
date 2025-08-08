<h1 align="center">LegalLint</h1>
<h3 align="center">AI-Powered Analyzer for Legal Terms & Conditions</h3>

<br>

> 📜 In a world where Terms & Conditions are often ignored, **LegalLint** makes legal agreements readable, transparent, and safe.

LegalLint is an intelligent web application that **analyzes and summarizes Terms & Conditions documents using AI**.  
By leveraging the power of **Large Language Models**, it detects **legal risks, vague clauses, aggressive terms, and user-unfriendly language** — all within seconds.

Whether you're signing up for a service or reviewing a license, **LegalLint helps you understand what you're really agreeing to.**

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


## 🔧 Key Features

- 📑 **Legal T&C Summarization**
  - Automatically condenses long Terms into a 2–3 sentence summary

- 🔍 **Risk Scoring System**
  - Rates privacy, cancellation, data sharing, and user rights from 1 (Very Risky) to 5 (Safe)

- 🚩 **Suspicious Flag Detection**
  - Extracts and highlights clauses with potential legal risk or vagueness

- 🧠 **LLM-Powered Verdicts**
  - Uses OpenRouter-hosted models (e.g., Dolphin/Gemini) to generate insights

- 🎯 **Clarity Score**
  - Evaluates how readable the agreement is for a non-lawyer

- 🖥️ **Smooth, Interactive UI**
  - Framer Motion animations, dark theme, clipboard paste support, and live results

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


## ⚙️ Built With

#### 💻 Frontend  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-ffffff?style=for-the-badge&logo=framer&logoColor=black)

#### 🧠 AI Model Integration  
![OpenRouter](https://img.shields.io/badge/OpenRouter_API-4285F4?style=for-the-badge&logo=openai&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_LLM-34A853?style=for-the-badge&logo=google)
![Dolphin](https://img.shields.io/badge/Dolphin_Model-FFB400?style=for-the-badge&logo=brain)

#### 🧩 Tools & Config  
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier)

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


## 🧠 AI Output Format

LegalLint returns structured, readable JSON that captures the essence of the legal document.  
Here is an example of the format:

```json
{
  "summary": "The agreement grants the service broad rights to data collection and content usage.",
  "scores": {
    "privacy": { "score": 2, "comment": "User data may be shared without explicit consent." },
    "data_sharing": { "score": 3, "comment": "Data is shared with third parties." },
    "cancellation": { "score": 4, "comment": "User may cancel at any time." },
    "user_rights": { "score": 3, "comment": "Limited user recourse in disputes." },
    "amendments": { "score": 2, "comment": "Terms can change without notice." }
  },
  "suspicious_flags": [
    {
      "issue": "Perpetual license",
      "clause": "We reserve the right to use your content perpetually..."
    }
  ],
  "aggressive_language": ["perpetual", "non-revocable", "sole discretion"],
  "clarity_score": {
    "score": 2,
    "comment": "Heavy use of legal jargon and long-winded clauses."
  },
  "risk_level": "Medium",
  "recommendation": "Proceed with caution"
}

```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">



## 🖼️ Demo

<img src="images/demo.gif">

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


## 📦 Installation & Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/legallint.git
cd legallint
````

### 2. Install dependencies

```bash
npm install
```

### 3. Add your OpenRouter API key

Create a `.env.local` file in the root:

```
OPENROUTER_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app locally.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


## 📊 Example Use Case



> **Scenario**: You're about to accept the Terms of a new mobile app but want to ensure it’s safe.

1. Open **LegalLint** in your browser
2. Paste the Terms & Conditions text into the textarea
3. Click **Analyze**
4. Get a structured summary, red-flag clauses, and clarity rating
5. Make an informed decision — instantly

Whether you’re a casual user, developer, or legal researcher, LegalLint empowers you to understand what you're signing.


<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">