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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A stacked area chart with expand stacking";

const chartData = [
  { month: "January", desktop: 4000, mobile: 3000, other: 3000 },
  { month: "February", desktop: 4500, mobile: 3500, other: 2500 },
  { month: "March", desktop: 3000, mobile: 4000, other: 3000 },
  { month: "April", desktop: 3500, mobile: 3500, other: 3000 },
  { month: "May", desktop: 3800, mobile: 3700, other: 3200 },
  { month: "June", desktop: 3900, mobile: 4100, other: 3000 },
];


const chartConfig = {
  desktop: {
    label: "Total Users",
    color: "#3B82F6",
  },
  mobile: {
    label: "Active Users",
    color: "#10B981",
  },
  other: {
    label: "New Signups",
    color: "#F59E0B",
  },
};

export function GoalChart({className}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">Goal Completion Rates
            <Select>
                          <SelectTrigger className="w-[150px] text-sm">
                            <SelectValue placeholder="Last 30 Days" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Last 30 Days</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 5, right: 5, top: 5, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `${value / 1000}k`}
              ticks={[0, 10000, 20000, 30000]}
              domain={[0, 30000]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
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
            {/* Middle Layer: Active Users */}
            <Area
              dataKey="mobile"
              type="monotone"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            {/* Top Layer: Total Users */}
            <Area
              dataKey="desktop"
              type="monotone"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
