"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

/** Fades content up 14px when it scrolls into view (250ms, ease-out). Off for reduced motion. */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, phase } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={phase === "shown" && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-[250ms] motion-safe:ease-out",
        phase === "hidden" ? "translate-y-3.5 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
