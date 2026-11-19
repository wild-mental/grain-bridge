"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardTabs from '@/components/DashboardTabs';
import ImpactBoard from '@/components/ImpactBoard';
import IpcPopulationChart from '@/components/IpcPopulationChart';
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
import MatchMaker from '@/components/MatchMaker';
import { Wand2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

const ipcData = [
  { year: 2019, population: 135, gap: 8.4 },
  { year: 2020, population: 155, gap: 9.7 },
  { year: 2021, population: 193, gap: 12.1 },
  { year: 2022, population: 258, gap: 16.1 },
  { year: 2023, population: 282, gap: 17.6 },
  { year: 2024, population: 295, gap: 18.5 },
];


export default function Home() {
  const { t, locale } = useLanguage();
  const n = t.need;
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-12 md:mb-20">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-foreground tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.hero.body}
          </p>
        </section>

        <section className="mb-12 md:mb-20">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{n.title}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              {n.body}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{n.cardTitle}</CardTitle>
              <CardDescription>
                {n.cardDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IpcPopulationChart data={ipcData} />

              <div className="rounded-lg border">
                <Table>
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
                        <TableCell className="text-right font-semibold text-destructive">{data.gap.toLocaleString(locale)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Accordion type="single" collapsible className="w-full mt-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{n.faqQ}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <p>{n.faqP1Before}<strong>{n.faqP1Strong}</strong>{n.faqP1After}</p>
                      <p>{n.faqP2}</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
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
        </section>

        <DashboardTabs />

        <section id="match-and-donate" className="mb-12 md:mb-20">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <Wand2 className="h-8 w-8 text-primary" />
              {t.match.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              {t.match.body}
            </p>
          </div>
          <MatchMaker />
        </section>

        <ImpactBoard />

      </main>
      <Footer />
    </div>
  );
}
