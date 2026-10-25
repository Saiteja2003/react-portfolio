// Every claim on the site lives here, next to where it can be checked.
// "src" paths point into the project's own repository; "verified" notes record
// checks that were run, not just read.

export const person = {
  name: "Saiteja Challa",
  role: "Software engineer",
  location: "Koblenz, Germany",
  email: "challasaiteja26@gmail.com",
  github: "https://github.com/Saiteja2003",
  linkedin: "https://www.linkedin.com/in/saiteja-challa-124555228",
  intro:
    "Full-stack engineer and M.Sc. Web and Data Science student at the University of Koblenz. I build data pipelines, PostgreSQL schemas with row-level security, and LLM features that are held in check by deterministic gates and tests.",
};

export const principles = [
  {
    id: "drafts",
    title: "The model drafts. Code decides.",
    body: "A language model can propose a lesson or a résumé line. Whether it ships is decided by checks that run the same way every time.",
    code: `# Provenance check: verbatim quote presence in source text
if not original_quote or original_quote not in raw_source_text:
    return False, 0, "Provenance failed: ..."`,
    src: "vela-engine · engine/flow/quality_gate.py",
  },
  {
    id: "trace",
    title: "Nothing ships that can't be traced.",
    body: "Every rewritten sentence is checked against its own source. A number or a skill that isn't already there is dropped, and the original text stays.",
    code: `// The prompt asks the model not to invent anything;
// this code does not take its word for it.`,
    src: "Honing · src/lib/tailoring/guard.ts",
  },
  {
    id: "append",
    title: "History is append-only.",
    body: "Records that matter are never edited in place. Events are chained by hash, and the chain head is anchored outside the database every night.",
    code: `if tg_op <> 'INSERT' then
  raise exception 'events are append-only';
end if;`,
    src: "SolumOS · supabase/migrations/…_core.sql",
  },
];

export const projects = [
  {
    id: "vela",
    index: "01",
    name: "Vela",
    kind: "Personalized micro-learning platform",
    status: "In development · preview live",
    period: "07/2026 – now",
    line: "A learning engine where Gemini drafts short lessons and a deterministic gate decides which ones learners ever see.",
    demo: "vela",
    shot: { src: "images/vela.webp", w: 1910, h: 836, url: "vela-web-omega.vercel.app", alt: "Vela's stream screen showing a diagram of transport layers versus framing protocols, a group-the-items exercise, a daily goal of 2 of 5 completed and a one-day streak.", caption: "The Vela app: a card with a diagram, an active-recall exercise and the daily goal." },
    sections: [
      {
        h: "How it works",
        p: "A Python pipeline discovers sources (arXiv, OpenAlex, open educational resources, Wikipedia), extracts and verifies facts, and has Google Gemini draft short lessons. Generation runs offline, so the feed never waits on a live model call.",
      },
      {
        h: "Memory, not streaks",
        p: "Learner state lives in FastAPI and Supabase. Review intervals and mastery are recomputed from each learner's immutable event history: a correct recall moves the interval 1 → 3 → 7 days and then doubles it, a miss resets it, a skip counts as exposure without penalty.",
      },
      {
        h: "The app",
        p: "A Next.js progressive web app with Supabase auth, interactive SQL and code exercises, a CEFR German tutor that accepts spoken answers through the Web Speech API, and Sentry. Scheduled GitHub Actions run content generation and nightly cleanup of orphaned Cloudflare R2 assets.",
      },
    ],
    facts: [
      { k: "Quality checks before publishing", v: "6" },
      { k: "Live model calls in the feed", v: "0" },
    ],
    stack: ["Python", "FastAPI", "Pydantic", "Google Gemini", "Supabase", "Next.js", "Cloudflare R2", "GitHub Actions", "Sentry"],
    evidence: [
      "engine/flow/quality_gate.py",
      "engine/flow/learner_state.py",
      ".github/workflows/daily_flow_ingest.yml · ops-maintenance.yml",
    ],
    links: [{ label: "Open the preview", href: "https://vela-web-omega.vercel.app/" }],
    source: "private",
  },
  {
    id: "solum",
    index: "02",
    name: "Solum Trade OS",
    kind: "Operations system for an agri-export venture",
    status: "Built · trades simulated so far",
    period: "10/2026 – now",
    line: "The back office for an export venture in formation, designed so that its own records can be audited, including by me.",
    demo: "solum",
    sections: [
      {
        h: "A perimeter that can't be forgotten",
        p: "66 PostgreSQL tables across 18 Supabase migrations, with row-level security on every public table. An event trigger enables it on any newly created table, so a future migration can't quietly ship an open one.",
      },
      {
        h: "Tamper-evident history",
        p: "Business events are append-only and chained with SHA-256: each hash covers the previous hash plus the event. Updates, deletes and truncates raise exceptions. A nightly GitHub Actions job saves an encrypted backup and commits the chain head outside the database.",
      },
      {
        h: "Rules as tested code",
        p: "Money is integer arithmetic. Margin models, confidentiality-aware AI document extraction and checks that block unsupported figures are TypeScript modules with their own tests.",
      },
    ],
    facts: [
      { k: "Tables, all with row-level security", v: "66" },
      { k: "Tests passing (npm test, 25 Oct 2026)", v: "63/63" },
    ],
    stack: ["PostgreSQL", "Supabase", "TypeScript", "Next.js", "Cloudflare Workers", "Zod", "GitHub Actions"],
    evidence: [
      "supabase/migrations/…_rls_perimeter.sql (trg_ensure_rls)",
      "supabase/migrations/…_core.sql (app.event_hash)",
      ".github/workflows/backup.yml · anchors/",
    ],
    links: [],
    source: "private",
  },
  {
    id: "honing",
    index: "03",
    name: "Honing",
    kind: "AI-assisted job application workspace",
    status: "In development",
    period: "10/2026 – now",
    line: "A workspace that tailors a résumé to each job, where the AI may rephrase what you did but can never embellish it.",
    demo: "honing",
    shot: { src: "images/honing.webp", w: 1917, h: 780, url: "Honing · Dashboard", alt: "Honing's pipeline board with Saved, Applied, Interviewing, Rejected and Offer columns of job application cards, each with a match percentage.", caption: "The Honing pipeline: twelve applications on a Kanban board, each with a match score." },
    sections: [
      {
        h: "Patches, not rewrites",
        p: "The master résumé is immutable and append-only. Tailoring produces reviewable patches against it, and a guard discards any rewrite that adds a number, a skill or a sentence that can't be traced to the original.",
      },
      {
        h: "One gateway, any provider",
        p: "A provider-agnostic LLM gateway (OpenAI, Anthropic, Google) with model fallback. Users can bring their own API keys, which are encrypted with AES-256-GCM.",
      },
      {
        h: "The rest of the loop",
        p: "A browser clipper captures job postings and helps fill application forms, a Kanban board tracks every application, and an implementation audit classifies each capability as verified, partial, mocked or broken.",
      },
    ],
    facts: [
      { k: "Kinds of rejection in the guard", v: "8" },
      { k: "Tests passing (vitest, 25 Oct 2026)", v: "105/105" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Anthropic", "Gemini", "Zod", "Vitest", "Browser extension"],
    evidence: [
      "src/lib/tailoring/guard.ts",
      "src/lib/llm/gateway.ts · src/lib/llm/key-vault.ts",
      "docs/audit/HONING-IMPLEMENTATION-AUDIT.md",
    ],
    links: [],
    source: "private",
  },
  {
    id: "nexus",
    index: "04",
    name: "NexusReader",
    kind: "News reader and RSS aggregator",
    status: "Shipped · live",
    period: "2025",
    line: "A calm, three-pane reader that pulls your feeds into one place and can summarize an article on request.",
    demo: "nexus",
    sections: [
      {
        h: "Client and API",
        p: "A React and Vite client talks to an Express 5 API with JWT authentication and MongoDB through Mongoose. Feeds are parsed with rss-parser, and an authenticated endpoint summarizes articles with Google Gemini.",
      },
      {
        h: "Feeds that stay alive",
        p: "A scheduled GitHub Actions job sends a HEAD request to every curated feed with a five-second timeout, removes the dead ones and appends the run to a log in the repository.",
      },
    ],
    facts: [
      { k: "Panes: sources, list, article", v: "3" },
      { k: "Curated feeds at the last logged run", v: "12" },
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Gemini", "Supabase", "GitHub Actions"],
    evidence: ["api · routes/feeds.js · routes/ai.js", "client · scripts/updateFeeds.js · engine-log.txt"],
    image: "images/nexusreader.png",
    links: [
      { label: "Visit nexusreader.org", href: "https://www.nexusreader.org/" },
      { label: "Client code", href: "https://github.com/Saiteja2003/nexus-reader-client" },
      { label: "API code", href: "https://github.com/Saiteja2003/nexus-reader-api" },
    ],
    source: "public",
  },
];

export const archive = [
  {
    name: "ArcheTech Global",
    what: "Landing page for a freelance software studio started with friends.",
    stack: "Next.js · TypeScript · Tailwind CSS",
    year: "2023",
    image: "images/archetech.png",
    links: [
      { label: "Live", href: "https://www.archetechglobal.com/" },
      { label: "Code", href: "https://github.com/Saiteja2003/ATG-Landing_Page" },
    ],
  },
  {
    name: "IoT power consumption monitoring",
    what: "B.Tech final-year project. Led a five-person team building an energy-monitoring system with machine-learning analysis of consumption data; the findings were published in a research paper.",
    stack: "IoT · Machine learning",
    year: "2023 – 2024",
    links: [],
  },
  {
    name: "House rental web application",
    what: "Built during the SmartInternz internship: REST APIs, MongoDB data access and responsive Angular screens.",
    stack: "MongoDB · Express · Angular · Node.js",
    year: "2023",
    links: [
      { label: "Code", href: "https://github.com/smartinternz02/SPSGP-552797-HOUSE-RENT-WEB-APPLICATION" },
    ],
  },
];

export const path = [
  { when: "2026", what: "Vela, Solum Trade OS and Honing", where: "Independent projects", note: "Built while studying." },
  { when: "10/2024 – now", what: "M.Sc. Web and Data Science", where: "University of Koblenz, Germany" },
  { when: "2024 – 2025", what: "Logistics Associate", where: "Amazon Fulfillment Center, Koblenz", note: "Rotating shifts in a high-volume operation with strict productivity and quality standards." },
  { when: "08/2020 – 04/2024", what: "B.Tech Computer Science and Engineering", where: "Seshadri Rao Gudlavalleru Engineering College, India", note: "CGPA 8.82 / 10, JNTU Kakinada." },
  { when: "01 – 05/2023", what: "Full Stack Development Intern", where: "SmartInternz, Hyderabad", note: "MEAN-stack house rental application." },
  { when: "04 – 06/2022", what: "AWS Cloud Intern", where: "BrainOVision, Hyderabad", note: "EC2, S3 and Lambda for application prototypes." },
];

export const certifications = [
  "Microsoft Azure Developer Associate (2023)",
  "Cisco DevNet Associate (2023)",
  "Cisco Intro to Cybersecurity (2022)",
  "NPTEL Software Testing (2022)",
];

// Skills are listed with the work that uses them, instead of a self-rating.
export const toolkit = [
  { group: "Languages", items: [["TypeScript", ["solum", "honing", "vela"]], ["Python", ["vela"]], ["JavaScript", ["nexus"]], ["SQL", ["solum", "vela"]], ["Java", []]] },
  { group: "Web and APIs", items: [["Next.js", ["vela", "solum", "honing"]], ["React", ["nexus", "vela", "honing"]], ["FastAPI", ["vela"]], ["Express", ["nexus"]], ["Angular", []], ["Tailwind CSS", ["honing"]]] },
  { group: "Data", items: [["PostgreSQL · Supabase", ["solum", "vela", "honing"]], ["Row-level security", ["solum", "honing"]], ["MongoDB", ["nexus"]], ["pandas", []]] },
  { group: "Applied AI", items: [["Google Gemini", ["vela", "nexus"]], ["OpenAI · Anthropic APIs", ["honing"]], ["Structured outputs (Zod, Pydantic)", ["honing", "vela"]], ["Output validation", ["vela", "honing"]]] },
  { group: "Cloud and ops", items: [["GitHub Actions", ["vela", "solum", "nexus"]], ["Cloudflare Workers · R2", ["solum", "vela"]], ["Vercel", ["vela", "honing"]], ["AWS (EC2, S3, Lambda)", []], ["Sentry", ["vela"]]] },
];
