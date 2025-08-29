import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import React from "react";
import data from "../app/dashboard/data.json";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartPieLabel } from "@/components/pie-chart";
import { ChartBarStacked } from "@/components/bar-chart";
import { NutritionTracking } from "@/components/nutrition-tracking";
import HealthMetrics from "@/components/health-metrics";
import ActiveChallenges from "@/components/active-challenges";
import { FeatureUsage } from "@/components/feature-usage";
import { NotificationPerformance } from "@/components/notification-performance";
import SupportTicket from "@/components/support-ticket";
import SurveyResults from "@/components/survey-results";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex flex-wrap justify-between px-8 gap-5">
        <div className="flex">
          <h1 className="font-extrabold text-2xl mr-5">Analytics Overview</h1>
          <p className="bg-green-100 text-green-800 rounded-2xl px-4 py-0 tracking-wider text-nowrap text-xs flex items-center">
            Last Updated 5min ago
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="!flex !items-center">
            <svg
              width="17"
              height="17"
              className="mb-1"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.25 1.95996C9.25 1.40684 8.80313 0.959961 8.25 0.959961C7.69688 0.959961 7.25 1.40684 7.25 1.95996V9.54434L4.95625 7.25059C4.56563 6.85996 3.93125 6.85996 3.54063 7.25059C3.15 7.64121 3.15 8.27559 3.54063 8.66621L7.54063 12.6662C7.93125 13.0568 8.56563 13.0568 8.95625 12.6662L12.9563 8.66621C13.3469 8.27559 13.3469 7.64121 12.9563 7.25059C12.5656 6.85996 11.9312 6.85996 11.5406 7.25059L9.25 9.54434V1.95996ZM2.25 11.96C1.14688 11.96 0.25 12.8568 0.25 13.96V14.96C0.25 16.0631 1.14688 16.96 2.25 16.96H14.25C15.3531 16.96 16.25 16.0631 16.25 14.96V13.96C16.25 12.8568 15.3531 11.96 14.25 11.96H11.0781L9.6625 13.3756C8.88125 14.1568 7.61562 14.1568 6.83437 13.3756L5.42188 11.96H2.25ZM13.75 13.71C13.9489 13.71 14.1397 13.789 14.2803 13.9296C14.421 14.0703 14.5 14.261 14.5 14.46C14.5 14.6589 14.421 14.8496 14.2803 14.9903C14.1397 15.1309 13.9489 15.21 13.75 15.21C13.5511 15.21 13.3603 15.1309 13.2197 14.9903C13.079 14.8496 13 14.6589 13 14.46C13 14.261 13.079 14.0703 13.2197 13.9296C13.3603 13.789 13.5511 13.71 13.75 13.71Z"
                fill="#374151"
              />
            </svg>
            Export
          </Button>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Last 7 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="1">Last Month</SelectItem>
                <SelectItem value="3">Last 3 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center lg:justify-between items-start">
          <ChartAreaInteractive className="w-full lg:w-[70%]" />
          <ChartPieLabel title="" className="w-full lg:w-[40%]" />
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center lg:justify-between">
          <ChartBarStacked title="" className="w-full lg:w-[50%]" />
          <NutritionTracking className="w-full lg:w-[50%]" />
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center lg:justify-between">
          <HealthMetrics title="" className="w-full lg:w-[35%]" />
          <ActiveChallenges className="w-full lg:w-[65%]" />
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center lg:justify-between items-start">
          <FeatureUsage title="" className="w-full lg:w-[35%]" />
          <NotificationPerformance className="w-full lg:w-[65%]" />
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center lg:justify-between">
          <SupportTicket title="" className="w-full lg:w-[50%]" />
          <SurveyResults className="w-full lg:w-[50%]" />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
