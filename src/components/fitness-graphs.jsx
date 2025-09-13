import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { Value } from "@radix-ui/react-select";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
];

export default function FitnessDashboard({ data }) {
  useEffect(() => {
    if (!data || !data.data) return;

    // 1. Get all unique dates from one of the metrics
    const dates = Object.keys(data.data["HealthDataType.STEPS"] || {});

    // 2. Map over dates to create daily objects
    const formattedDailyActivity = dates.map((dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const dayObj = new Date(year, month - 1, day); // fix month indexing

      return {
        day: dayObj.toLocaleDateString("en-US", { weekday: "short" }),
        steps: data.data["HealthDataType.STEPS"][dateStr] || 0,
        calories:
          data.data["HealthDataType.TOTAL_CALORIES_BURNED"][dateStr].toFixed(
            2
          ) || 0,
        distance:
          (data.data["HealthDataType.DISTANCE_DELTA"][dateStr]*0.621371).toFixed(2) || 0,
        workouts: data.data["HealthDataType.WORKOUTS"][dateStr].toFixed(2) || 0,
        sleep: data.data["HealthDataType.SLEEP_SESSION"][dateStr].toFixed(2) || 0,
        heartRate: data.data["HealthDataType.HEART_RATE"][dateStr].toFixed(2) || 0,
        bmi: data.data["HealthDataType.BODY_MASS_INDEX"][dateStr].toFixed(2) || 0,
        fat: data.data["HealthDataType.BODY_FAT_PERCENTAGE"][dateStr].toFixed(2) || 0,
      };
    });

    setdailyActivityData(formattedDailyActivity);
    setvitalsData(formattedDailyActivity);
    console.log(formattedDailyActivity);
  }, [data]);


  const [dailyActivityData, setdailyActivityData] = useState([]);
  const [vitalsData, setvitalsData] = useState([]);

  // [
  //   { day: "Mon", steps: 8000, calories: 500, activeMinutes: 30 },
  //   { day: "Tue", steps: 8200, calories: 520, activeMinutes: 32 },
  //   { day: "Wed", steps: 8400, calories: 540, activeMinutes: 34 },
  //   { day: "Thu", steps: 8600, calories: 560, activeMinutes: 36 },
  //   { day: "Fri", steps: 9000, calories: 600, activeMinutes: 40 },
  //   { day: "Sat", steps: 10500, calories: 700, activeMinutes: 50 },
  //   { day: "Sun", steps: 9200, calories: 620, activeMinutes: 42 },
  // ];

  // const vitalsData = [
  //   { week: "Week 1", heartRate: 75, bmi: 24, fat: 22 },
  //   { week: "Week 2", heartRate: 74, bmi: 23.8, fat: 21.5 },
  //   { week: "Week 3", heartRate: 73, bmi: 23.5, fat: 21 },
  //   { week: "Week 4", heartRate: 72, bmi: 23.4, fat: 20.8 },
  //   { week: "Week 5", heartRate: 71, bmi: 23.2, fat: 20.5 },
  //   { week: "Week 6", heartRate: 70, bmi: 23, fat: 20.2 },
  //   { week: "Week 7", heartRate: 69, bmi: 22.8, fat: 20 },
  //   { week: "Week 8", heartRate: 68, bmi: 22.6, fat: 19.8 },
  // ];

  const engagementData = [
    { week: "Week 1", users: 60, goals: 50 },
    { week: "Week 2", users: 65, goals: 55 },
    { week: "Week 3", users: 70, goals: 58 },
    { week: "Week 4", users: 75, goals: 65 },
    { week: "Week 5", users: 78, goals: 70 },
    { week: "Week 6", users: 80, goals: 75 },
    { week: "Week 7", users: 82, goals: 78 },
    { week: "Week 8", users: 85, goals: 80 },
  ];

  // const workoutTypes = [
  //   { name: "Cardio", value: 30 },
  //   { name: "Strength", value: 25 },
  //   { name: "Yoga", value: 15 },
  //   { name: "Pilates", value: 10 },
  //   { name: "HIIT", value: 12 },
  //   { name: "Other", value: 8 },
  // ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Daily Activity Trends</CardTitle>
          <Badge variant="outline">Daily</Badge>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyActivityData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="steps"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="calories"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="distance"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Vitals & Body Composition</CardTitle>
          <Badge variant="outline">Heart Rate</Badge>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalsData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#ef4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="fat"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
