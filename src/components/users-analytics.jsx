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
  { browser: "Workouts", visitors: 8500, fill: "var(--color-Workouts)" },
  { browser: "Nutrition", visitors: 5000, fill: "var(--color-Nutrition)" },
  { browser: "Goals", visitors: 2700, fill: "var(--color-Goals)" },
  { browser: "Social", visitors: 2200, fill: "var(--color-Social)" },
  { browser: "Sleep", visitors: 1500, fill: "var(--color-Sleep)" },
];

const chartConfig = {
  visitors: {
    label: "Views",
  },
  Workouts: {
    label: "10 Min morning energizer",
    color: "#3366ff",
  },
  Nutrition: {
    label: "Full Body Strength Workout",
    color: "#3366ff",
  },
  Goals: {
    label: "Yoga for Flexibility",
    color: "#3366ff",
  },
  Social: {
    label: "Healthy Meal Prep Guide",
    color: "#3366ff",
  },
  Sleep: {
    label: "Core workout challenge",
    color: "#3366ff",
  },
};

export function FeatureUsage({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Performing Videos</CardTitle>
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
            barSize={40}
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
              domain={[0, 9000]} // Adjusted domain to match the k format
              tickFormatter={(value) => `${value / 1000}k`} // Convert to k format
              ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]} // Values in actual numbers
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
