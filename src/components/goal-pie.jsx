"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"

const chartData = [
  { browser: "chrome", visitors: 50, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 500, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 400, fill: "var(--color-edge)" },
  { browser: "other", visitors: 150, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#ff33cc",
  },
  safari: {
    label: "Safari",
    color: "#0066ff",
  },
  firefox: {
    label: "Firefox",
    color: "#00cc66",
  },
  edge: {
    label: "Edge",
    color: "#ff9900",
  },
  other: {
    label: "Other",
    color: "#9933ff",
  },
}

export function ChartPieLabel() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Goal Types Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square !w-[300px] !h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
