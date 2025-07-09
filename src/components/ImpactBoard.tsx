
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { HelpingHand, Scale, Wheat } from "lucide-react";

const impactData = {
  tonnesMoved: 5300000,
  kcalDelivered: 18.5e12,
  livesImpacted: 24000000,
};

const chartData = [
  { year: '2021', target: 12.1 },
  { year: '2022', target: 16.1 },
  { year: '2023', target: 17.6 },
  { year: '2024', target: 18.5 },
  { year: '2025', mitigated: 5.3, target: 19.5 }, // 2025 is predictive
];

export default function ImpactBoard() {
  return (
    <section id="impact" className="py-12 md:py-20 bg-secondary/50 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Collective Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every donation contributes to a larger movement, creating tangible change across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="md:col-span-2 flex flex-col items-center justify-center p-6 text-center">
            <CardHeader className="p-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <HelpingHand className="h-5 w-5 text-muted-foreground" />
                People Supported
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-5xl font-bold text-primary">
                {impactData.livesImpacted.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Estimated reach based on caloric needs (predicted)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tonnes Delivered</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(impactData.tonnesMoved / 1000000).toFixed(2)}M
              </div>
              <p className="text-xs text-muted-foreground">
                Total grain tonnes shipped to date (predicted)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">kCal Delivered</CardTitle>
              <Wheat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(impactData.kcalDelivered / 1e12).toFixed(2)} Trillion
              </div>
              <p className="text-xs text-muted-foreground">
                Providing essential energy to communities (predicted)
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>IPC 3+ Required vs. Delivered Grain (Million Tonnes)</CardTitle>
            <CardDescription>This chart shows the required grain (in million tonnes) to meet minimum caloric needs versus the actual and projected amounts delivered. The 2025 projection is indicated with a dashed outline.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value} Mt`} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number, name: string) => [`${value.toLocaleString()} Mt`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '14px' }}/>
                  <Bar dataKey="mitigated" name="Delivered (Predicted)" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.year === '2025' ? 'hsla(120, 60%, 70%, 0.7)' : 'hsl(120, 60%, 70%)'}
                        stroke={entry.year === '2025' ? '#000000' : 'none'}
                        strokeDasharray={entry.year === '2025' ? "4 4" : "0"}
                        strokeWidth={entry.year === '2025' ? 1.5 : 0}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="target" fill="hsl(var(--primary) / 0.2)" name="Required Gap" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
