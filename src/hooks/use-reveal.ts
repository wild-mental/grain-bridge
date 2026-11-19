"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "static": render as-is (SSR, reduced motion, or already on screen at mount).
 * "hidden": below the fold, waiting to enter the viewport.
 * "shown": has entered the viewport; animate in.
 */
export type RevealPhase = "static" | "hidden" | "shown";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** One IntersectionObserver per element; content stays visible without JS. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already visible

    setPhase("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, phase };
}
