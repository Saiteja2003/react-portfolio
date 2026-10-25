import { useEffect, useRef, useState } from "react";
import { person, projects, verificationLog } from "../data/content";
import { gsap } from "../motion/useMotion";

const base = import.meta.env.BASE_URL;

// Three strands cross the page behind the headline and gather at the
// verification log: every project ends in a check.
const STRANDS = [
  {
    d: "M-40 180 C 260 120, 420 420, 760 360 S 1080 560, 1150 640",
    depth: 18,
    cls: "is-signal",
  },
  {
    d: "M-40 520 C 240 600, 520 260, 820 420 S 1040 660, 1150 650",
    depth: 10,
    cls: "",
  },
  {
    d: "M220 -40 C 300 240, 640 120, 820 300 S 1100 520, 1150 655",
    depth: 26,
    cls: "is-faint",
  },
];

function VerifyLog() {
  const ref = useRef(null);
  const [shown, setShown] = useState(verificationLog.length);
  const [settled, setSettled] = useState(verificationLog.length);

  // Plays the log line by line while it is on screen; static under reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    let timers = [];
    let visible = false;
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const run = () => {
      clear();
      setShown(0);
      setSettled(0);
      verificationLog.forEach((_, i) => {
        timers.push(setTimeout(() => setShown(i + 1), 900 + i * 900));
        timers.push(setTimeout(() => setSettled(i + 1), 900 + i * 900 + 520));
      });
      timers.push(
        setTimeout(
          () => visible && !document.hidden && run(),
          900 + verificationLog.length * 900 + 4200,
        ),
      );
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && timers.length === 0) run();
      if (!visible) clear();
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  return (
    <div
      className="vlog"
      ref={ref}
      data-intro
      aria-label="Checks from the projects below"
    >
      <div className="vlog__bar">
        <span className="vlog__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>checks</span>
        <span className="vlog__live" aria-hidden="true">
          live
        </span>
      </div>
      <ol className="vlog__rows">
        {verificationLog.map((row, i) => (
          <li
            key={i}
            className={`vlog__row ${i < shown ? "is-shown" : ""} ${i < settled ? "is-settled" : ""}`}
          >
            <span className="vlog__project">{row.project}</span>
            <span className="vlog__check">{row.check}</span>
            <span className={`vlog__result ${row.ok ? "is-ok" : "is-bad"}`}>
              {i < settled ? row.result : "running"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Hero({ go }) {
  const strandsRef = useRef(null);

  // Strands drift with the pointer at different depths.
  useEffect(() => {
    const ok = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!ok) return undefined;
    const layers = [...strandsRef.current.querySelectorAll("[data-depth]")].map(
      (el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
      }),
    );
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(nx * l.depth * 2);
        l.y(ny * l.depth);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <svg
        className="hero__strands"
        ref={strandsRef}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {STRANDS.map((s, i) => (
          <g key={i} data-depth={s.depth}>
            <path className={`hero__strand ${s.cls}`} d={s.d} pathLength="1" />
          </g>
        ))}
      </svg>

      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          {person.name} · {person.role} · {person.location}
        </p>
        <h1 id="hero-title" className="hero__title">
          {person.headline[0]} <br className="hero__br" />
          {person.headline[1]} <em>{person.headline[2]}</em>
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__intro" data-intro>
              {person.intro}
            </p>
            <div className="hero__actions" data-intro>
              <a
                href="#work"
                className="btn btn--primary"
                onClick={(e) => go(e, "#work")}
                data-magnetic
              >
                View selected work
              </a>
              <a
                href="#contact"
                className="btn"
                onClick={(e) => go(e, "#contact")}
                data-magnetic
              >
                Contact
              </a>
            </div>
            <ul className="hero__projects" data-intro aria-label="Projects">
              {projects.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    onClick={(e) => go(e, `#${p.id}`)}
                    style={{ "--accent": p.accent }}
                  >
                    {p.icon ? (
                      <img
                        src={`${base}${p.icon}`}
                        alt=""
                        width="20"
                        height="20"
                      />
                    ) : (
                      <span className="hero__glyph" aria-hidden="true">
                        N
                      </span>
                    )}
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <VerifyLog />
        </div>
      </div>
    </section>
  );
}
