// Browser ports of the mechanisms the project demos run. They follow the
// original code line for line so that what a visitor sees is what ships.

/* ---------- Vela · engine/flow/quality_gate.py ---------- */

const BANNED_FILLER = [
  /\bin conclusion\b/,
  /\bit is important to note\b/,
  /\bas we know\b/,
  /\bin this card\b/,
  /\blet's explore\b/,
  /\bdive deep\b/,
];

const words = (s) => s.split(/\s+/).filter(Boolean).length;

export const GATE_CHECKS = [
  "Provenance: quote appears verbatim in the source",
  "Spark question is 18 words or fewer",
  "Whole card is 85 words or fewer",
  "No filler phrases",
  "Two or three takeaways",
  "Recall prompt is a question with a valid answer",
];

/** Returns { passed, score, reason, failedAt } where failedAt is a GATE_CHECKS index or -1. */
export function evaluateExperience(payload, rawSourceText, originalQuote) {
  const fail = (failedAt, score, reason) => ({ passed: false, score, reason, failedAt });

  if (!originalQuote || !rawSourceText.includes(originalQuote)) {
    return fail(0, 0, "Provenance failed: original_quote not found in source text.");
  }

  const { spark = {}, interaction = {}, insight = {} } = payload;

  const sparkQuestion = spark.question ?? "";
  const sparkWords = words(sparkQuestion);
  if (sparkWords > 18) {
    return fail(1, 40, `Spark question too verbose (${sparkWords} words, max 18).`);
  }

  const summary = insight.summary ?? "";
  const takeaways = insight.takeaways ?? [];
  const totalWords = sparkWords + words(summary) + takeaways.reduce((n, t) => n + words(t), 0);
  if (totalWords > 85) {
    return fail(2, 50, `Total experience text too long (${totalWords} words, max 85).`);
  }

  const allText = `${sparkQuestion} ${summary} ${takeaways.join(" ")}`.toLowerCase();
  const filler = BANNED_FILLER.find((re) => re.test(allText));
  if (filler) {
    return fail(3, 60, `Banned filler phrase matched: ${filler.source}`);
  }

  if (takeaways.length !== 2 && takeaways.length !== 3) {
    return fail(4, 70, `Takeaways must have 2 or 3 bullet points (found ${takeaways.length}).`);
  }

  if (interaction && Object.keys(interaction).length) {
    if (!(interaction.prompt ?? "").trim().endsWith("?")) {
      return fail(5, 75, "Interaction prompt must end with a question mark '?'.");
    }
    const ids = (interaction.options ?? []).map((o) => o.id);
    if (!ids.includes(interaction.correctOptionId)) {
      return fail(5, 80, `correctOptionId '${interaction.correctOptionId}' not found in options.`);
    }
  }

  return { passed: true, score: 95, reason: "Passed all deterministic quality checks.", failedAt: -1 };
}

/* ---------- Vela · engine/flow/learner_state.py ---------- */

export function learnerState(events) {
  let consecutive = 0;
  let correct = 0;
  let lapses = 0;
  let interval = 0;
  for (const type of events) {
    if (type === "correct") {
      correct += 1;
      consecutive += 1;
      if (consecutive === 1) interval = 1;
      else if (consecutive === 2) interval = 3;
      else if (consecutive === 3) interval = 7;
      else interval *= 2;
    } else if (type === "incorrect") {
      consecutive = 0;
      lapses += 1;
      interval = 0;
    }
    // "skip" counts as exposure without touching memory progress.
  }
  const mastery = Math.min(1, Math.round(consecutive * 0.34 * 100) / 100);
  return { exposures: events.length, correct, consecutive, lapses, interval, mastery };
}

/* ---------- Solum Trade OS · app.event_hash() ---------- */

export const GENESIS = "0".repeat(64);

export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// prev_hash || '\n' || jsonb_build_object(...)::text, hashed with sha256.
export function eventMessage(prevHash, e) {
  return `${prevHash}\n${JSON.stringify({ id: e.id, type: e.type, payload: e.payload })}`;
}

/** Inserts events through the chaining trigger: each one gets prev_hash and hash. */
export async function buildChain(events) {
  const out = [];
  let prev = GENESIS;
  for (const e of events) {
    const hash = await sha256Hex(eventMessage(prev, e));
    out.push({ ...e, prevHash: prev, hash });
    prev = hash;
  }
  return out;
}

/** Walks the chain like the SQL verification: index of the first row whose hash no longer matches, or -1. */
export async function verifyChain(rows) {
  let prev = GENESIS;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (r.prevHash !== prev) return i;
    if ((await sha256Hex(eventMessage(r.prevHash, r))) !== r.hash) return i;
    prev = r.hash;
  }
  return -1;
}

/* ---------- Honing · src/lib/tailoring/guard.ts ---------- */

const NUMBER_PATTERN = /\d+(?:[.,]\d+)*\s?(?:%|[kmbx]\b)?/gi;

export function numbersIn(text) {
  return new Set((text.match(NUMBER_PATTERN) ?? []).map((t) => t.replace(/[\s,]/g, "").toLowerCase()));
}

export function containsTerm(haystack, term) {
  const escaped = term.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!escaped) return false;
  return new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`).test(haystack.toLowerCase());
}

/** Checks one rewritten bullet against its original, as the guard does. */
export function guardBullet(original, rewrite, gapSkills) {
  const allowed = numbersIn(original);
  const newNumber = [...numbersIn(rewrite)].find((n) => !allowed.has(n));
  if (newNumber) {
    return { kept: false, kind: "unearned_number", token: newNumber, detail: `"${newNumber}" does not appear in the original bullet.` };
  }
  const unearned = gapSkills.filter((s) => !containsTerm(original, s));
  const skill = unearned.find((s) => containsTerm(rewrite, s));
  if (skill) {
    return { kept: false, kind: "unearned_skill", token: skill, detail: `"${skill}" is a gap skill the master résumé never claims.` };
  }
  return { kept: true, kind: null, token: null, detail: "Every number and skill traces back to the original." };
}
