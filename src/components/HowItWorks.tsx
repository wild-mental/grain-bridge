"use client";

import Image, { type StaticImageData } from "next/image";
import { ClipboardCheck, HandCoins, Route, Truck, Wheat, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import wheatHarvest from "../../public/images/wheat-harvest-indiana.webp";
import matchingDesk from "../../public/images/ai-matching-planning-table.webp";
import grainShipLoading from "../../public/images/grain-ship-loading-duluth.webp";
import portSudan from "../../public/images/port-sudan-food-aid-unloading.webp";
import petonville from "../../public/images/petonville-food-distribution.webp";

/** Same order as `t.how.steps`. `ai` marks an AI-generated illustration (labelled on the thumbnail). */
const stepVisuals: { image: StaticImageData; icon: LucideIcon; ai?: boolean }[] = [
  { image: wheatHarvest, icon: Wheat },
  { image: matchingDesk, icon: Route, ai: true },
  { image: grainShipLoading, icon: HandCoins },
  { image: portSudan, icon: Truck },
  { image: petonville, icon: ClipboardCheck },
];

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.how;

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-24 bg-muted/60 py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading id="how-title" eyebrow={h.eyebrow} title={h.title} body={h.body} />

        <ol className="relative mt-12 grid gap-8 md:mt-14 md:grid-cols-5 md:gap-4">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span className="absolute bottom-10 left-10 top-10 w-px bg-border md:hidden" aria-hidden="true" />
          <span className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-border md:block" aria-hidden="true" />

          {h.steps.map((step, i) => {
            const visual = stepVisuals[i];
            const Icon = visual.icon;
            return (
              <li key={step.title} className="relative">
                <Reveal delay={i * 80} className="flex gap-5 md:flex-col md:items-center md:text-center">
                  <div className="relative h-20 w-20 shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-md ring-4 ring-background">
                      <Image src={visual.image} alt={step.imageAlt} fill placeholder="blur" sizes="80px" className="object-cover" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow ring-2 ring-background">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {visual.ai && (
                      <span className="absolute -left-1 -top-1 rounded-full bg-overlay px-1.5 py-0.5 text-[10px] font-bold leading-none text-white ring-2 ring-background">
                        {h.aiBadge}
                      </span>
                    )}
                  </div>
                  <div className="pt-1 md:pt-0">
                    <p className="text-xs font-bold tabular-nums tracking-widest text-primary">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
