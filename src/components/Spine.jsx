import { useEffect, useRef } from "react";

/**
 * The thread that runs down the page: a hairline on the left that fills as
 * you scroll, with a node for each chapter and the current chapter's name at
 * its tip. On phones it becomes a progress hairline along the top.
 * One CSS variable per frame of scrolling; positions are measured on resize.
 */
export default function Spine({ chapters }) {
  const spineRef = useRef(null);
  const labelRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    let frame = 0;
    let offsets = [];
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      spineRef.current?.style.setProperty("--p", p.toFixed(4));
      let active = -1;
      offsets.forEach((o, i) => {
        if (p + 0.0001 >= o) active = i;
      });
      nodesRef.current.forEach((n, i) =>
        n?.classList.toggle("is-passed", i <= active),
      );
      const c = chapters[active];
      const text = c ? c.index : "";
      if (labelRef.current && labelRef.current.textContent !== text)
        labelRef.current.textContent = text;
    };
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      offsets = chapters.map((c) => {
        const el = document.getElementById(c.id);
        if (!el || max <= 0) return 0;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max));
      });
      nodesRef.current.forEach((node, i) => {
        if (node)
          node.style.transform = `translateY(calc(${offsets[i]} * var(--spine-h)))`;
      });
      update();
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

  return (
    <div className="spine" aria-hidden="true" ref={spineRef}>
      <div className="spine__track">
        <div className="spine__fill" />
        {chapters.map((c, i) => (
          <span
            key={c.id}
            className="spine__node"
            ref={(el) => (nodesRef.current[i] = el)}
          />
        ))}
        <span className="spine__tip">
          <span className="spine__label" ref={labelRef} />
        </span>
      </div>
    </div>
  );
}
