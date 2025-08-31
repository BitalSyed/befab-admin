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
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const normalize = (v) => (v ?? "").toString().trim().toLowerCase();

const getRuntimeStatus = (c, now = new Date()) => {
  // Prefer explicit status when it's "completed"
  const declared = normalize(c.status);
  const start = c.start ? new Date(c.start) : null;
  const end = c.end ? new Date(c.end) : null;

  if (declared === "completed") return "completed";
  if (start && end) {
    if (end < now) return "completed";
    if (start > now) return "upcoming";
    return "active";
  }
  // Fallback to declared status or active
  if (declared) return declared;
  return "active";
};

const Competitions = () => {
  const navigate = useNavigate();

  // Raw from API (never mutated)
  const [users, setUsers] = useState([]);
  // Filtered list used by table
  const [data, setData] = useState([]);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | upcoming | completed
  const [typeFilter, setTypeFilter] = useState("all");     // all | admin | ai
  const [sortBy, setSortBy] = useState("start");           // start | end

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
        const result = await response.json();

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        // Store original and initialize table
        setUsers(Array.isArray(result) ? result : []);
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching competitions:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchCompetitions();
  }, []);

  // Compute filtered+sorted list from users (source of truth)
  const filtered = useMemo(() => {
    let list = [...users];

    // Search: title / description / category
    const q = normalize(searchTerm);
    if (q) {
      list = list.filter((c) => {
        const hay =
          `${c.title ?? ""} ${c.description ?? ""} ${c.category ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // Status filter: supports explicit status or derived from dates
    if (statusFilter !== "all") {
      const now = new Date();
      list = list.filter((c) => getRuntimeStatus(c, now) === statusFilter);
    }

    // Type filter (Admin / AI in payload; we normalize)
    if (typeFilter !== "all") {
      list = list.filter((c) => normalize(c.type) === typeFilter);
    }

    // Sort
    list.sort((a, b) => {
      const aDate = sortBy === "start" ? new Date(a.start) : new Date(a.end);
      const bDate = sortBy === "start" ? new Date(b.start) : new Date(b.end);
      const aTime = isNaN(aDate) ? 0 : aDate.getTime();
      const bTime = isNaN(bDate) ? 0 : bDate.getTime();
      return aTime - bTime; // ascending
    });

    return list;
  }, [users, searchTerm, statusFilter, typeFilter, sortBy]);

  // Push computed list into `data` whenever inputs change
  useEffect(() => {
    setData(filtered);
  }, [filtered]);

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
            <Button
              onClick={() => navigate("/new-competition")}
              className="bg-[#0284C7] text-white ml-auto py-5.25"
            >
              <Plus className="w-4 h-4" />
              Create Competition
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-4 px-6 rounded-md shadow-sm">
          <div className="flex flex-wrap gap-2 items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search competitions..."
                className="pl-10 w-80 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Type */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            Sort By:&emsp;
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="Start Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start Date</SelectItem>
                <SelectItem value="end">End Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table uses filtered `data` */}
      <CompetitionsTable data={data} />

      {/* Keep analytics fed by raw `users` */}
      <AiSuggestions />
      <CompetitionAnalytics data={users} />
    </div>
  );
};

export default Competitions;
