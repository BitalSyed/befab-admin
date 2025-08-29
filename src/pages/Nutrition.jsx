import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NutritionCards from "@/components/nutrition-cards";
import { ChartLineDots } from "@/components/nutrition-calorie";
import { ChartBarStacked } from "@/components/nutrition-macronutrient";
import DashboardCharts from "@/components/nutrition-hydration";
import ActivityFeed from "@/components/nutrition-activity";
import NutritionInsights from "@/components/nutrition-insights";

const Nutrition = () => {
  return (
    <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
      <div>
        <ul className="w-full flex overflow-x-scroll lg:overflow-x-auto text-nowrap lg:text-wrap relative before:absolute before:w-full before:bottom-0 before:border-b-2 before:border-gray-200">
          <li className="tab relative text-blue-700 font-semibold hover:text-blue-700 text-[15px] text-center py-3 px-6 border-b-2 border-blue-700 cursor-pointer transition-all">
            Dashboard & Analytics
          </li>
          <li className="tab relative text-slate-600 font-medium hover:text-blue-700 text-[15px] text-center py-3 px-6 border-b-2 border-gray-200 cursor-pointer transition-all">
            Food & Meal Management
          </li>
          <li className="tab relative text-slate-600 font-medium hover:text-blue-700 text-[15px] text-center py-3 px-6 border-b-2 border-gray-200 cursor-pointer transition-all">
            Meal Logging & User Data
          </li>
          <li className="tab relative text-slate-600 font-medium hover:text-blue-700 text-[15px] text-center py-3 px-6 border-b-2 border-gray-200 cursor-pointer transition-all">
            Nutrition Tracking & Insights
          </li>
          <li className="tab relative text-slate-600 font-medium hover:text-blue-700 text-[15px] text-center py-3 px-6 border-b-2 border-gray-200 cursor-pointer transition-all">
            Content & Tips
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Nutrition Dashboard</h1>
            <p className="text-sm text-[#166534] bg-[#DCFCE7] px-2 py-1 rounded-2xl">
              Last updated: 2 min ago
            </p>
          </div>
          <div className="flex gap-3">
            {/* Your SVG code remains the same */}
            <Select>
              <SelectTrigger className="w-[150px] bg-white text-sm">
                <SelectValue placeholder="Last 7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Last 7 days</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <NutritionCards />
      <div>
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center lg:justify-between">
          <ChartLineDots className="w-full lg:w-[50%]" />
          <ChartBarStacked title="" className="w-full lg:w-[50%] flex flex-col justify-between" />
        </div>
      </div>
      <DashboardCharts/>
      <ActivityFeed/>
      <NutritionInsights/>
    </div>
  );
};

export default Nutrition;
