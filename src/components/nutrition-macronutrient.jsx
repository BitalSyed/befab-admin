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
  { month: "Mon", desktop: 5, mobile: 12, hiit: 50 },
  { month: "Tue", desktop: 5, mobile: 12, hiit: 50 },
  { month: "Wed", desktop: 5, mobile: 12, hiit: 50 },
  { month: "Thu", desktop: 5, mobile: 12, hiit: 50 },
  { month: "Fri", desktop: 9, mobile: 12, hiit: 50 },
  { month: "Sat", desktop: 5, mobile: 12, hiit: 50 },
  { month: "Sun", desktop: 5, mobile: 12, hiit: 50 },
];

const chartConfig = {
  desktop: {
    label: "Protein",
    color: "#3333ff",
  },
  mobile: {
    label: "Carbs",
    color: "#33cc33",
  },
  hiit: {
    label: "Fats",
    color: "#ff9900",
  },
};

export function ChartBarStacked({className}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex w-full justify-between">
        <CardTitle>Macronutrient Distribution</CardTitle>

        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `${value}`}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} /><Bar
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
