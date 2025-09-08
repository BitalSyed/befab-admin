import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const HealthMetrics = ({ className, data }) => {
  const [metrics, setMetrics] = useState([])
  // [
  //   {
  //     title: "Average Weight",
  //     value: "168.5 lbs",
  //     color: "bg-blue-500",
  //     width: "w-[75%]",
  //   },
  //   {
  //     title: "Avg. Resting Heart Rate",
  //     value: "68 bpm",
  //     color: "bg-green-500",
  //     width: "w-[55%]",
  //   },
  //   {
  //     title: "Avg. Sleep Duration",
  //     value: "7.2 hours",
  //     color: "bg-purple-500",
  //     width: "w-[85%]",
  //   },
  //   {
  //     title: "Avg. Daily Steps",
  //     value: "8,452",
  //     color: "bg-yellow-500",
  //     width: "w-[70%]",
  //   },
  // ];
  useEffect(() => {
  if (!data || !data.data) return;
  
  const newMetrics = {};
  
  Object.entries(data.data).forEach(([dataType, dailyValues]) => {
    let total = 0;
    
    // Sum all the daily values for this data type
    Object.values(dailyValues).forEach(value => {
      total += value;
    });
    
    newMetrics[dataType] = total;
  });
  
  console.log(newMetrics)
  setMetrics([
    {
      title: "Average Weight",
      value: `${newMetrics["HealthDataType.WEIGHT"]?.toFixed(2)} KG`,
      color: "bg-blue-500",
      width: `w-[${(newMetrics["HealthDataType.WEIGHT"]/80.7)*100}%]`,
    },
    {
      title: "Avg. Resting Heart Rate",
      value: `${newMetrics["HealthDataType.HEART_RATE"]} bpm`,
      color: "bg-green-500",
      width: `w-[${(newMetrics["HealthDataType.HEART_RATE"]/85)*100}%]`,
    },
    {
      title: "Avg. Sleep Duration",
      value: `${newMetrics["HealthDataType.SLEEP_SESSION"]} min`,
      color: "bg-purple-500",
      width: `w-[${(newMetrics["HealthDataType.SLEEP_SESSION"]/8)*100}%]`,
    },
    {
      title: "Avg. Daily Steps",
      value: `${newMetrics["HealthDataType.STEPS"]}`,
      color: "bg-yellow-500",
      width: `w-[${(newMetrics["HealthDataType.STEPS"]/2000)*100}%]`,
    },
  ]);
}, [data]); 

  return (
    <div
      className={cn("bg-white rounded-xl shadow-md p-6 space-y-6", className)}
    >
      <h2 className="text-xl font-semibold text-gray-800">Health Metrics</h2>

      {metrics.map((metric, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1 text-sm text-gray-600">
            <span>{metric.title}</span>
            <span>{metric.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${metric.color} h-2.5 rounded-full ${metric.width}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthMetrics;
