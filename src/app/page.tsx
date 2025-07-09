import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardTabs from '@/components/DashboardTabs';
import ImpactBoard from '@/components/ImpactBoard';
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

const ipcData = [
  { year: 2019, population: 135, gap: 8.4 },
  { year: 2020, population: 155, gap: 9.7 },
  { year: 2021, population: 193, gap: 12.1 },
  { year: 2022, population: 258, gap: 16.1 },
  { year: 2023, population: 282, gap: 17.6 },
  { year: 2024, population: 295, gap: 18.5 },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-12 md:mb-20">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-foreground tracking-tight">
            Bridging Gaps, Nourishing Hope.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            GrainBridge connects global food surplus with regions in need.
            Explore live data, support shipments, and witness the impact of your contribution.
          </p>
        </section>

        <section className="mb-12 md:mb-20">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">The Urgent Need</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              The number of people facing acute food insecurity (IPC Phase 3 or above) is rising each year. Your support is crucial to bridge the gap between surplus and scarcity. Join compassionate global citizens to supply the needed grain and prevent hunger.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>The Widening Gap: IPC 3+ Population &amp; Grain Needs</CardTitle>
              <CardDescription>
                This table shows the alarming increase in populations facing food crises and the corresponding grain equivalent needed to meet their minimum caloric needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">IPC 3+ Population (millions)</TableHead>
                      <TableHead className="text-right">Required Grain (Million Tonnes)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipcData.map((data) => (
                      <TableRow key={data.year}>
                        <TableCell className="font-medium">{data.year}</TableCell>
                        <TableCell className="text-right">{data.population}</TableCell>
                        <TableCell className="text-right font-semibold text-destructive">{data.gap}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Accordion type="single" collapsible className="w-full mt-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the IPC and what does IPC 3+ mean?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <p>The <strong>Integrated Food Security Phase Classification (IPC)</strong> is a standardized scale that measures the severity of food insecurity. It helps governments and humanitarian actors understand the scale of the problem and decide on the best response.</p>
                      <p>The scale has five phases:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li><strong>IPC Phase 1:</strong> Minimal/None</li>
                        <li><strong>IPC Phase 2:</strong> Stressed</li>
                        <li><strong>IPC Phase 3: Crisis</strong> - Households are forced to sell essential assets or adopt crisis-coping strategies to afford food.</li>
                        <li><strong>IPC Phase 4: Emergency</strong> - Households face extreme food gaps, leading to high levels of acute malnutrition and excess mortality.</li>
                        <li><strong>IPC Phase 5: Catastrophe/Famine</strong> - Households have an extreme lack of food and/or other basic needs even after fully employing coping strategies.</li>
                      </ul>
                      <p><strong>IPC 3+</strong> refers to populations in the "Crisis", "Emergency", or "Catastrophe/Famine" phases. These are people in urgent need of assistance to save lives, reduce food gaps, and protect livelihoods.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <DashboardTabs />
        
        <ImpactBoard />

      </main>
      <Footer />
    </div>
  );
}
