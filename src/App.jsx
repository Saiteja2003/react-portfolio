import { useCallback, useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { useFinePointer, useReducedMotion } from "./hooks/useMotionPrefs";
import { useReveal } from "./hooks/useReveal";
import { projects } from "./data/content";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Thread from "./components/Thread";
import Chapter from "./components/Chapter";
import { Archive, Contact, Method, Path, Toolkit, WorkIntro } from "./components/Sections";

const CHAPTERS = [
  { id: "method", index: "00", label: "Method" },
  ...projects.map((p) => ({ id: p.id, index: p.index, label: p.name })),
  { id: "archive", index: "05", label: "Earlier work" },
  { id: "path", index: "06", label: "Path" },
  { id: "toolkit", index: "07", label: "Toolkit" },
  { id: "contact", index: "08", label: "Contact" },
];

function readRopePref() {
  try {
    return localStorage.getItem("thread") !== "off";
  } catch {
    return true;
  }
}

export default function App() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const lenis = useLenis(fine && !reduced);
  const [ropePref, setRopePref] = useState(readRopePref);
  useReveal();

  const ropeAvailable = fine && !reduced;
  const toggleRope = () =>
    setRopePref((on) => {
      try {
        localStorage.setItem("thread", on ? "off" : "on");
      } catch {
        /* storage unavailable: the choice lasts for this visit */
      }
      return !on;
    });

  const go = useCallback(
    (event, selector) => {
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: selector === "#top" ? 0 : -24, duration: 1.4 });
      else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", selector === "#top" ? location.pathname : selector);
      // Move focus for keyboard and screen reader users without a second jump.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    [lenis, reduced],
  );

  return (
    <>
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <div className="grain" aria-hidden="true" />
      <Thread ropeEnabled={ropeAvailable && ropePref} chapters={CHAPTERS} />
      <Nav go={go} rope={ropeAvailable ? ropePref : null} onToggleRope={toggleRope} />
      <main>
        <Hero go={go} />
        <Method />
        <section id="work" className="work" aria-labelledby="work-title">
          <WorkIntro />
          {projects.map((p, i) => (
            <Chapter key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </section>
        <Archive />
        <Path />
        <Toolkit go={go} />
      </main>
      <Contact />
    </>
  );
}
