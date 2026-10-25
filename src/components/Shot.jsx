import { useRef } from "react";

const base = import.meta.env.BASE_URL;

// A real screenshot in a browser frame, tilted slightly by a mouse pointer.
export default function Shot({ src, w, h, url, alt, caption, eager = false }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${(-((e.clientY - r.top) / r.height - 0.5) * 3).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width - 0.5) * 4).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <figure className="shot">
      <div className="browser" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="browser__bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <em>{url}</em>
        </div>
        <img src={`${base}${src}`} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
      {caption && <figcaption className="mono-label">{caption}</figcaption>}
    </figure>
  );
}
