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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A mixed bar chart";

const chartData = [
  { browser: "Workouts", visitors: 90, fill: "var(--color-Workouts)" },
  { browser: "Nutrition", visitors: 80, fill: "var(--color-Nutrition)" },
  { browser: "Goals", visitors: 60, fill: "var(--color-Goals)" },
  { browser: "Social", visitors: 55, fill: "var(--color-Social)" },
  { browser: "Sleep", visitors: 40, fill: "var(--color-Sleep)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Workouts: {
    label: "Workouts",
    color: "#3366ff",
  },
  Nutrition: {
    label: "Nutrition",
    color: "#009933",
  },
  Goals: {
    label: "Goals",
    color: "#ff9900",
  },
  Social: {
    label: "Social",
    color: "#9933ff",
  },
  Sleep: {
    label: "Sleep",
    color: "#ff3399",
  },
};

export function FeatureUsage({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Featured Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />

            <XAxis
              dataKey="visitors"
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]} // <- custom tick values
            />
            <CartesianGrid vertical={true} horizontal={false} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
