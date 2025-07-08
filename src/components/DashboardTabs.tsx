import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SurplusTable from "./SurplusTable";
import ShortageTable from "./ShortageTable";
import MatchMaker from "./MatchMaker";
import { ArrowUpRight, ArrowDownRight, Wand2, BarChartBig } from "lucide-react";
import SurplusShortageChart from "./SurplusShortageChart";

export default function DashboardTabs() {
  return (
    <section id="dashboard" className="mb-12 md:mb-20">
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Global Dashboard</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore real-time data on global grain surpluses and shortages. Use our Match & Donate tool to find opportunities for aid.
        </p>
      </div>
      <Tabs defaultValue="surplus" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 h-auto sm:h-12">
          <TabsTrigger value="surplus" className="py-2.5">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Surplus Zones
          </TabsTrigger>
          <TabsTrigger value="shortage" className="py-2.5">
            <ArrowDownRight className="mr-2 h-4 w-4" /> Shortage Zones
          </TabsTrigger>
          <TabsTrigger value="visualization" className="py-2.5">
            <BarChartBig className="mr-2 h-4 w-4" /> Global View
          </TabsTrigger>
          <TabsTrigger value="match" className="py-2.5">
            <Wand2 className="mr-2 h-4 w-4" /> Match & Donate
          </TabsTrigger>
        </TabsList>
        <TabsContent value="surplus" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Surplus Inventory</CardTitle>
              <CardDescription>Regions with overproduction or potential waste.</CardDescription>
            </CardHeader>
            <CardContent>
              <SurplusTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shortage" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Critical Shortages</CardTitle>
              <CardDescription>Regions facing food shortages due to crises and events.</CardDescription>
            </CardHeader>
            <CardContent>
              <ShortageTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visualization" className="mt-6">
          <SurplusShortageChart />
        </TabsContent>
        <TabsContent value="match" className="mt-6">
          <MatchMaker />
        </TabsContent>
      </Tabs>
    </section>
  );
}
