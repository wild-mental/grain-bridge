import { cn } from "@/lib/utils";

/** Eyebrow + title + lead paragraph. `tone="dark"` is for photo or primary backgrounds. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  body,
  align = "center",
  tone = "default",
  className,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "center" | "left";
  tone?: "default" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] sm:text-sm",
          dark ? "text-accent" : "text-primary",
        )}
      >
        <span className={"h-px w-6 bg-accent"} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-3 font-headline text-3xl font-bold leading-tight md:text-4xl",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {body && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", dark ? "text-white/85" : "text-muted-foreground")}>
          {body}
        </p>
      )}
    </div>
  );
}
