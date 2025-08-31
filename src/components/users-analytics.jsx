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
import { useEffect, useState } from "react";

export const description = "A mixed bar chart";

// Default chart data if no data is provided
const defaultChartData = [
  { browser: "Workouts", visitors: 8500, fill: "var(--color-Workouts)" },
  { browser: "Nutrition", visitors: 5000, fill: "var(--color-Nutrition)" },
  { browser: "Goals", visitors: 2700, fill: "var(--color-Goals)" },
  { browser: "Social", visitors: 2200, fill: "var(--color-Social)" },
  { browser: "Sleep", visitors: 1500, fill: "var(--color-Sleep)" },
];

// Default chart config
const defaultChartConfig = {
  visitors: {
    label: "Likes",
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

export function FeatureUsage({ className, data }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState([]);
  const [maxValue, setMaxValue] = useState(9000);

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      setChartData(defaultChartData);
      setChartConfig(defaultChartConfig);
      setMaxValue(9000);
      return;
    }

    // Process the incoming data
    const formattedData = data.map(video => ({
      browser: video.title,
      visitors: video.likes?.length || 0,
      fill: "var(--color-primary)" // Use a consistent color or customize based on your theme
    }));

    // Sort by visitors in descending order
    formattedData.sort((a, b) => b.visitors - a.visitors);
    
    // Take top 5 videos
    const topVideos = formattedData.slice(0, 5);
    
    // Calculate max value for domain with some padding
    const calculatedMax = Math.ceil(Math.max(...topVideos.map(item => item.visitors)) * 1.1);
    
    // Generate dynamic chart config based on video titles
    const dynamicConfig = {
      visitors: {
        label: "Likes",
      },
      ...Object.fromEntries(
        topVideos.map((video, index) => [
          video.browser,
          {
            label: video.browser.length > 20 
              ? `${video.browser.substring(0, 20)}...` 
              : video.browser,
            color: `hsl(${index * 60}, 70%, 50%)`, // Generate different colors
          }
        ])
      )
    };

    setChartData(topVideos);
    setChartConfig(dynamicConfig);
    setMaxValue(calculatedMax);
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Performing Videos</CardTitle>
        <CardDescription>Videos with the most likes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              right: 10,
            }}
            barSize={40}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label || value}
              width={100}
            />

            <XAxis
              dataKey="visitors"
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              domain={[0, maxValue]}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}k`;
                }
                return value;
              }}
              // tickFormatter={(value) => `${value / 1000}k`} // Convert to k format
              allowDecimals={false}
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending upwards <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the top 5 videos by number of likes
        </div>
      </CardFooter>
    </Card>
  );
}