import CompetitionAnalytics from "@/components/competition-analytics";
import AiSuggestions from "@/components/competitions-ai-generated";
import CompetitionsTable from "@/components/competitions-competitions";
import { API_URL, getCookie } from "@/components/cookieUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Changed from "@radix-ui/react-select" to local shadcn select
import { Download, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Competitions = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
  useEffect(() => {
  const fetchCompetitions = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/competitions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setUsers(data); // assuming setUsers exists
        setData(data);  // assuming setData exists
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching competitions:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  fetchCompetitions();
}, []);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Competition Management</h1>
            <p className="text-sm text-gray-600">
              Create, manage, and track user competitions
            </p>
          </div>
          <div className="flex gap-3">
            {/* Your SVG code remains the same */}
            <Button onClick={()=>navigate('/new-competition')} className="bg-[#0284C7] text-white ml-auto py-5.25">
              <Plus className="w-4 h-4" />
              Create Competition
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-4 px-6 rounded-md shadow-sm">
          <div className="flex flex-wrap gap-2 items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search competitions..."
                className="pl-10 w-80 text-sm"
              />
            </div>

            {/* Fixed Select components */}
            <Select>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="AI">AI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-4">
            Sort By:&emsp;
            <Select>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="Start Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start Date</SelectItem>
                <SelectItem value="end">End Date</SelectItem>
              </SelectContent>
            </Select>
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.77421 15.5898C5.58369 15.7959 5.31821 15.9146 5.03712 15.9146C4.75602 15.9146 4.49054 15.7959 4.30003 15.5898L1.55155 12.5914C1.17989 12.1854 1.20487 11.5514 1.61402 11.1797C2.02317 10.808 2.65407 10.833 3.02573 11.2422L4.03767 12.3447V2.92181C4.03767 2.36899 4.4843 1.92236 5.03712 1.92236C5.58993 1.92236 6.03656 2.36899 6.03656 2.92181V12.3447L7.0485 11.2391C7.42017 10.833 8.05419 10.8049 8.46021 11.1766C8.86624 11.5483 8.89435 12.1823 8.52268 12.5883L5.77421 15.5866V15.5898ZM10.0343 10.9174C10.0343 10.3645 10.481 9.91792 11.0338 9.91792H15.0316C15.4345 9.91792 15.7999 10.1615 15.956 10.5363C16.1122 10.9111 16.0248 11.339 15.7405 11.6263L13.4481 13.9157H15.0316C15.5844 13.9157 16.031 14.3623 16.031 14.9151C16.031 15.468 15.5844 15.9146 15.0316 15.9146H11.0338C10.6309 15.9146 10.2655 15.671 10.1093 15.2962C9.95313 14.9214 10.0406 14.4935 10.3248 14.2062L12.6173 11.9168H11.0338C10.481 11.9168 10.0343 11.4702 10.0343 10.9174ZM13.0327 1.92236C13.4106 1.92236 13.7573 2.13475 13.9259 2.47518L15.9248 6.47296L16.4245 7.4724C16.6713 7.96588 16.4714 8.56555 15.9779 8.81228C15.4844 9.05902 14.8848 8.85913 14.638 8.36566L14.4132 7.91903H11.6522L11.4273 8.36566C11.1806 8.85913 10.5809 9.05902 10.0874 8.81228C9.59396 8.56555 9.39407 7.96588 9.64081 7.4724L10.1405 6.47296L12.1394 2.47518C12.3081 2.13475 12.6548 1.92236 13.0327 1.92236ZM12.4018 6.41986H13.6636L13.0327 5.15806L12.4018 6.41986Z"
                fill="#6B7280"
              />
            </svg>
          </div>
        </div>
      </div>
      <CompetitionsTable data={data} />
      {/* <AiSuggestions/> */}
      <CompetitionAnalytics data={users}/>
    </div>
  );
};

export default Competitions;
