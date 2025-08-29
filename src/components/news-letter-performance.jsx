import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const NewsLetterPerformance = ({ className, data }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (data) {
      setNews(data); // store incoming data in state
    }
  }, [data]);

  return (
    <div
      className={cn("bg-white rounded-xl shadow-md p-6 space-y-6", className)}
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Newsletter Author
      </h2>

      {news.slice(0, 5).map((item) => (
        <div
          key={item._id}
          className="flex items-start justify-between border-b pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
        >
          {/* Left side: profile + author */}
          <div className="flex items-center space-x-3">
            {/* Profile Picture */}
            {item.author && item.author.profilePicture ? (
              <img
                src={item.author.profilePicture}
                alt={item.title}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold 
      ${
        [
          "bg-red-500",
          "bg-green-500",
          "bg-blue-500",
          "bg-yellow-500",
          "bg-purple-500",
          "bg-pink-500",
          "bg-indigo-500",
        ][Math.floor(Math.random() * 7)]
      }
    `}
              >
                <span>
                  {item.author.firstName?.charAt(0).toUpperCase()}
                  {item.author.lastName?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <p className="font-medium text-gray-900">
                {item.author.firstName} {item.author.lastName}
              </p>
              <p className="text-sm text-gray-500">{item.author.username}</p>
            </div>
          </div>

          {/* Center: Title */}
          <div className="flex-1 text-center px-4">
            <p className="font-semibold text-gray-800">{item.title}</p>
          </div>

          {/* Right side: Date */}
          <div className="text-sm text-gray-500">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsLetterPerformance;
