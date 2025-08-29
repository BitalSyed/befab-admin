import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#8b5cf6", "#ec4899"];

export default function FitnessDashboard() {
  const dailyActivityData = [
    { day: "Mon", steps: 8000, calories: 500, activeMinutes: 30 },
    { day: "Tue", steps: 8200, calories: 520, activeMinutes: 32 },
    { day: "Wed", steps: 8400, calories: 540, activeMinutes: 34 },
    { day: "Thu", steps: 8600, calories: 560, activeMinutes: 36 },
    { day: "Fri", steps: 9000, calories: 600, activeMinutes: 40 },
    { day: "Sat", steps: 10500, calories: 700, activeMinutes: 50 },
    { day: "Sun", steps: 9200, calories: 620, activeMinutes: 42 },
  ];

  const vitalsData = [
    { week: "Week 1", heartRate: 75, bmi: 24, fat: 22 },
    { week: "Week 2", heartRate: 74, bmi: 23.8, fat: 21.5 },
    { week: "Week 3", heartRate: 73, bmi: 23.5, fat: 21 },
    { week: "Week 4", heartRate: 72, bmi: 23.4, fat: 20.8 },
    { week: "Week 5", heartRate: 71, bmi: 23.2, fat: 20.5 },
    { week: "Week 6", heartRate: 70, bmi: 23, fat: 20.2 },
    { week: "Week 7", heartRate: 69, bmi: 22.8, fat: 20 },
    { week: "Week 8", heartRate: 68, bmi: 22.6, fat: 19.8 },
  ];

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

  const workoutTypes = [
    { name: "Cardio", value: 30 },
    { name: "Strength", value: 25 },
    { name: "Yoga", value: 15 },
    { name: "Pilates", value: 10 },
    { name: "HIIT", value: 12 },
    { name: "Other", value: 8 },
  ];

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
              <Area type="monotone" dataKey="steps" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="calories" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              <Area type="monotone" dataKey="activeMinutes" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workout Type Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={workoutTypes}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {workoutTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
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
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="bmi" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="fat" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Engagement & Goal Achievement</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" />
              <Bar dataKey="goals" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}