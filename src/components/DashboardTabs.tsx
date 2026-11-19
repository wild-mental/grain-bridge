"use client";

import Image, { type StaticImageData } from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SurplusTable from "./SurplusTable";
import ShortageTable from "./ShortageTable";
import { ArrowUpRight, ArrowDownRight, BarChartBig } from "lucide-react";
import SurplusShortageChart from "./SurplusShortageChart";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import grainElevators from "../../public/images/grain-elevators-st-albert.webp";
import mutareWarehouse from "../../public/images/food-warehouse-mutare.webp";

function TabHeader({ image, alt, title, desc }: { image: StaticImageData; alt: string; title: string; desc: string }) {
  return (
    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">
        <Image src={image} alt={alt} fill placeholder="blur" sizes="112px" className="object-cover" />
      </div>
      <div className="space-y-1.5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </div>
    </CardHeader>
  );
}

export default function DashboardTabs() {
  const { t } = useLanguage();
  const d = t.dashboard;
  return (
    <section id="dashboard" aria-labelledby="dashboard-title" className="scroll-mt-24 bg-muted/60 py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading id="dashboard-title" eyebrow={d.eyebrow} title={d.title} body={d.body} />
        <Reveal className="mt-10 md:mt-12">
          <Tabs defaultValue="surplus" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-1 sm:h-12 sm:grid-cols-3">
              <TabsTrigger value="surplus" className="py-2.5">
                <ArrowUpRight className="mr-2 h-4 w-4 text-surplus-strong" aria-hidden="true" /> {d.tabSurplus}
              </TabsTrigger>
              <TabsTrigger value="shortage" className="py-2.5">
                <ArrowDownRight className="mr-2 h-4 w-4 text-shortage" aria-hidden="true" /> {d.tabShortage}
              </TabsTrigger>
              <TabsTrigger value="visualization" className="py-2.5">
                <BarChartBig className="mr-2 h-4 w-4" aria-hidden="true" /> {d.tabGlobal}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="surplus" className="mt-6">
              <Card>
                <TabHeader image={grainElevators} alt={d.surplusImageAlt} title={d.surplusTitle} desc={d.surplusDesc} />
                <CardContent>
                  <SurplusTable />
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{d.source}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shortage" className="mt-6">
              <Card>
                <TabHeader image={mutareWarehouse} alt={d.shortageImageAlt} title={d.shortageTitle} desc={d.shortageDesc} />
                <CardContent>
                  <ShortageTable />
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{d.source}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="visualization" className="mt-6">
              <SurplusShortageChart />
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
