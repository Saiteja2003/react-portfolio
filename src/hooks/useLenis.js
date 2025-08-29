// src/hooks/useLenis.js

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

export function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Initialize Lenis
    const lenisInstance = new Lenis();
    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return lenis;
}
