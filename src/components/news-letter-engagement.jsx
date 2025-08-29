import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const HealthMetrics = ({className, data}) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    if (data) {
      setMetrics([
        {
          title: "Average Creation Rate",
          value: data.lastMonth.rate,
          color: "bg-blue-500",
          width: `${data.lastMonth.rate}`,
        },
        {
          title: "Per Day Rate",
          value: data.average.perDay + "%",
          color: "bg-green-500",
          width: `${data.average.perDay}%`,
        },
      ]);
    }
  }, [data]);

  return (
    <div className={cn("bg-white rounded-xl shadow-md p-6 space-y-6", className)}>
      <h2 className="text-xl font-semibold text-gray-800">Creation Summary</h2>

      {metrics.map((metric, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1 text-sm text-gray-600">
            <span>{metric.title}</span>
            <span>{metric.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`${metric.color} h-2.5 rounded-full`} style={{width: metric.width}}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthMetrics;
