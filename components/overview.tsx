"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export type OverviewChart = {
  name: string;
  total: number;
};

interface OverviewProps {
  data: OverviewChart[];
}

export default function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          stroke="#888888"
        />
        <YAxis
          stroke="#888888"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(v) => `$${v}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
