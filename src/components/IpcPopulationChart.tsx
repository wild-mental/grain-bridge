"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useLanguage } from "@/i18n/LanguageProvider";

interface IpcPopulationChartProps {
  data: {
    year: number;
    population: number;
    gap: number;
  }[];
}

/** People in need use the shortage colour; earlier years are lighter so the latest value reads first. */
export default function IpcPopulationChart({ data }: IpcPopulationChartProps) {
  const { t, locale } = useLanguage();
  const lastIndex = data.length - 1;
  const opacity = (i: number) => 0.4 + (0.6 * i) / Math.max(1, lastIndex);

  return (
    <div className="mb-8 h-[300px] w-full tabular-nums">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 28, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
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
            cursor={{ fill: 'hsl(var(--muted) / 0.6)' }}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number) => [`${value.toLocaleString(locale)} ${t.ipcChart.tooltipUnit}`, t.ipcChart.tooltipName]}
          />
          <Bar dataKey="population" name={t.ipcChart.series} radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.year}`} fill="hsl(var(--shortage))" fillOpacity={opacity(index)} />
            ))}
            {/* Direct label on the latest value instead of a legend. */}
            <LabelList
              dataKey="population"
              content={(props) => {
                const { x, y, width, value, index } = props as { x: number; y: number; width: number; value: number; index: number };
                if (index !== lastIndex) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={700}
                    fill="hsl(var(--shortage))"
                  >
                    {`${value.toLocaleString(locale)}M`}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
