import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const SurveyResults = ({ className, data }) => {
  const [metrics, setChallenges] = useState([]);
  useEffect(() => {
    if (!data) return;
    console.log(data);
    setChallenges(
      data.surveys?.map((e) => {
        return {
          title: e.title,
          value: (e.completionRate/2).toFixed(2) + "/5",
          color: "bg-green-500",
          width: `${e.completionRate * 100}%`,
        };
      })
    );
  }, [data]);
  // const metrics = [
  //   {
  //     title: 'User Satisfaction',
  //     value: '4.7/5',
  //     color: 'bg-green-500',
  //     width: 'w-[94%]',
  //   },
  //   {
  //     title: 'App Usability',
  //     value: '4.3/5',
  //     color: 'bg-green-500',
  //     width: 'w-[86%]',
  //   },
  //   {
  //     title: 'Workout Content',
  //     value: '4.5/5',
  //     color: 'bg-green-500',
  //     width: 'w-[90%]',
  //   },
  //   {
  //     title: 'Nutrition Tracking',
  //     value: '3.9/5',
  //     color: 'bg-orange-500',
  //     width: 'w-[78%]',
  //   },
  //   {
  //     title: 'Survvey Results',
  //     value: '4.1/5',
  //     color: 'bg-green-500',
  //     width: 'w-[82%]',
  //   },
  // ];

  return (
    <div
      className={cn("bg-white rounded-xl shadow-md p-6 space-y-6", className)}
    >
      <h2 className="text-xl font-semibold text-gray-800">Survey Results</h2>

      {metrics &&
        metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1 text-sm text-gray-600">
              <span>{metric.title}</span>
              <span>{metric.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${metric.color} h-2.5 rounded-full`}
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SurveyResults;
