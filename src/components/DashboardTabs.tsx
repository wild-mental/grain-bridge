"use client";

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
import { useLanguage } from "@/i18n/LanguageProvider";

export default function DashboardTabs() {
  const { t } = useLanguage();
  const d = t.dashboard;
  return (
    <section id="dashboard" className="mb-12 md:mb-20">
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">{d.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {d.body}
        </p>
      </div>
      <Tabs defaultValue="surplus" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12">
          <TabsTrigger value="surplus" className="py-2.5">
            <ArrowUpRight className="mr-2 h-4 w-4" /> {d.tabSurplus}
          </TabsTrigger>
          <TabsTrigger value="shortage" className="py-2.5">
            <ArrowDownRight className="mr-2 h-4 w-4" /> {d.tabShortage}
          </TabsTrigger>
          <TabsTrigger value="visualization" className="py-2.5">
            <BarChartBig className="mr-2 h-4 w-4" /> {d.tabGlobal}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="surplus" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>{d.surplusTitle}</CardTitle>
              <CardDescription>{d.surplusDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <SurplusTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shortage" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>{d.shortageTitle}</CardTitle>
              <CardDescription>{d.shortageDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ShortageTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visualization" className="mt-6">
          <SurplusShortageChart />
        </TabsContent>
      </Tabs>
    </section>
  );
}
