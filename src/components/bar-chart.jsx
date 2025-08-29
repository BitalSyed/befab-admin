"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartData = [
  { month: "Mon", desktop: 1860, mobile: 800, hiit: 500, other: 800 },
  { month: "Tue", desktop: 3050, mobile: 2000, hiit: 500, other: 800 },
  { month: "Wed", desktop: 2370, mobile: 1200, hiit: 500, other: 800 },
  { month: "Thu", desktop: 730, mobile: 1900, hiit: 500, other: 800 },
  { month: "Fri", desktop: 2090, mobile: 1300, hiit: 500, other: 800 },
  { month: "Sat", desktop: 2140, mobile: 1400, hiit: 500, other: 800 },
  { month: "Sun", desktop: 2140, mobile: 1400, hiit: 500, other: 800 },
];

const chartConfig = {
  desktop: {
    label: "Cardio",
    color: "#3333ff",
  },
  mobile: {
    label: "Strength",
    color: "#33cc33",
  },
  hiit: {
    label: "HIIT",
    color: "#ff9900",
  },
  other: {
    label: "Other",
    color: "#6600cc",
  },
};

export function ChartBarStacked({className}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex w-full justify-between">
        <CardTitle>Physical Activity</CardTitle>
<span className="border border-gray-200 text-sm rounded-md px-5 py-1">All Activities</span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `${value / 1000}k`}
              ticks={[0, 2500, 5000, 7500, 10000]}
              domain={[0, 10000]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="other"
              stackId="a"
              fill="var(--color-other)"
              barSize={40}
            //   radius={[0, 0, 4, 4]}
            /><Bar
              dataKey="hiit"
              stackId="a"
              fill="var(--color-hiit)"
              barSize={40}
            //   radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              barSize={40}
            //   radius={[4, 4, 0, 0]}
            /><Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              barSize={40}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
