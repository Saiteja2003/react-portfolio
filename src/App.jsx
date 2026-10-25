import { useCallback, useState } from "react";
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

  const go = useCallback(
    (event, selector) => {
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (lenis)
        lenis.scrollTo(target, {
          offset: selector === "#top" ? 0 : -24,
          duration: 1.4,
        });
      else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
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
