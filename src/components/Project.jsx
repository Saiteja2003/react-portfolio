import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import Shot from "./Shot";

const base = import.meta.env.BASE_URL;

// Each demo runs a browser port of that project's real logic. They load
// only when their stage approaches the viewport.
const DEMOS = {
  vela: lazy(() => import("./demos/VelaDemo")),
  solum: lazy(() => import("./demos/SolumDemo")),
  honing: lazy(() => import("./demos/HoningDemo")),
};

function useNear(ref, margin = "600px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, margin]);
  return near;
}

function Stage({ p }) {
  const ref = useRef(null);
  const near = useNear(ref);
  const views = [p.shot && "product", p.demo && "demo"].filter(Boolean);
  const [view, setView] = useState(views[0]);
  const Demo = p.demo ? DEMOS[p.demo] : null;
  const tabsId = useId();

  return (
    <div
      className={`stage stage--${p.id}`}
      ref={ref}
      data-stage
      style={{ "--accent": p.accent }}
    >
      <div className="stage__glow" aria-hidden="true" />
      <div className="stage__frame">
        {views.length > 1 && (
          <div
            className="segmented"
            role="tablist"
            aria-label={`${p.name} views`}
            data-view={view}
          >
            <span className="segmented__pill" aria-hidden="true" />
            <button
              role="tab"
              id={`${tabsId}-product`}
              aria-selected={view === "product"}
              aria-controls={`${tabsId}-panel`}
              onClick={() => setView("product")}
            >
              Product
            </button>
            <button
              role="tab"
              id={`${tabsId}-demo`}
              aria-selected={view === "demo"}
              aria-controls={`${tabsId}-panel`}
              onClick={() => setView("demo")}
            >
              Interactive demo
            </button>
          </div>
        )}
        <div
          className="stage__view"
          key={view}
          id={`${tabsId}-panel`}
          role={views.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={views.length > 1 ? `${tabsId}-${view}` : undefined}
        >
          {view === "product" ? (
            <Shot {...p.shot} />
          ) : near ? (
            <Suspense
              fallback={
                <div className="demo demo--loading" aria-hidden="true" />
              }
            >
              <Demo />
            </Suspense>
          ) : (
            <div className="demo demo--loading" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}

function Details({ p }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`details ${open ? "is-open" : ""}`}>
      <button
        className="details__toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        data-magnetic
      >
        <span className="details__plus" aria-hidden="true" />
        Architecture &amp; evidence
      </button>
      <div
        className="details__region"
        id={id}
        role="region"
        aria-label={`${p.name} architecture and evidence`}
        inert={!open}
      >
        <div className="details__inner">
          <dl className="details__list">
            {p.details.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="details__evidence">
            <p className="eyebrow">Key source files</p>
            <ul>
              {p.evidence.map((e) => (
                <li key={e}>
                  <code>{e}</code>
                </li>
              ))}
            </ul>
            {p.source === "private" && (
              <p className="details__note">
                Private repository. Code walkthrough available on request.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "63/63" counts up to 63 and keeps "/63"; non-numeric values stay as they are.
function Proof({ v, k }) {
  const m = /^(\d+)(.*)$/.exec(v);
  const counts = m && !m[2].startsWith("→");
  return (
    <div className="proof">
      <dt className="proof__k">{k}</dt>
      <dd
        className="proof__v"
        {...(counts ? { "data-count": m[1], "data-rest": m[2] } : {})}
      >
        {v}
      </dd>
    </div>
  );
}

export default function Project({ project: p }) {
  return (
    <article
      id={p.id}
      className={`project project--${p.id}`}
      aria-labelledby={`${p.id}-title`}
      style={{ "--accent": p.accent }}
    >
      <header className="project__head">
        <span className="project__index" aria-hidden="true">
          {p.index}
        </span>
        <div className="project__titles">
          <p className="project__kind">
            {p.icon && (
              <img src={`${base}${p.icon}`} alt="" width="22" height="22" />
            )}
            {p.kind} · {p.period}
          </p>
          <h3 id={`${p.id}-title`} className="project__name" data-split>
            {p.name}
          </h3>
          <p className="project__purpose" data-rise>
            {p.purpose}
          </p>
        </div>
        <span
          className={`status ${p.status.startsWith("Shipped") ? "status--live" : ""}`}
        >
          {p.status}
        </span>
      </header>

      <Stage p={p} />

      <div className="project__meta" data-rise>
        <p className="project__achievement">{p.achievement}</p>
        <dl className="proofs">
          {p.proofs.map((x) => (
            <Proof key={x.k} {...x} />
          ))}
        </dl>
        <div className="project__side">
          <ul className="stack" aria-label="Technologies">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {p.links.length > 0 && (
            <div className="links">
              {p.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${i === 0 ? "btn--primary" : ""}`}
                  data-magnetic
                >
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Details p={p} />
    </article>
  );
}
