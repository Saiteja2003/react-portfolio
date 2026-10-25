import { useEffect, useState } from "react";
import Lenis from "lenis";

// Smooth scrolling for wheel input only. Touch scrolling and reduced-motion
// visitors keep the browser's native behaviour.
export function useLenis(enabled) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const instance = new Lenis({ lerp: 0.12, smoothWheel: true });
    let rafId = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    });
    setLenis(instance);
    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [enabled]);

  return lenis;
}
