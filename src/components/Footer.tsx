"use client";

import Link from "next/link";
import { Camera, ExternalLink, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { CreditItem } from "@/i18n/dictionary";
import GrainBridgeLogo from "./Logo";

function PhotoCredits() {
  const { t } = useLanguage();
  const c = t.credits;
  const items = c.items as CreditItem[];
  return (
    <details className="rounded-lg border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
      <summary className="flex cursor-pointer items-center gap-2 font-medium text-foreground">
        <Camera className="h-4 w-4" aria-hidden="true" />
        {c.title}
      </summary>
      <p className="mt-3 leading-relaxed">{c.note}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.subject} className="leading-relaxed">
            {item.ai && (
              <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-overlay px-2 py-0.5 text-xs font-bold text-white">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                {c.aiLabel}
              </span>
            )}
            <span className="text-foreground">{item.subject}</span> — {item.author} ·{" "}
            {item.licenseHref ? (
              <a
                href={item.licenseHref}
                target="_blank"
                rel="noopener noreferrer license"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {item.license}
              </a>
            ) : (
              item.license
            )}
            {item.href && (
              <>
                {" · "}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-2 hover:text-primary"
                >
                  {c.source}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto space-y-6 px-4 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <GrainBridgeLogo className="h-6 w-6 text-primary" />
            <p className="text-sm font-semibold">GrainBridge</p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.rights}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/principles" className="text-sm font-medium hover:underline">{t.footer.principles}</Link>
            <Link href="/privacy" className="text-sm hover:underline">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-sm hover:underline">{t.footer.terms}</Link>
          </div>
        </div>
        <p className="text-center text-xs leading-relaxed text-muted-foreground md:text-left">{t.footer.prototype}</p>
        <PhotoCredits />
      </div>
    </footer>
  );
}
