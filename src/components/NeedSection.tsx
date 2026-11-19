"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IpcPopulationChart from "./IpcPopulationChart";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import riceHarvest from "../../public/images/rice-harvest-texas.webp";

// Population in IPC/CH Phase 3+ (millions), Global Report on Food Crises 2020–2025 editions (rounded).
// Required grain (Mt) is a GrainBridge estimate.
const ipcData = [
  { year: 2019, population: 135, gap: 8.4 },
  { year: 2020, population: 155, gap: 9.7 },
  { year: 2021, population: 193, gap: 12.1 },
  { year: 2022, population: 258, gap: 16.1 },
  { year: 2023, population: 282, gap: 17.6 },
  { year: 2024, population: 295, gap: 18.5 },
];

export default function NeedSection() {
  const { t, locale } = useLanguage();
  const n = t.need;
  const first = ipcData[0];
  const last = ipcData[ipcData.length - 1];
  const ratio = (last.population / first.population).toLocaleString(locale, { maximumFractionDigits: 1 });

  return (
    <section aria-labelledby="need-title" className="bg-background">
      {/* Narrow photo strip: surplus already exists */}
      <div className="relative isolate h-[220px] overflow-hidden md:h-[240px]">
        <Image src={riceHarvest} alt={n.photoAlt} fill placeholder="blur" sizes="100vw" className="-z-20 object-cover object-[center_60%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-overlay/85 via-overlay/50 to-overlay/10" aria-hidden="true" />
        <div className="container flex h-full flex-col justify-end px-4 pb-6 sm:px-8">
          <p className="font-headline text-2xl font-bold text-white md:text-3xl">{n.photoCaption}</p>
          <p className="mt-1 text-sm text-white/85">{n.photoSub}</p>
        </div>
      </div>

      <div className="container px-4 py-16 sm:px-8 md:py-24">
        <SectionHeading id="need-title" eyebrow={n.eyebrow} title={n.title} body={n.body} />

        <Reveal className="mt-10 md:mt-12">
          <Card>
            <CardHeader>
              {/* Headline number first; the chart is its evidence. */}
              <p className="font-headline text-3xl font-bold tabular-nums text-foreground md:text-4xl">
                {n.headline(last.population, last.year)}
              </p>
              <p className="mt-1">
                <span className="inline-flex rounded-full bg-shortage/10 px-3 py-0.5 text-sm font-bold text-shortage">
                  {n.headlineRatio(ratio, first.year)}
                </span>
              </p>
              <CardTitle className="pt-4 text-xl">{n.cardTitle}</CardTitle>
              <CardDescription>{n.cardDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <IpcPopulationChart data={ipcData} />
              <p className="-mt-4 mb-8 text-xs leading-relaxed text-muted-foreground">{n.source}</p>

              <div className="rounded-lg border">
                <Table className="tabular-nums">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{n.colYear}</TableHead>
                      <TableHead className="text-right">{n.colPopulation}</TableHead>
                      <TableHead className="text-right">{n.colGrain}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipcData.map((data) => (
                      <TableRow key={data.year}>
                        <TableCell className="font-medium">{data.year}</TableCell>
                        <TableCell className="text-right">{data.population.toLocaleString(locale)}</TableCell>
                        <TableCell className="text-right font-semibold text-shortage">{data.gap.toLocaleString(locale)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Accordion type="single" collapsible className="mt-6 w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{n.faqQ}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <p>{n.faqP1Before}<strong>{n.faqP1Strong}</strong>{n.faqP1After}</p>
                      <p>{n.faqP2}</p>
                      <ul className="list-disc space-y-1 pl-6 text-sm">
                        {n.phases.map((phase) => (
                          <li key={phase.label}><strong>{phase.label}</strong>{phase.text}</li>
                        ))}
                      </ul>
                      <p><strong>{n.faqP3Strong}</strong>{n.faqP3After}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
