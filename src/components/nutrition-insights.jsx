import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Bot } from "lucide-react";

const mealData = [
  { name: "Breakfast", value: 400 },
  { name: "Lunch", value: 300 },
  { name: "Dinner", value: 300 },
  { name: "Snacks", value: 200 },
];

const COLORS = ["#3b82f6", "#facc15", "#8b5cf6", "#10b981"];

export default function NutritionInsights() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="">
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.220703"
                y="0.22998"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#E0E7FF"
              />
              <path
                d="M18.1914 11.7158C18.744 11.7158 19.1904 12.1623 19.1904 12.7148V14.7129H22.9368C24.1793 14.7129 25.1846 15.7182 25.1846 16.9607V25.4524C25.1846 26.695 24.1793 27.7002 22.9368 27.7002H13.4461C12.2035 27.7002 11.1982 26.695 11.1982 25.4524V16.9607C11.1982 15.7182 12.2035 14.7129 13.4461 14.7129H17.1924V12.7148C17.1924 12.1623 17.6388 11.7158 18.1914 11.7158ZM14.6948 23.7041C14.4201 23.7041 14.1953 23.9289 14.1953 24.2036C14.1953 24.4784 14.4201 24.7031 14.6948 24.7031H15.6939C15.9686 24.7031 16.1934 24.4784 16.1934 24.2036C16.1934 23.9289 15.9686 23.7041 15.6939 23.7041H14.6948ZM17.6919 23.7041C17.4172 23.7041 17.1924 23.9289 17.1924 24.2036C17.1924 24.4784 17.4172 24.7031 17.6919 24.7031H18.6909C18.9657 24.7031 19.1904 24.4784 19.1904 24.2036C19.1904 23.9289 18.9657 23.7041 18.6909 23.7041H17.6919ZM20.689 23.7041C20.4143 23.7041 20.1895 23.9289 20.1895 24.2036C20.1895 24.4784 20.4143 24.7031 20.689 24.7031H21.688C21.9627 24.7031 22.1875 24.4784 22.1875 24.2036C22.1875 23.9289 21.9627 23.7041 21.688 23.7041H20.689ZM16.4431 19.708C16.4431 19.3768 16.3116 19.0592 16.0774 18.825C15.8432 18.5908 15.5255 18.4592 15.1943 18.4592C14.8631 18.4592 14.5455 18.5908 14.3113 18.825C14.0771 19.0592 13.9456 19.3768 13.9456 19.708C13.9456 20.0392 14.0771 20.3568 14.3113 20.591C14.5455 20.8252 14.8631 20.9568 15.1943 20.9568C15.5255 20.9568 15.8432 20.8252 16.0774 20.591C16.3116 20.3568 16.4431 20.0392 16.4431 19.708ZM21.1885 20.9568C21.5197 20.9568 21.8373 20.8252 22.0715 20.591C22.3057 20.3568 22.4373 20.0392 22.4373 19.708C22.4373 19.3768 22.3057 19.0592 22.0715 18.825C21.8373 18.5908 21.5197 18.4592 21.1885 18.4592C20.8573 18.4592 20.5397 18.5908 20.3055 18.825C20.0713 19.0592 19.9397 19.3768 19.9397 19.708C19.9397 20.0392 20.0713 20.3568 20.3055 20.591C20.5397 20.8252 20.8573 20.9568 21.1885 20.9568ZM9.69971 18.709H10.1992V24.7031H9.69971C8.87239 24.7031 8.20117 24.0319 8.20117 23.2046V20.2075C8.20117 19.3802 8.87239 18.709 9.69971 18.709ZM26.6831 18.709C27.5105 18.709 28.1817 19.3802 28.1817 20.2075V23.2046C28.1817 24.0319 27.5105 24.7031 26.6831 24.7031H26.1836V18.709H26.6831Z"
                fill="#4F46E5"
              />
            </svg>
          </div>
          <CardTitle className="text-lg font-semibold">
            AI-Powered Nutrition Insights
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className="text-xs text-purple-700 border-purple-200 bg-purple-50"
        >
          Updated 15 min ago
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Most Logged Foods */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="text-sm text-black font-medium">
              Most-Logged Foods
            </div>
            <div className="space-y-5 text-sm text-muted-foreground mt-5">
              <div className="flex justify-between">
                <span>Chicken Breast</span>
                <span className="text-blue-600 font-medium">23.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Greek Yogurt</span>
                <span className="text-blue-600 font-medium">18.7%</span>
              </div>
              <div className="flex justify-between">
                <span>Banana</span>
                <span className="text-blue-600 font-medium">15.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Eggs</span>
                <span className="text-blue-600 font-medium">14.5%</span>
              </div>
              <div className="flex justify-between">
                <span>Protein Shake</span>
                <span className="text-blue-600 font-medium">12.8%</span>
              </div>
            </div>
          </div>

          {/* Popular Meal Types */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground font-medium mb-2">
              Popular Meal Types
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mealData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {mealData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Global Portion Size Trends */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground font-medium mb-2">
              Global Portion Size Trends
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Protein Portions", value: "+12%", positive: true },
                { label: "Carb Portions", value: "-8%", positive: false },
                { label: "Vegetable Portions", value: "+5%", positive: true },
                { label: "Fruit Portions", value: "+15%", positive: true },
                { label: "Dessert Portions", value: "-3%", positive: false },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span>{item.label}</span>
                    <span
                      className={`${
                        item.positive ? "text-green-600" : "text-red-600"
                      } font-medium`}
                    >
                      {item.value} vs avg
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.positive ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.abs(parseInt(item.value))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
