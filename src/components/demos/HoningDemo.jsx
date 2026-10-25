import { useState } from "react";
import { guardBullet } from "../../lib/mechanisms";

// The master bullet is a real line from my own résumé.
const MASTER =
  "Built a provider-agnostic LLM gateway (OpenAI, Anthropic, Google) with model fallback and AES-256-GCM encryption of user-supplied API keys.";
const GAP_SKILLS = ["Kubernetes", "LangChain"];

const REWRITES = [
  {
    id: "faithful",
    label: "Rephrased for the role",
    text: "Designed an LLM gateway that works across OpenAI, Anthropic and Google, with model fallback and AES-256-GCM encryption for user API keys.",
  },
  {
    id: "metric",
    label: "Adds a metric",
    text: "Built a provider-agnostic LLM gateway with model fallback, cutting inference costs by 40% and encrypting user API keys with AES-256-GCM.",
  },
  {
    id: "skill",
    label: "Adds a skill",
    text: "Built a provider-agnostic LLM gateway on Kubernetes with model fallback and AES-256-GCM encryption of user-supplied API keys.",
  },
];

function Highlighted({ text, token }) {
  if (!token) return text;
  const i = text.toLowerCase().indexOf(token.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + token.length)}</mark>
      {text.slice(i + token.length)}
    </>
  );
}

export default function HoningDemo() {
  const [pick, setPick] = useState("metric");
  const rewrite = REWRITES.find((r) => r.id === pick);
  const result = guardBullet(MASTER, rewrite.text, GAP_SKILLS);

  return (
    <div className="demo" data-demo>
      <div className="demo__bar">
        <span className="demo__title">Tailoring guard</span>
        <span className="demo__src">guard.ts · applyGuard()</span>
      </div>
      <div className="demo__body">
        <div className="diff">
          <div className="diff__col">
            <p className="mono-label">Master résumé</p>
            <p>{MASTER}</p>
          </div>
          <div className={`diff__col ${result.kept ? "is-kept" : "is-dropped"}`}>
            <p className="mono-label">Model proposes</p>
            <p>
              <Highlighted text={rewrite.text} token={result.token} />
            </p>
          </div>
        </div>
        <div className="chips" role="radiogroup" aria-label="Model rewrite">
          {REWRITES.map((r) => (
            <button
              key={r.id}
              role="radio"
              aria-checked={pick === r.id}
              className={`chip ${pick === r.id ? "is-on" : ""}`}
              onClick={() => setPick(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className={`verdict ${result.kept ? "verdict--pass" : "verdict--fail"}`} aria-live="polite">
          <span className="mono-label">{result.kept ? "Patch kept" : `Dropped · ${result.kind}`}</span>
          {result.detail} {result.kept ? "" : "The original bullet is used instead."}
        </p>
        <p className="demo__hint">The job asks for: {GAP_SKILLS.join(", ")}.</p>
      </div>
      <p className="demo__note">Same number pattern and term matching as the production guard.</p>
    </div>
  );
}
