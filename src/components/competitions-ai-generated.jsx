import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Sparkles, Brain } from "lucide-react";

const suggestions = [
  {
    icon: <ScrollText className="h-5 w-5 text-purple-500" />,
    title: "Autumn Running Series",
    desc: "A 6-week progressive running challenge with weekly distance goals and achievement badges.",
    timeframe: "Sep 15 - Oct 31, 2023",
    reasons: [
      "Running activity up 23% in the last month",
      "Seasonal transition ideal for outdoor activity",
    ],
  },
  {
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    title: "Nutrition Reset Challenge",
    desc: "A 21-day healthy eating challenge focused on meal planning and macro tracking.",
    timeframe: "Aug 1 - Aug 21, 2023",
    reasons: [
      "High user forum activity about nutrition",
      "Previous nutrition challenges had 78% completion rate",
    ],
  },
  {
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    title: "Mindfulness & Recovery",
    desc: "A 30-day challenge focusing on meditation, stretching, and recovery techniques.",
    timeframe: "Aug 15 - Sep 15, 2023",
    reasons: [
      "Increased searches for recovery content",
      "Complements current high-intensity challenges",
    ],
  },
];

const AiSuggestions = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-semibold">
            AI-Generated Competition Suggestions
          </h1>
          <p className="text-sm text-gray-500">
            Based on user activity and engagement patterns
          </p>
        </div>
        <a href="#" className="text-sm font-medium text-[#862633]">
          View All Suggestions
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((s, i) => (
          <Card key={i} className="border rounded-lg shadow-sm bg-[#F9FAFB]">
            <CardContent className="p-4 py-0 space-y-2">
              <div className="flex items-center gap-2">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.460007"
                    y="0.720703"
                    width="31.99"
                    height="31.99"
                    rx="15.995"
                    fill="#F3E8FF"
                  />
                  <path
                    d="M16.4503 8.22656C17.0028 8.22656 17.4493 8.673 17.4493 9.22559V11.2236H21.1956C22.4382 11.2236 23.4434 12.2289 23.4434 13.4714V21.9632C23.4434 23.2057 22.4382 24.211 21.1956 24.211H11.7049C10.4624 24.211 9.45708 23.2057 9.45708 21.9632V13.4714C9.45708 12.2289 10.4624 11.2236 11.7049 11.2236H15.4512V9.22559C15.4512 8.673 15.8977 8.22656 16.4503 8.22656ZM12.9537 20.2149C12.6789 20.2149 12.4542 20.4396 12.4542 20.7144C12.4542 20.9891 12.6789 21.2139 12.9537 21.2139H13.9527C14.2274 21.2139 14.4522 20.9891 14.4522 20.7144C14.4522 20.4396 14.2274 20.2149 13.9527 20.2149H12.9537ZM15.9507 20.2149C15.676 20.2149 15.4512 20.4396 15.4512 20.7144C15.4512 20.9891 15.676 21.2139 15.9507 21.2139H16.9498C17.2245 21.2139 17.4493 20.9891 17.4493 20.7144C17.4493 20.4396 17.2245 20.2149 16.9498 20.2149H15.9507ZM18.9478 20.2149C18.6731 20.2149 18.4483 20.4396 18.4483 20.7144C18.4483 20.9891 18.6731 21.2139 18.9478 21.2139H19.9468C20.2216 21.2139 20.4464 20.9891 20.4464 20.7144C20.4464 20.4396 20.2216 20.2149 19.9468 20.2149H18.9478ZM14.702 16.2188C14.702 15.8876 14.5704 15.5699 14.3362 15.3357C14.102 15.1015 13.7844 14.97 13.4532 14.97C13.122 14.97 12.8044 15.1015 12.5702 15.3357C12.336 15.5699 12.2044 15.8876 12.2044 16.2188C12.2044 16.55 12.336 16.8676 12.5702 17.1018C12.8044 17.336 13.122 17.4675 13.4532 17.4675C13.7844 17.4675 14.102 17.336 14.3362 17.1018C14.5704 16.8676 14.702 16.55 14.702 16.2188ZM19.4473 17.4675C19.7785 17.4675 20.0962 17.336 20.3304 17.1018C20.5645 16.8676 20.6961 16.55 20.6961 16.2188C20.6961 15.8876 20.5645 15.5699 20.3304 15.3357C20.0962 15.1015 19.7785 14.97 19.4473 14.97C19.1161 14.97 18.7985 15.1015 18.5643 15.3357C18.3301 15.5699 18.1986 15.8876 18.1986 16.2188C18.1986 16.55 18.3301 16.8676 18.5643 17.1018C18.7985 17.336 19.1161 17.4675 19.4473 17.4675ZM7.95854 15.2197H8.45806V21.2139H7.95854C7.13123 21.2139 6.46001 20.5427 6.46001 19.7154V16.7183C6.46001 15.891 7.13123 15.2197 7.95854 15.2197ZM24.942 15.2197C25.7693 15.2197 26.4405 15.891 26.4405 16.7183V19.7154C26.4405 20.5427 25.7693 21.2139 24.942 21.2139H24.4425V15.2197H24.942Z"
                    fill="#A855F7"
                  />
                </svg>

                <span className="text-sm font-medium text-[#6B21A8]">
                  AI Suggestion
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  Generated{" "}
                  {i === 0 ? "2 hours" : i === 1 ? "5 hours" : "1 day"} ago
                </span>
              </div>
              <h2 className="text-md font-semibold mt-5">{s.title}</h2>
              <p className="text-sm text-gray-600 leading-snug">{s.desc}</p>
              <div className="text-md text-gray-800 font-bold">
                <span className="font-medium mb-5 text-sm">Suggested timeframe:</span>{" "} <br />
                {s.timeframe}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Why this was suggested:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                  {s.reasons.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" className="text-sm w-[40%]">
                  Modify
                </Button>
                <Button className="text-sm w-[40%] bg-[#862633] text-white">Approve</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AiSuggestions;
