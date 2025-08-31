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
        <div className={`${chartConfig.other.color} text-5xl text-bold`}>{Math.round(chartData)}</div>
      </CardContent>
    </Card>
  );
}
