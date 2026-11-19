"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionary";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
];

/** Slim bar at the very top of the site with a KO / EN switch. */
export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="w-full border-b border-border/40 bg-secondary/60">
      <div className="container flex h-9 items-center justify-end gap-2">
        <Languages className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <div role="radiogroup" aria-label={t.langToggleLabel} className="inline-flex rounded-md border border-border bg-background p-0.5">
          {OPTIONS.map((opt) => {
            const active = lang === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                lang={opt.value}
                onClick={() => setLang(opt.value)}
                className={`rounded px-3 py-0.5 text-xs font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
