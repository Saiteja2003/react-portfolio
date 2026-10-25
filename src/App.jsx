import { useCallback, useRef, useState } from "react";
import { useMotion } from "./motion/useMotion";
import { projects } from "./data/content";
import Cursor from "./components/Cursor";
import Spine from "./components/Spine";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Project from "./components/Project";
import {
  Approach,
  Background,
  Contact,
  WorkIntro,
} from "./components/Sections";

const CHAPTERS = [
  ...projects.map((p) => ({ id: p.id, index: p.index, label: p.name })),
  { id: "approach", index: "05", label: "Approach" },
  { id: "background", index: "06", label: "Background" },
  { id: "contact", index: "07", label: "Contact" },
];

export default function App() {
  const [lenis, setLenis] = useState(null);
  useMotion(setLenis);
  const trip = useRef(0);

  const go = useCallback(
    (event, selector) => {
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // Land on the section's own content, just under the floating nav,
      // instead of at the top of its padding. The target is re-measured every
      // frame, so images or demos loading on the way cannot cut the trip short.
      const aim = () => {
        if (selector === "#top") return 0;
        const pad = parseFloat(getComputedStyle(target).paddingTop) || 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return Math.min(
          max,
          Math.max(
            0,
            target.getBoundingClientRect().top + window.scrollY + pad - 104,
          ),
        );
      };
      const set = (y) =>
        lenis
          ? lenis.scrollTo(y, { immediate: true, force: true })
          : window.scrollTo(0, y);
      cancelAnimationFrame(trip.current);
      if (reduced) set(aim());
      else {
        const from = window.scrollY;
        const dist = Math.abs(aim() - from);
        const dur = Math.min(1400, 600 + dist * 0.12);
        const t0 = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - t, 4);
          set(from + (aim() - from) * e);
          if (t < 1) trip.current = requestAnimationFrame(step);
        };
        trip.current = requestAnimationFrame(step);
      }
      history.replaceState(
        null,
        "",
        selector === "#top" ? location.pathname : selector,
      );
      // Move focus for keyboard and screen reader users without a second jump.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    [lenis],
  );

  return (
    <>
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <div className="grain" aria-hidden="true" />
      <Spine chapters={CHAPTERS} />
      <Nav go={go} />
      <main>
        <Hero go={go} />
        <section id="work" className="work" aria-labelledby="work-title">
          <WorkIntro />
          {projects.map((p) => (
            <Project key={p.id} project={p} />
          ))}
        </section>
        <Approach />
        <Background />
      </main>
      <Contact />
      <Cursor />
    </>
  );
}
