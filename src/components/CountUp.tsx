"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

/** Counts from 0 to `value` within 1s when scrolled into view. Shows the final value without JS or with reduced motion. */
export default function CountUp({
  value,
  format,
  duration = 1000,
  className,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const { ref, phase } = useReveal<HTMLSpanElement>();
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    if (phase === "hidden") setCurrent(0);
    if (phase !== "shown") return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(current)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
