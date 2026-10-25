import { useEffect, useRef } from "react";

const SEGMENTS = 22;
const GRAVITY = 0.32;
const DAMPING = 0.955;
const ITERATIONS = 7;
const INTERACTIVE = "a, button, input, select, textarea, label, summary, [data-demo]";

/**
 * The thread that runs through the page.
 *
 * - The spine on the left fills as you scroll and marks each chapter.
 * - On a fine pointer the visitor holds a loose strand tied to the spine's tip
 *   (a small verlet rope on one canvas). Clicking empty space slings a strand
 *   to the nearest heading.
 *
 * Only transforms and one canvas are touched per frame, and the loop sleeps
 * when nothing moves. Reduced motion, touch input or the visitor's toggle
 * leave just the static spine.
 */
export default function Thread({ ropeEnabled, chapters }) {
  const canvasRef = useRef(null);
  const spineRef = useRef(null);
  const labelRef = useRef(null);
  const nodesRef = useRef([]);
  const trackRef = useRef(null);
  // Shared between the two effects: scroll progress and the track's box, so
  // the rope can find the spine tip without reading layout every frame.
  const geom = useRef({ progress: 0, x: 32, top: 0, height: 0 });

  // Spine: scroll progress and the active chapter label.
  useEffect(() => {
    let frame = 0;
    let offsets = [];
    const measure = () => {
      const track = trackRef.current?.getBoundingClientRect();
      if (track) Object.assign(geom.current, { x: track.left + track.width / 2, top: track.top, height: track.height });
      const max = document.documentElement.scrollHeight - window.innerHeight;
      offsets = chapters.map((c) => {
        const el = document.getElementById(c.id);
        if (!el) return 0;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return max > 0 ? Math.min(1, Math.max(0, (top - window.innerHeight * 0.35) / max)) : 0;
      });
      nodesRef.current.forEach((node, i) => {
        if (node) node.style.transform = `translateY(calc(${offsets[i]} * var(--spine-h)))`;
      });
      update();
    };
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      geom.current.progress = p;
      spineRef.current?.style.setProperty("--p", p.toFixed(4));
      let active = -1;
      offsets.forEach((o, i) => {
        if (p + 0.0001 >= o) active = i;
      });
      nodesRef.current.forEach((n, i) => n?.classList.toggle("is-passed", i <= active));
      if (labelRef.current) {
        const c = chapters[active];
        const text = c ? `${c.index} · ${c.label}` : "";
        if (labelRef.current.textContent !== text) labelRef.current.textContent = text;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [chapters]);

  // Rope, slings and magnetic targets.
  useEffect(() => {
    if (!ropeEnabled) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const css = getComputedStyle(document.documentElement);
    const signal = css.getPropertyValue("--signal").trim() || "#ff5a36";
    let dpr = 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wake();
    };

    const pointer = { x: w * 0.6, y: h * 0.4, seen: false, inside: true, lastMove: 0 };
    const pts = Array.from({ length: SEGMENTS }, () => ({ x: 0, y: 0, px: 0, py: 0 }));
    let initialised = false;
    let alpha = 0;
    let shots = [];
    let raf = 0;
    let magnet = null;

    const anchor = () => {
      const g = geom.current;
      return { x: g.x, y: g.top + g.progress * g.height };
    };

    const step = (now) => {
      raf = 0;
      const a = anchor();
      if (!initialised) {
        pts.forEach((p, i) => {
          const t = i / (SEGMENTS - 1);
          p.x = p.px = a.x + (pointer.x - a.x) * t;
          p.y = p.py = a.y + (pointer.y - a.y) * t;
        });
        initialised = true;
      }

      const targetAlpha = pointer.seen && pointer.inside ? 1 : 0;
      alpha += (targetAlpha - alpha) * 0.12;

      // Integrate.
      let energy = 0;
      for (let i = 1; i < SEGMENTS; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
        energy += Math.abs(vx) + Math.abs(vy);
      }
      const end = pts[SEGMENTS - 1];
      end.x += (pointer.x - end.x) * 0.5;
      end.y += (pointer.y - end.y) * 0.5;

      // Constrain: a little slack beyond the straight distance.
      const dist = Math.hypot(pointer.x - a.x, pointer.y - a.y);
      const rest = (Math.max(dist * 1.06, 90) / (SEGMENTS - 1));
      for (let k = 0; k < ITERATIONS; k++) {
        pts[0].x = a.x;
        pts[0].y = a.y;
        for (let i = 0; i < SEGMENTS - 1; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const diff = (d - rest) / d;
          const w1 = i === 0 ? 0 : 0.5;
          const w2 = i + 1 === SEGMENTS - 1 ? 0 : 0.5;
          const s = w1 + w2 || 1;
          p1.x += dx * diff * (w1 / s);
          p1.y += dy * diff * (w1 / s);
          p2.x -= dx * diff * (w2 / s);
          p2.y -= dy * diff * (w2 / s);
        }
        end.x = end.x + (pointer.x - end.x) * 0.6;
        end.y = end.y + (pointer.y - end.y) * 0.6;
      }

      // Draw.
      ctx.clearRect(0, 0, w, h);
      if (alpha > 0.01) {
        ctx.globalAlpha = alpha * 0.75;
        ctx.strokeStyle = signal;
        ctx.lineWidth = 1.25;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < SEGMENTS - 1; i++) {
          const mx = (pts[i].x + pts[i + 1].x) / 2;
          const my = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
        }
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(end.x, end.y, magnet ? 9 : 4, 0, Math.PI * 2);
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }

      // Slings.
      shots = shots.filter((s) => now - s.t0 < 1500);
      for (const s of shots) {
        const t = now - s.t0;
        const grow = Math.min(1, t / 160);
        const fade = t > 1100 ? 1 - (t - 1100) / 400 : 1;
        const x = s.x0 + (s.x1 - s.x0) * grow;
        const y = s.y0 + (s.y1 - s.y0) * grow;
        ctx.globalAlpha = Math.max(0, fade) * 0.9;
        ctx.strokeStyle = signal;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x0, s.y0);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (grow === 1) {
          for (let k = 0; k < 6; k++) {
            const ang = (k / 6) * Math.PI * 2 + 0.3;
            ctx.beginPath();
            ctx.moveTo(s.x1, s.y1);
            ctx.lineTo(s.x1 + Math.cos(ang) * 9, s.y1 + Math.sin(ang) * 9);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      const idle = now - pointer.lastMove > 1800;
      const settled = energy < 0.04 * SEGMENTS && Math.abs(targetAlpha - alpha) < 0.01;
      if (!(idle && settled && shots.length === 0)) wake();
    };

    function wake() {
      if (!raf && !document.hidden) raf = requestAnimationFrame(step);
    }

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.seen = true;
      pointer.inside = true;
      pointer.lastMove = performance.now();

      const target = e.target.closest?.("[data-magnetic]") ?? null;
      if (magnet && magnet !== target) {
        magnet.style.transform = "";
        magnet = null;
      }
      if (target) {
        const r = target.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        target.style.transform = `translate(${Math.max(-8, Math.min(8, dx))}px, ${Math.max(-6, Math.min(6, dy))}px)`;
        magnet = target;
      }
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      if (magnet) magnet.style.transform = "";
      magnet = null;
      wake();
    };
    const onClick = (e) => {
      if (e.target.closest(INTERACTIVE) || window.getSelection()?.toString()) return;
      const candidates = [...document.querySelectorAll("[data-anchor]")]
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.bottom > 60 && r.top < h - 20)
        .map((r) => ({ x: Math.min(Math.max(e.clientX, r.left), r.right), y: r.top }))
        .filter((pt) => pt.y < e.clientY - 24);
      if (!candidates.length) return;
      const best = candidates.reduce((a, b) =>
        Math.hypot(a.x - e.clientX, a.y - e.clientY) < Math.hypot(b.x - e.clientX, b.y - e.clientY) ? a : b,
      );
      shots.push({ x0: e.clientX, y0: e.clientY, x1: best.x, y1: best.y, t0: performance.now() });
      const mid = pts[Math.floor(SEGMENTS / 2)];
      mid.py += 14;
      wake();
    };
    const onVisibility = () => {
      if (!document.hidden) wake();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      if (magnet) magnet.style.transform = "";
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [ropeEnabled]);

  return (
    <>
      <div className="spine" aria-hidden="true" ref={spineRef}>
        <div className="spine__track" ref={trackRef}>
          <div className="spine__fill" />
          {chapters.map((c, i) => (
            <span key={c.id} className="spine__node" ref={(el) => (nodesRef.current[i] = el)} />
          ))}
          <span className="spine__tip">
            <span className="spine__label" ref={labelRef} />
          </span>
        </div>
      </div>
      {ropeEnabled && <canvas className="rope" ref={canvasRef} aria-hidden="true" />}
    </>
  );
}
