import { useEffect, useRef } from "react";
import { gsap } from "../motion/useMotion";

/**
 * The thread, in miniature: a ring trails the pointer, tied to it by a
 * hairline that stretches when you move quickly and goes slack at rest.
 * Over [data-cursor] areas the ring opens and names the action; over
 * [data-magnetic] controls it pulls them a few pixels toward the pointer.
 * The native cursor stays visible. Runs on GSAP's ticker only while moving.
 */
export default function Cursor() {
  const ringRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return undefined;

    const ring = ringRef.current;
    const line = lineRef.current;
    const label = labelRef.current;
    const pos = { x: -100, y: -100 };
    const xTo = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    gsap.set(ring, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });

    let running = false;
    let still = 0;
    const draw = () => {
      const rx = gsap.getProperty(ring, "x");
      const ry = gsap.getProperty(ring, "y");
      const d = Math.hypot(pos.x - rx, pos.y - ry);
      line.setAttribute("x1", pos.x);
      line.setAttribute("y1", pos.y);
      line.setAttribute("x2", rx);
      line.setAttribute("y2", ry);
      line.style.opacity = Math.min(1, d / 40).toFixed(3);
      still = d < 0.4 ? still + 1 : 0;
      if (still > 20) stop();
    };
    const start = () => {
      if (running) return;
      running = true;
      still = 0;
      gsap.ticker.add(draw);
    };
    const stop = () => {
      running = false;
      gsap.ticker.remove(draw);
    };

    const magnets = new WeakMap();
    let magnet = null;
    const release = () => {
      if (!magnet) return;
      const m = magnets.get(magnet);
      m.x(0);
      m.y(0);
      magnet = null;
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xTo(pos.x);
      yTo(pos.y);
      ring.classList.add("is-visible");
      start();

      const target = e.target.closest?.("[data-magnetic]");
      if (target !== magnet) release();
      if (target) {
        if (!magnets.has(target)) {
          magnets.set(target, {
            x: gsap.quickTo(target, "x", { duration: 0.4, ease: "power3" }),
            y: gsap.quickTo(target, "y", { duration: 0.4, ease: "power3" }),
          });
        }
        const r = target.getBoundingClientRect();
        const m = magnets.get(target);
        m.x((e.clientX - (r.left + r.width / 2)) * 0.25);
        m.y((e.clientY - (r.top + r.height / 2)) * 0.3);
        magnet = target;
      }
    };

    const onOver = (e) => {
      const zone = e.target.closest?.("[data-cursor]");
      const hot = e.target.closest?.(
        "a, button, [role='tab'], [role='radio'], summary",
      );
      ring.classList.toggle("is-label", !!zone && !hot);
      ring.classList.toggle("is-hot", !!hot);
      label.textContent = zone && !hot ? zone.dataset.cursor : "";
    };

    const onLeave = () => {
      ring.classList.remove("is-visible");
      release();
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      stop();
      release();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <svg className="cursor__thread">
        <line ref={lineRef} />
      </svg>
      <div className="cursor__ring" ref={ringRef}>
        <span ref={labelRef} />
      </div>
    </div>
  );
}
