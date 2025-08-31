import React, { useEffect, useState } from "react";
import { ChartAreaInteractive } from "./competition-line";
import { NotificationPerformance } from "./competition-performance";

const CompetitionAnalytics = ({ data }) => {
  const [chartData1, setChartData1] = useState(0); // averageParticipants
  const [chartData2, setChartData2] = useState(0); // completionRate
  const [chartData3, setChartData3] = useState(0); // totalRanks

  useEffect(() => {
    if (!data || data.length === 0) return;

    let totalParticipants = 0;
    let completedCount = 0;
    let totalRanks = 0;

    data.forEach((c) => {
      totalParticipants += c.participants?.length || 0;
      if (c.status === "completed") completedCount++;
      totalRanks += c.leaderboard?.length || 0;
    });

    const averageParticipants = totalParticipants / data.length;
    const completionRate = (completedCount / data.length) * 100; // percentage
    const averageRanks = totalRanks / data.length;

    // ✅ Store values in chartData1,2,3
    setChartData1(averageParticipants);
    setChartData2(completionRate.toFixed(2)); // keep as number or string
    setChartData3(totalRanks);
  }, [data]);

  return (
    data && (
      <div className="px-4 py-6 rounded-md bg-white shadow-sm">
        <div className="flex justify-between gap-5">
          <ChartAreaInteractive
            className="w-[40%]"
            chartData={chartData1}
            chartConfig={{ other: { label: "Data", color: "text-[#3B82F6]" } }}
            percentage={data?.stats?.average?.participants}
            title="Average Participants"
          />
          <ChartAreaInteractive
            className="w-[40%]"
            chartData={chartData2}
            chartConfig={{ other: { label: "Data", color: "text-[#10B981]" } }}
            percentage={data?.stats?.completion?.rate}
            title="Completion Rate"
          />
          <ChartAreaInteractive
            className="w-[40%]"
            chartData={chartData3}
            chartConfig={{ other: { label: "Data", color: "text-[#F59E0B]" } }}
            percentage={data?.stats?.lastMonth?.rate}
            title="Total Leaderboard Entries"
          />
        </div>
        {/* <NotificationPerformance className="mt-5" /> */}
      </div>
    )
  );
};

export default CompetitionAnalytics;
