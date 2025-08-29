import { cn } from "@/lib/utils";
import React from "react";
import { BsFillDropletFill } from "react-icons/bs";
import { FaDumbbell, FaRunning } from "react-icons/fa";

const challenges = [
  {
    icon: FaRunning,
    name: "10K Steps Challenge",
    endsIn: "Ends in 5 days",
    participants: 3245,
    today: 124,
    completion: 68,
    status: "Active",
    color: 'bg-blue-100 text-blue-500 rounded-full box-border text-lg w-8 h-8 p-2'
  },
  {
    icon: FaDumbbell,
    name: "Summer Strength Challenge",
    endsIn: "Ends in 12 days",
    participants: 2781,
    today: 89,
    completion: 42,
    status: "Active",
    color: 'bg-blue-100 text-purple-500 rounded-full box-border text-lg w-8 h-8 p-2'
  },
  {
    icon: BsFillDropletFill,
    name: "Hydration Challenge",
    endsIn: "Ends in 3 days",
    participants: 1952,
    today: 45,
    completion: 78,
    status: "Active",
    color: 'bg-blue-100 text-yellow-500 rounded-full box-border text-lg w-8 h-8 p-2'
  },
];

const ActiveChallenges = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-xl py-6 shadow-md", className)}>
      <h2 className="text-lg font-semibold mb-4 text-gray-800 px-4">
        Active Challenges
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="text-left text-gray-600 bg-gray-100 border-b">
              <th className="py-2 px-4">Challenge</th>
              <th className="py-2 px-4">Participants</th>
              <th className="py-2 px-4">Completion</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 flex">
                      <c.icon className={c.color} />
                      <div className="flex flex-col ml-2">
                        {c.name}
                        <span className="text-xs text-gray-500">
                          {c.endsIn}
                        </span>
                      </div>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800">
                    {c.participants.toLocaleString()}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500 ml-1">
                    +{c.today} today
                  </span>
                </td>
                <td className="px-4 py-3 w-1/3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${c.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {c.completion}% completed
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-2xl">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveChallenges;
