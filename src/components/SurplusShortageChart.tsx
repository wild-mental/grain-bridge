"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { surplusData, shortageData } from "@/data/mock-data";
import { useLanguage } from "@/i18n/LanguageProvider";

const processData = () => {
  const continentData: { [key: string]: { surplus: number; shortage: number } } = {};

  surplusData.forEach(item => {
    continentData[item.continent] ??= { surplus: 0, shortage: 0 };
    continentData[item.continent].surplus += item.amount;
  });

  shortageData.forEach(item => {
    continentData[item.continent] ??= { surplus: 0, shortage: 0 };
    // Shortage amounts are negative, so we use Math.abs
    continentData[item.continent].shortage += Math.abs(item.amount);
  });

  return Object.keys(continentData).map(continent => ({
    continent,
    surplus: continentData[continent].surplus,
    shortage: continentData[continent].shortage,
  }));
}

const totalSurplus = surplusData.reduce((sum, item) => sum + item.amount, 0);
const totalShortage = shortageData.reduce((sum, item) => sum + Math.abs(item.amount), 0);

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-3 w-3 rounded-sm" style={{ background: color }} aria-hidden="true" />
      {label}
    </span>
  );
}

export default function SurplusShortageChart() {
  const { t, tr, locale } = useLanguage();
  const d = t.dashboard;
  const chartData = processData().map((row) => ({ ...row, continent: tr(row.continent) }));
  const fmt = (n: number) => n.toLocaleString(locale, { maximumFractionDigits: 1 });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-headline text-3xl font-bold tabular-nums md:text-4xl">
          <span className="text-surplus-strong">{d.headlineSurplus} {fmt(totalSurplus)} Mt</span>
          <span className="text-shortage">{d.headlineShortage} {fmt(totalShortage)} Mt</span>
        </div>
        <p className="text-sm text-muted-foreground">{d.headlineNote}</p>
        <CardTitle className="pt-4 text-xl">{d.chartTitle}</CardTitle>
        <CardDescription>{d.chartDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-5 text-sm text-muted-foreground">
          <LegendSwatch color="hsl(var(--surplus))" label={d.seriesSurplus} />
          <LegendSwatch color="hsl(var(--shortage))" label={d.seriesShortage} />
        </div>
        <div className="h-[420px] w-full tabular-nums">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 8, left: -10, bottom: 5 }} barGap={4}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="continent"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={70}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} Mt`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted) / 0.6)' }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number, name: string) => [`${fmt(value)} Mt`, name]}
              />
              <Bar dataKey="surplus" name={d.seriesSurplus} fill="hsl(var(--surplus))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shortage" name={d.seriesShortage} fill="hsl(var(--shortage))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{d.source}</p>
      </CardContent>
    </Card>
  )
}
