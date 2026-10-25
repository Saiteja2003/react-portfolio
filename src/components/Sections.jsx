import { useState } from "react";
import {
  certifications,
  earlierWork,
  education,
  experience,
  person,
  principles,
  strengths,
} from "../data/content";

export function WorkIntro() {
  return (
    <header className="section-head section-head--work">
      <p className="eyebrow" data-rise>
        Selected work · 2025 – 2026
      </p>
      <h2 id="work-title" data-split>
        Four systems, each with its <em>real logic</em> running below.
      </h2>
    </header>
  );
}

export function Approach() {
  return (
    <section
      id="approach"
      className="approach"
      aria-labelledby="approach-title"
    >
      <header className="section-head">
        <p className="eyebrow" data-rise>
          Approach
        </p>
        <h2 id="approach-title" data-split>
          Three rules behind <em>every system</em>.
        </h2>
      </header>
      <ol className="principles" data-rise>
        {principles.map((r, i) => (
          <li key={r.title} className="principle">
            <span className="principle__n">0{i + 1}</span>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
            <pre>
              <code>{r.code}</code>
            </pre>
            <p className="principle__src">{r.src}</p>
          </li>
        ))}
      </ol>
      <ul className="strengths" data-rise aria-label="Strengths">
        {strengths.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}

function Timeline({ title, items }) {
  return (
    <div className="timeline">
      <h3 className="eyebrow">{title}</h3>
      <ol data-rise>
        {items.map((it) => (
          <li key={it.what}>
            <span className="timeline__when">{it.when}</span>
            <span className="timeline__what">{it.what}</span>
            <span className="timeline__where">{it.where}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Background() {
  return (
    <section
      id="background"
      className="background"
      aria-labelledby="background-title"
    >
      <header className="section-head">
        <p className="eyebrow" data-rise>
          Background
        </p>
        <h2 id="background-title" data-split>
          From Telangana, India to <em>Koblenz</em>.
        </h2>
      </header>
      <div className="background__grid">
        <Timeline title="Experience" items={experience} />
        <Timeline title="Education" items={education} />
      </div>
      <div className="background__grid background__grid--lower">
        <div className="earlier">
          <h3 className="eyebrow">Earlier work</h3>
          <ul data-rise>
            {earlierWork.map((w) => (
              <li key={w.name}>
                <span className="earlier__year">{w.year}</span>
                <span className="earlier__name">{w.name}</span>
                <span className="earlier__what">{w.what}</span>
                <span className="earlier__links">
                  {w.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="certs">
          <h3 className="eyebrow">Certifications</h3>
          <ul data-rise>
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <p className="eyebrow" data-rise>
        Contact
      </p>
      <h2 id="contact-title" className="contact__title" data-split>
        Let’s build something <em>you can verify</em>.
      </h2>
      <p className="contact__sub" data-rise>
        Open to software engineering roles and collaborations. Based in{" "}
        {person.location}.
      </p>
      <div className="contact__actions" data-rise>
        <a
          className="btn btn--primary btn--lg"
          href={`mailto:${person.email}`}
          data-magnetic
        >
          {person.email}
        </a>
        <button
          className="btn btn--lg"
          onClick={copy}
          data-magnetic
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>
      <ul className="contact__links" data-rise>
        <li>
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
      <p className="contact__fine">
        © {new Date().getFullYear()} {person.name} · Built with React, GSAP and
        Lenis
      </p>
    </footer>
  );
}
