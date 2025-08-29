"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

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

export const description = "A stacked area chart with expand stacking";

export function ChartAreaInteractive({className, title, percentage, up, chartConfig, chartData}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardTitle className="text-2xl">{percentage} <span className="text-xs text-green-500">{up}</span></CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 5, right: 5, top: 5, bottom: 5 }}
          >
            {/* <CartesianGrid vertical={false} strokeDasharray="3 3" /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* Bottom Layer: New Signups */}
            <Area
              dataKey="other"
              type="monotone"
              fill="var(--color-other)"
              fillOpacity={0.1}
              stroke="var(--color-other)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
