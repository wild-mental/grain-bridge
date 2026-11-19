"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useLanguage } from "@/i18n/LanguageProvider";

interface IpcPopulationChartProps {
  data: {
    year: number;
    population: number;
    gap: number;
  }[];
}

export default function IpcPopulationChart({ data }: IpcPopulationChartProps) {
  const { t } = useLanguage();
  const populationValues = data.map(d => d.population);
  const minPopulation = Math.min(...populationValues);
  const maxPopulation = Math.max(...populationValues);

  const getColor = (population: number) => {
    // Avoid division by zero if all values are the same
    if (maxPopulation === minPopulation) {
      return 'hsl(0, 90%, 60%)'; // Return a default color
    }
    const percentage = (population - minPopulation) / (maxPopulation - minPopulation);
    // Interpolating lightness from a pinkish red (lightness ~75) to a deep red (lightness ~50)
    const lightness = 75 - percentage * 25;
    return `hsl(0, 90%, ${lightness}%)`;
  };

  return (
    <div className="h-[300px] w-full mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
          <XAxis 
            dataKey="year" 
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
            tickFormatter={(value) => `${value}M`} 
            domain={[0, (dataMax: number) => Math.ceil(dataMax / 50) * 50]}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number) => [`${value} ${t.ipcChart.tooltipUnit}`, t.ipcChart.tooltipName]}
          />
          <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}/>
          <Bar dataKey="population" name={t.ipcChart.series} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.population)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
