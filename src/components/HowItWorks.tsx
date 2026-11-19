"use client";

import Image, { type StaticImageData } from "next/image";
import { ChevronsRight, ClipboardCheck, HandCoins, Route, Truck, Wheat, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import wheatHarvest from "../../public/images/wheat-harvest-indiana.webp";
import matchingDesk from "../../public/images/ai-matching-planning-table.webp";
import grainShipLoading from "../../public/images/grain-ship-loading-duluth.webp";
import portSudan from "../../public/images/port-sudan-food-aid-unloading.webp";
import petonville from "../../public/images/petonville-food-distribution.webp";

/** Same order as `t.how.steps`. `ai` marks an AI-generated illustration (labelled on the card). */
const stepVisuals: { image: StaticImageData; icon: LucideIcon; ai?: boolean }[] = [
  { image: wheatHarvest, icon: Wheat },
  { image: matchingDesk, icon: Route, ai: true },
  { image: grainShipLoading, icon: HandCoins },
  { image: portSudan, icon: Truck },
  { image: petonville, icon: ClipboardCheck },
];

/**
 * Card placement per step.
 * Phone: a horizontal scroll-snap row of portrait cards.
 * md: two columns, the last card spans both.
 * lg: a six-column grid laid out 3 + 2, so the second row's cards are wider.
 */
const cardLayout = [
  { item: "lg:col-span-2", frame: "md:aspect-[4/3]" },
  { item: "lg:col-span-2", frame: "md:aspect-[4/3]" },
  { item: "lg:col-span-2", frame: "md:aspect-[4/3]" },
  { item: "lg:col-span-3", frame: "md:aspect-[4/3] lg:aspect-[2/1]" },
  { item: "md:col-span-2 lg:col-span-3", frame: "md:aspect-[8/3] lg:aspect-[2/1]" },
];

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.how;

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-24 bg-muted/60 py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading id="how-title" eyebrow={h.eyebrow} title={h.title} body={h.body} />

        <div
          role="region"
          aria-label={h.galleryLabel}
          tabIndex={0}
          className="-mx-4 mt-10 overflow-x-auto px-4 pb-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:-mx-8 sm:px-8 md:mx-0 md:mt-14 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <ol className="flex snap-x snap-mandatory scroll-px-4 gap-4 sm:scroll-px-8 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-6">
            {h.steps.map((step, i) => {
              const visual = stepVisuals[i];
              const layout = cardLayout[i];
              const Icon = visual.icon;
              return (
                <li key={step.title} className={cn("w-[80%] shrink-0 snap-start sm:w-[55%] md:w-auto", layout.item)}>
                  <Reveal delay={i * 80} className="h-full">
                    <div className="group relative isolate h-full overflow-hidden rounded-2xl bg-overlay shadow-md ring-1 ring-black/5">
                      <div className={cn("relative aspect-[4/5] w-full", layout.frame)}>
                        <Image
                          src={visual.image}
                          alt={step.imageAlt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 768px) 50vw, 80vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      </div>
                      {/* Bottom gradient keeps the white text readable on any photo */}
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-overlay/95 via-overlay/60 to-transparent"
                        aria-hidden="true"
                      />

                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold tabular-nums tracking-widest text-accent-foreground shadow">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-overlay/60 text-white backdrop-blur-sm">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      {visual.ai && (
                        <span className="absolute right-4 top-4 rounded-full bg-overlay/70 px-2 py-0.5 text-[11px] font-bold text-white">
                          {h.aiBadge}
                        </span>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <h3 className="text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/85 md:text-base">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-3 flex items-center justify-end gap-1 text-xs font-medium text-muted-foreground md:hidden" aria-hidden="true">
          {h.swipeHint}
          <ChevronsRight className="h-4 w-4" />
        </p>
      </div>
    </section>
  );
}
