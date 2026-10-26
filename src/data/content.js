// Every claim on the site lives here, next to where it can be checked.
// "evidence" paths point into each project's own repository; test counts
// come from running the suites, not from reading them.

export const person = {
  name: "Saiteja Challa",
  role: "Software Engineer",
  location: "Koblenz, Germany",
  email: "challasaiteja26@gmail.com",
  github: "https://github.com/Saiteja2003",
  linkedin: "https://www.linkedin.com/in/saiteja-challa-124555228",
  headline: ["Full-stack engineer", "building reliable", "AI products."],
  intro:
    "I design and ship data pipelines, PostgreSQL backends and LLM features, with the validation and tests that make them safe to put in front of users. Currently completing an M.Sc. in Web & Data Science at the University of Koblenz.",
};

// Replayed line by line in the hero. Validation rows mirror the demos
// below; test-suite rows are real runs (25 Oct 2026).
export const verificationLog = [
  {
    project: "vela",
    check: "lesson quality gate",
    result: "published",
    ok: true,
  },
  {
    project: "honing",
    check: "unsupported “40%” claim",
    result: "rejected",
    ok: false,
  },
  {
    project: "solum",
    check: "SHA-256 audit chain",
    result: "intact",
    ok: true,
  },
  { project: "solum", check: "test suite", result: "63/63 passing", ok: true },
  {
    project: "honing",
    check: "test suite",
    result: "105/105 passing",
    ok: true,
  },
  {
    project: "nexus",
    check: "feed health check",
    result: "0 removed",
    ok: true,
  },
];

export const projects = [
  {
    id: "vela",
    index: "01",
    name: "Vela",
    icon: "images/brand/vela.webp",
    accent: "#2fd0ea",
    kind: "Micro-learning platform",
    status: "In development · public preview",
    period: "2026",
    purpose:
      "Turns trusted sources into short, interactive lessons with spaced repetition.",
    achievement:
      "Lessons are generated offline and published only after passing a deterministic six-check quality gate.",
    proofs: [
      { v: "6", k: "quality checks per lesson" },
      { v: "0", k: "live LLM calls in the lesson feed" },
      { v: "1→3→7", k: "day review intervals, then doubling" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Gemini",
      "Supabase",
      "Next.js PWA",
      "Cloudflare R2",
    ],
    shot: {
      src: "images/vela.webp",
      w: 1910,
      h: 836,
      url: "vela-web-omega.vercel.app",
      alt: "Vela's stream screen: a diagram card comparing transport layers with framing protocols, a grouping exercise, and a daily goal of 2 of 5 completed.",
    },
    demo: "vela",
    demoLabel: "Quality gate",
    details: [
      [
        "Ingestion",
        "A Python pipeline discovers sources (arXiv, OpenAlex, open educational resources, Wikipedia), extracts and verifies facts, then drafts lessons with Google Gemini.",
      ],
      [
        "Quality gate",
        "Provenance (a verbatim quote from the source), length limits, filler detection, takeaway count and a valid recall question. Any failure blocks publishing.",
      ],
      [
        "Learner state",
        "FastAPI and Supabase recompute review intervals and mastery from an immutable event log. A miss resets the interval; a skip counts as exposure only.",
      ],
      [
        "Client",
        "Next.js PWA with Supabase Auth, interactive SQL and code exercises, a CEFR German tutor with speech input, and Sentry monitoring.",
      ],
      [
        "Operations",
        "Scheduled GitHub Actions for content generation and nightly cleanup of orphaned Cloudflare R2 assets.",
      ],
    ],
    evidence: [
      "engine/flow/quality_gate.py",
      "engine/flow/learner_state.py",
      ".github/workflows/ops-maintenance.yml",
    ],
    links: [
      {
        label: "Open live preview",
        href: "https://vela-web-omega.vercel.app/",
      },
    ],
    source: "private",
  },
  {
    id: "solum",
    index: "02",
    name: "Solum Trade OS",
    icon: "images/brand/solum.webp",
    accent: "#f5a524",
    kind: "Operations platform",
    status: "Built · pre-launch",
    period: "2026",
    purpose:
      "Operations platform for an agri-export business, built on an auditable record of every transaction.",
    achievement:
      "Tamper-evident audit trail: append-only events, chained with SHA-256 and anchored outside the database every night.",
    proofs: [
      { v: "66", k: "tables under row-level security" },
      { v: "18", k: "versioned Supabase migrations" },
      { v: "63/63", k: "tests passing" },
    ],
    stack: [
      "PostgreSQL",
      "Supabase",
      "TypeScript",
      "Next.js",
      "Cloudflare Workers",
      "Zod",
    ],
    demo: "solum",
    demoLabel: "Audit chain",
    details: [
      [
        "Data perimeter",
        "66 PostgreSQL tables across 18 migrations. An event trigger enables row-level security on every newly created table, so a future migration cannot ship an open one.",
      ],
      [
        "Audit trail",
        "Events are append-only. Each SHA-256 hash covers the previous hash and the event; updates, deletes and truncates are rejected by triggers.",
      ],
      [
        "Backups",
        "A nightly GitHub Actions job writes an encrypted database dump and commits the chain head to the repository.",
      ],
      [
        "Domain logic",
        "Integer money arithmetic, margin modelling, confidentiality-aware AI document extraction and checks that block unsupported figures, covered by 63 tests.",
      ],
    ],
    evidence: [
      "supabase/migrations/…_rls_perimeter.sql",
      "supabase/migrations/…_core.sql",
      ".github/workflows/backup.yml",
    ],
    links: [],
    source: "private",
  },
  {
    id: "honing",
    index: "03",
    name: "Honing",
    icon: "images/brand/honing.webp",
    accent: "#7b7bff",
    kind: "AI job-application workspace",
    status: "In development · live app",
    period: "2026",
    purpose:
      "Tailors a résumé to each job description without inventing a single claim.",
    achievement:
      "Every edit is a reviewable patch to an immutable master résumé, and a guard rejects any rewrite that adds numbers or skills it cannot trace.",
    proofs: [
      { v: "105/105", k: "tests passing" },
      { v: "3", k: "LLM providers with fallback" },
      { v: "8", k: "rejection rules in the guard" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "OpenAI · Anthropic · Gemini",
      "Vitest",
    ],
    shot: {
      src: "images/honing.webp",
      w: 1917,
      h: 780,
      url: "honing-kappa.vercel.app",
      alt: "Honing's pipeline board with Saved, Applied, Interviewing, Rejected and Offer columns of application cards, each with a match score.",
    },
    demo: "honing",
    demoLabel: "Tailoring guard",
    details: [
      [
        "Résumé model",
        "The master résumé is immutable and versioned. Tailoring emits patch documents the user reviews before anything changes.",
      ],
      [
        "Guard",
        "Rejects new numbers, gap skills, unknown references and unverified sentences, falling back to the original text.",
      ],
      [
        "LLM gateway",
        "OpenAI, Anthropic and Google behind one interface with model fallback. User-supplied API keys are encrypted with AES-256-GCM.",
      ],
      [
        "Workflow",
        "A browser extension clips postings and assists form filling; a Kanban board tracks every application with a match score.",
      ],
    ],
    evidence: [
      "src/lib/tailoring/guard.ts",
      "src/lib/llm/gateway.ts",
      "docs/audit/HONING-IMPLEMENTATION-AUDIT.md",
    ],
    links: [
      { label: "Open live app", href: "https://honing-kappa.vercel.app/" },
    ],
    source: "private",
  },
  {
    id: "nexus",
    index: "04",
    name: "NexusReader",
    accent: "#4f9a5b",
    kind: "RSS reader",
    status: "Shipped · live",
    period: "2025",
    purpose:
      "A three-pane RSS reader that gathers your feeds in one place, with on-demand AI summaries.",
    achievement:
      "Shipped end to end: React client, Express 5 and MongoDB API with JWT auth, and a scheduled job that removes dead feeds.",
    proofs: [
      { v: "Live", k: "at nexusreader.org" },
      { v: "12", k: "curated feeds monitored" },
      { v: "Daily", k: "automated feed health check" },
    ],
    stack: ["React", "Vite", "Express", "MongoDB", "JWT", "Gemini"],
    shot: {
      src: "images/nexusreader.png",
      w: 1912,
      h: 864,
      url: "nexusreader.org",
      alt: "NexusReader with a sidebar of feeds, a list of MIT Technology Review articles and the selected article open on the right.",
    },
    details: [
      [
        "Client",
        "React and Vite with a three-pane layout: sources, article list and reader.",
      ],
      [
        "API",
        "Express 5, MongoDB through Mongoose, JWT authentication, rss-parser, and a Gemini summarization endpoint.",
      ],
      [
        "Operations",
        "A daily GitHub Actions job sends a HEAD request to each curated feed (5 s timeout), removes dead ones and logs the run.",
      ],
    ],
    evidence: [
      "api · routes/feeds.js · routes/ai.js",
      "client · scripts/updateFeeds.js · engine-log.txt",
    ],
    links: [
      { label: "Visit nexusreader.org", href: "https://www.nexusreader.org/" },
      {
        label: "Client code",
        href: "https://github.com/Saiteja2003/nexus-reader-client",
      },
      {
        label: "API code",
        href: "https://github.com/Saiteja2003/nexus-reader-api",
      },
    ],
    source: "public",
  },
];

export const principles = [
  {
    title: "Validate model output in code.",
    body: "AI-generated content is published only after deterministic checks pass.",
    code: `if original_quote not in raw_source_text:
    return False, 0, "Provenance failed"`,
    src: "Vela · quality_gate.py",
  },
  {
    title: "Make every claim traceable.",
    body: "Generated text that introduces numbers or skills missing from the source is rejected.",
    code: `const number = newNumberIn(text, numbersIn(original));
if (number) {
  rejections.push({ kind: "unearned_number", … });`,
    src: "Honing · guard.ts",
  },
  {
    title: "Keep critical history immutable.",
    body: "Business events are append-only, hash-chained and anchored outside the database.",
    code: `if tg_op <> 'INSERT' then
  raise exception 'events are append-only';`,
    src: "Solum · core.sql",
  },
];

export const strengths = [
  "Data pipelines",
  "PostgreSQL & row-level security",
  "LLM integration & output validation",
  "Automated testing & CI/CD",
  "React & Next.js",
  "AWS & Azure",
];

export const experience = [
  {
    when: "2024 – 2025",
    what: "Logistics Associate",
    where: "Amazon Fulfillment Center, Koblenz",
  },
  {
    when: "01 – 05/2023",
    what: "Full Stack Development Intern",
    where: "SmartInternz · MEAN stack",
  },
  {
    when: "04 – 06/2022",
    what: "AWS Cloud Intern",
    where: "BrainOVision · EC2, S3, Lambda",
  },
];

export const education = [
  {
    when: "10/2024 – now",
    what: "M.Sc. Web and Data Science",
    where: "University of Koblenz",
  },
  {
    when: "2020 – 2024",
    what: "B.Tech Computer Science",
    where: "Seshadri Rao Gudlavalleru Engineering College · CGPA 8.82/10",
  },
];

export const certifications = [
  "Microsoft Azure Developer Associate",
  "Cisco DevNet Associate",
  "Cisco Intro to Cybersecurity",
  "NPTEL Software Testing",
];

export const earlierWork = [
  {
    name: "ArcheTech Global",
    what: "Landing page for a freelance software studio",
    year: "2023",
    links: [
      { label: "Live", href: "https://www.archetechglobal.com/" },
      {
        label: "Code",
        href: "https://github.com/Saiteja2003/ATG-Landing_Page",
      },
    ],
  },
  {
    name: "IoT power monitoring",
    what: "Led a five-person team; findings published in a research paper",
    year: "2024",
    links: [],
  },
  {
    name: "House rental platform",
    what: "MEAN-stack application built during an internship",
    year: "2023",
    links: [
      {
        label: "Code",
        href: "https://github.com/smartinternz02/SPSGP-552797-HOUSE-RENT-WEB-APPLICATION",
      },
    ],
  },
];
