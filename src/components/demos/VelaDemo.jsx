import { useEffect, useMemo, useState } from "react";
import { GATE_CHECKS, evaluateExperience, learnerState } from "../../lib/mechanisms";

// Illustrative inputs. The checks themselves are a direct port of the gate.
const SOURCE =
  "Spaced repetition is a learning technique in which reviews of material are spread out over increasing intervals of time. Each successful recall makes the memory more durable, so the next review can wait longer.";

const base = {
  quote: "reviews of material are spread out over increasing intervals of time",
  spark: { question: "Why does cramming fade faster than studying a little each day?" },
  insight: {
    summary: "Memories strengthen when recall is spaced out. Each successful review lets the next one wait longer.",
    takeaways: ["Spread reviews over growing intervals.", "A successful recall earns a longer gap."],
  },
  interaction: {
    prompt: "After a correct recall, should the next review come sooner or later?",
    options: [{ id: "a", text: "Sooner" }, { id: "b", text: "Later" }],
    correctOptionId: "b",
  },
};

const CANDIDATES = [
  { id: "ok", label: "Grounded draft", card: base },
  {
    id: "quote",
    label: "Paraphrased quote",
    card: { ...base, quote: "reviews should be spaced further apart over time" },
  },
  {
    id: "long",
    label: "Rambling question",
    card: {
      ...base,
      spark: {
        question:
          "Have you ever wondered why the facts you crammed the night before an exam seem to vanish almost completely within a few days?",
      },
    },
  },
  {
    id: "filler",
    label: "Filler phrasing",
    card: {
      ...base,
      insight: { ...base.insight, summary: "It is important to note that memories strengthen when recall is spaced out." },
    },
  },
];

function Gate() {
  const [pick, setPick] = useState("ok");
  const [shown, setShown] = useState(GATE_CHECKS.length);
  const candidate = CANDIDATES.find((c) => c.id === pick);
  const result = useMemo(
    () => evaluateExperience(candidate.card, SOURCE, candidate.card.quote),
    [candidate],
  );

  // Step the checks in one at a time so the decision reads as a sequence.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(GATE_CHECKS.length);
      return undefined;
    }
    setShown(0);
    const id = setInterval(() => setShown((n) => (n >= GATE_CHECKS.length ? n : n + 1)), 110);
    return () => clearInterval(id);
  }, [pick]);

  const stop = result.passed ? GATE_CHECKS.length : result.failedAt;

  return (
    <div className="demo__body">
      <div className="chips" role="radiogroup" aria-label="Candidate lesson">
        {CANDIDATES.map((c) => (
          <button
            key={c.id}
            role="radio"
            aria-checked={pick === c.id}
            className={`chip ${pick === c.id ? "is-on" : ""}`}
            onClick={() => setPick(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="card-preview">
        <p className="mono-label">Spark</p>
        <p className="card-preview__q">{candidate.card.spark.question}</p>
        <p className="mono-label">Quoted from source</p>
        <p className="card-preview__quote">“{candidate.card.quote}”</p>
      </div>

      <ol className="checks">
        {GATE_CHECKS.map((label, i) => {
          let st = "wait";
          if (i < shown) st = i < stop ? "pass" : i === stop ? "fail" : "skip";
          return (
            <li key={label} className={`check check--${st}`}>
              <span className="check__mark" aria-hidden="true">
                {st === "pass" ? "✓" : st === "fail" ? "✕" : "·"}
              </span>
              <span>{label}</span>
              <span className="sr-only">
                {st === "pass" ? " passed" : st === "fail" ? " failed" : st === "skip" ? " not reached" : ""}
              </span>
            </li>
          );
        })}
      </ol>

      <p className={`verdict ${result.passed ? "verdict--pass" : "verdict--fail"}`} aria-live="polite">
        <span className="mono-label">{result.passed ? "Published" : "Rejected"} · score {result.score}</span>
        {result.reason}
      </p>
    </div>
  );
}

function Memory() {
  const [events, setEvents] = useState(["correct"]);
  const s = learnerState(events);
  const add = (type) => setEvents((e) => [...e, type].slice(-12));

  return (
    <div className="demo__body">
      <p className="demo__hint">Answer a review card and watch the schedule respond.</p>
      <div className="chips">
        <button className="chip chip--pass" onClick={() => add("correct")}>Recalled it</button>
        <button className="chip chip--fail" onClick={() => add("incorrect")}>Missed it</button>
        <button className="chip" onClick={() => add("skip")}>Skipped</button>
        <button className="chip chip--ghost" onClick={() => setEvents([])}>Reset</button>
      </div>

      <ol className="events" aria-label="Event history">
        {events.length === 0 && <li className="events__empty">No events yet</li>}
        {events.map((e, i) => (
          <li key={i} className={`event event--${e}`} title={e}>
            {e === "correct" ? "✓" : e === "incorrect" ? "✕" : "–"}
          </li>
        ))}
      </ol>

      <dl className="readout" aria-live="polite">
        <div>
          <dt>Next review</dt>
          <dd>{s.interval === 0 ? (events.length ? "now" : "–") : `in ${s.interval} day${s.interval === 1 ? "" : "s"}`}</dd>
        </div>
        <div>
          <dt>Streak of recalls</dt>
          <dd>{s.consecutive}</dd>
        </div>
        <div>
          <dt>Lapses</dt>
          <dd>{s.lapses}</dd>
        </div>
      </dl>
      <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={1} aria-valuenow={s.mastery} aria-label="Mastery">
        <span className="meter__fill" style={{ transform: `scaleX(${s.mastery})` }} />
        <span className="meter__label">Mastery {Math.round(s.mastery * 100)}%</span>
      </div>
    </div>
  );
}

export default function VelaDemo() {
  const [tab, setTab] = useState("gate");
  return (
    <div className="demo" data-demo>
      <div className="demo__bar">
        <div className="tabs" role="tablist" aria-label="Vela mechanisms">
          <button role="tab" aria-selected={tab === "gate"} className="tab" onClick={() => setTab("gate")}>
            Quality gate
          </button>
          <button role="tab" aria-selected={tab === "memory"} className="tab" onClick={() => setTab("memory")}>
            Spaced recall
          </button>
        </div>
        <span className="demo__src">{tab === "gate" ? "quality_gate.py" : "learner_state.py"}</span>
      </div>
      <div role="tabpanel">{tab === "gate" ? <Gate /> : <Memory />}</div>
      <p className="demo__note">Sample lesson text. The logic is ported line for line from the engine.</p>
    </div>
  );
}
