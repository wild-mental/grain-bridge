"use client"

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HelpingHand, Scale, Wheat } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import riceSacks from "../../public/images/rice-sacks-stack-iloilo.webp";

const impactData = {
  tonnesMoved: 5300000,
  kcalDelivered: 18.5e12,
  livesImpacted: 24000000,
};

const FORECAST_YEAR = '2025';

const chartData = [
  { year: '2021', target: 12.1 },
  { year: '2022', target: 16.1 },
  { year: '2023', target: 17.6 },
  { year: '2024', target: 18.5 },
  { year: FORECAST_YEAR, mitigated: 5.3, target: 19.5 }, // 2025 is predictive
];

const forecast = chartData[chartData.length - 1];

/** Diagonal hatch so the forecast reads as different without relying on colour. */
function HatchSwatch() {
  return (
    <svg width="14" height="14" aria-hidden="true" className="shrink-0 rounded-sm">
      <rect width="14" height="14" fill="hsl(var(--success) / 0.15)" stroke="hsl(var(--success))" strokeDasharray="3 2" />
      <path d="M-2,4 l6,-6 M0,14 l14,-14 M10,16 l6,-6" stroke="hsl(var(--success))" strokeWidth="2" />
    </svg>
  );
}

export default function ImpactBoard() {
  const { t, locale } = useLanguage();
  const d = t.impact;
  const fmt1 = (n: number, digits = 1) => n.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const pct = Math.round(((forecast.mitigated ?? 0) / forecast.target) * 100);

  const tiles = [
    { icon: Scale, label: d.tonnes, note: d.tonnesNote, value: impactData.tonnesMoved / 1e6, format: (n: number) => `${fmt1(n, 2)}M` },
    { icon: Wheat, label: d.kcal, note: d.kcalNote, value: impactData.kcalDelivered / 1e12, format: (n: number) => d.kcalValue(fmt1(n, 2)) },
  ];

  return (
    <section id="impact" aria-labelledby="impact-title" className="relative isolate scroll-mt-24 overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
      <Image src={riceSacks} alt={d.bgAlt} fill placeholder="blur" sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/95 via-primary/90 to-overlay/95" aria-hidden="true" />

      <div className="container px-4 sm:px-8">
        <SectionHeading id="impact-title" tone="dark" eyebrow={d.eyebrow} title={d.title} body={d.body} />

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          <Reveal className="md:col-span-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm md:p-8">
              <p className="flex items-center justify-center gap-2 font-medium text-white/85">
                <HelpingHand className="h-5 w-5 text-accent" aria-hidden="true" />
                {d.people}
              </p>
              <CountUp
                value={impactData.livesImpacted}
                format={(n) => Math.round(n).toLocaleString(locale)}
                className="mt-2 block font-headline text-5xl font-bold tabular-nums text-white md:text-6xl"
              />
              <p className="mt-2 text-sm text-white/75">{d.peopleNote}</p>
            </div>
          </Reveal>
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <Reveal key={tile.label} delay={(i + 1) * 80}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white/85">{tile.label}</p>
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <CountUp value={tile.value} format={tile.format} className="mt-2 block text-3xl font-bold tabular-nums text-white" />
                  <p className="mt-1 text-xs text-white/75">{tile.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 md:mt-12">
          <Card className="text-card-foreground">
            <CardHeader>
              <p className="font-headline text-3xl font-bold tabular-nums text-success md:text-4xl">
                {d.headline(fmt1(forecast.mitigated ?? 0), fmt1(forecast.target))}
              </p>
              <p className="text-sm text-muted-foreground">{d.headlineNote(pct)}</p>
              <CardTitle className="pt-4 text-xl">{d.chartTitle}</CardTitle>
              <CardDescription>{d.chartDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-sm bg-shortage/25" aria-hidden="true" />
                  {d.seriesRequired}
                </span>
                <span className="inline-flex items-center gap-2">
                  <HatchSwatch />
                  {d.seriesForecast}
                </span>
              </div>
              <div className="h-[320px] w-full tabular-nums">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 8, left: -10, bottom: 5 }}>
                    <defs>
                      <pattern id="hatch-forecast" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                        <rect width="8" height="8" fill="hsl(var(--success) / 0.15)" />
                        <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--success))" strokeWidth="3" />
                      </pattern>
                    </defs>
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} Mt`} />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted) / 0.6)' }}
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(value: number, name: string) => [`${value.toLocaleString(locale)} Mt`, name]}
                    />
                    <Bar dataKey="mitigated" name={d.seriesDelivered} radius={[4, 4, 0, 0]}>
                      {chartData.map((entry) => {
                        const isForecast = entry.year === FORECAST_YEAR;
                        return (
                          <Cell
                            key={`cell-${entry.year}`}
                            fill={isForecast ? 'url(#hatch-forecast)' : 'hsl(var(--success))'}
                            stroke="hsl(var(--success))"
                            strokeDasharray={isForecast ? "4 3" : undefined}
                            strokeWidth={isForecast ? 1.5 : 0}
                          />
                        );
                      })}
                    </Bar>
                    <Bar dataKey="target" fill="hsl(var(--shortage) / 0.25)" name={d.seriesRequired} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{d.source}</p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
