"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { surplusData } from "@/data/mock-data";
import { shortageData } from "@/data/mock-data";
import { useLanguage } from "@/i18n/LanguageProvider";

const processData = () => {
  const continentData: { [key: string]: { surplus: number; shortage: number } } = {};

  surplusData.forEach(item => {
    if (!continentData[item.continent]) {
      continentData[item.continent] = { surplus: 0, shortage: 0 };
    }
    continentData[item.continent].surplus += item.amount;
  });

  shortageData.forEach(item => {
    if (!continentData[item.continent]) {
      continentData[item.continent] = { surplus: 0, shortage: 0 };
    }
    // Shortage amounts are negative, so we use Math.abs
    continentData[item.continent].shortage += Math.abs(item.amount);
  });
  
  return Object.keys(continentData).map(continent => ({
    continent,
    surplus: continentData[continent].surplus,
    shortage: continentData[continent].shortage,
  }));
}

export default function SurplusShortageChart() {
  const { t, tr } = useLanguage();
  const d = t.dashboard;
  const chartData = processData().map((row) => ({ ...row, continent: tr(row.continent) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{d.chartTitle}</CardTitle>
        <CardDescription>{d.chartDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis 
                dataKey="continent" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} Mt`} 
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}/>
              <Bar dataKey="surplus" name={d.seriesSurplus} fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shortage" name={d.seriesShortage} fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
