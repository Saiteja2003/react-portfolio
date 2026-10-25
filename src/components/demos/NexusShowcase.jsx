import { useRef } from "react";

const base = import.meta.env.BASE_URL;

// The shipped product, shown as it is: a real screenshot, gently tilted by
// the pointer on devices that have one.
export default function NexusShowcase({ image }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="demo demo--bare" data-demo>
      <figure className="browser" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="browser__bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <em>nexusreader.org</em>
        </div>
        <img
          src={`${base}${image}`}
          alt="NexusReader showing a sidebar of feeds, a list of MIT Technology Review articles and the selected article open on the right."
          width="1912"
          height="864"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="log" aria-label="Feed health job">
        <p className="mono-label">daily-feed-update.yml · cron 0 0 * * *</p>
        <code>HEAD each curated feed · timeout 5s · purge on failure</code>
        <code>Engine Run: 2026-09-11T02:05:00.707Z | Active Feeds: 12 | Purged: 0</code>
      </div>
    </div>
  );
}
