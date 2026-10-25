import { lazy, Suspense } from "react";
import Shot from "./Shot";

// Each project gets its own working mechanism, loaded when it's needed.
const DEMOS = {
  vela: lazy(() => import("./demos/VelaDemo")),
  solum: lazy(() => import("./demos/SolumDemo")),
  honing: lazy(() => import("./demos/HoningDemo")),
  nexus: lazy(() => import("./demos/NexusShowcase")),
};

export default function Chapter({ project: p, flip }) {
  const Demo = DEMOS[p.demo];
  return (
    <article id={p.id} className={`chapter chapter--${p.id} ${flip ? "chapter--flip" : ""}`} aria-labelledby={`${p.id}-title`}>
      <header className="chapter__head" data-reveal>
        <span className="chapter__index" aria-hidden="true">{p.index}</span>
        <div className="chapter__titles">
          <p className="mono-label">
            {p.kind} · {p.period}
          </p>
          <h3 id={`${p.id}-title`} className="chapter__name" data-anchor>
            {p.name}
          </h3>
          <p className="chapter__line">{p.line}</p>
        </div>
        <span className={`status ${p.status.startsWith("Shipped") ? "status--live" : ""}`}>{p.status}</span>
      </header>

      {p.shot && (
        <div className="chapter__shot" data-reveal>
          <Shot {...p.shot} />
        </div>
      )}

      <div className="chapter__grid">
        <div className="chapter__text">
          {p.sections.map((s) => (
            <section key={s.h} className="chapter__section" data-reveal>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </section>
          ))}

          <dl className="facts" data-reveal>
            {p.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>

          <ul className="stack" aria-label="Technologies" data-reveal>
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <details className="evidence" data-reveal>
            <summary>Where to check this</summary>
            <ul>
              {p.evidence.map((e) => (
                <li key={e}>
                  <code>{e}</code>
                </li>
              ))}
            </ul>
            {p.source === "private" && (
              <p>The repository is private. I’m happy to walk through the code on a call.</p>
            )}
          </details>

          {p.links.length > 0 && (
            <div className="links" data-reveal>
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow" data-magnetic>
                  {l.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="chapter__demo" data-reveal>
          <Suspense fallback={<div className="demo demo--loading" aria-hidden="true" />}>
            <Demo image={p.image} />
          </Suspense>
        </div>
      </div>
    </article>
  );
}
