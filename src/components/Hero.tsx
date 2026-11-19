"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BadgeCheck, Eye, FileSearch, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";
import portSudan from "../../public/images/port-sudan-food-aid-unloading.webp";

const trustIcons: LucideIcon[] = [BadgeCheck, FileSearch, Eye];

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <>
      <section aria-labelledby="hero-title" className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-overlay md:items-center">
        <Image
          src={portSudan}
          alt={h.imageAlt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="-z-20 object-cover object-[60%_center]"
        />
        {/* Mobile: text spans the full width, so darken from the bottom. Desktop: darken the left where the text sits. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-overlay/95 via-overlay/75 to-overlay/40 md:bg-gradient-to-r md:from-overlay/90 md:via-overlay/60 md:to-overlay/20"
          aria-hidden="true"
        />
        <div className="container px-4 pb-14 pt-24 sm:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {h.eyebrow}
            </p>
            <h1 id="hero-title" className="mt-4 font-headline text-4xl font-bold leading-[1.15] text-white sm:text-5xl md:text-6xl">
              {h.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">{h.body}</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg" className="h-12 bg-accent px-6 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90">
                <a href="#match-and-donate">
                  {t.cta.fund}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <a
                href="#dashboard"
                className="inline-flex items-center gap-1.5 font-medium text-white underline-offset-4 hover:underline"
              >
                {t.cta.viewData}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <p className="absolute bottom-2 right-3 max-w-[70%] rounded bg-overlay/70 px-2 py-0.5 text-right text-[11px] leading-tight text-white/90 md:right-6">
          {h.photoCaption}
        </p>
      </section>

      {/* Trust strip */}
      <section aria-label={t.trust.label} className="bg-primary text-primary-foreground">
        <div className="container px-4 py-8 sm:px-8">
          <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
            {t.trust.items.map((item, i) => {
              const Icon = trustIcons[i] ?? BadgeCheck;
              return (
                <li key={item.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/80">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link
            href="/principles"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t.trust.principlesLink}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
