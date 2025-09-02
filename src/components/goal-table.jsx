import { useState, useEffect } from "react";
import {
  Search,
  X,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { API_URL } from "./cookieUtils";

export default function GoalTrackerTable({ data, setData, users }) {
  const [filters, setFilters] = useState({
    search: "",
    creator: "all",
    status: "all",
    dateRange: "all",
    assignedTo: "all",
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(data || []);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // you can make this configurable if needed

  // Apply filters whenever filters state or original data changes
  useEffect(() => {
    if (!data) {
      setFilteredData([]);
      return;
    }
    
    let result = [...data];
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.user.username.toLowerCase().includes(searchTerm)
      );
    }
    
    // Creator filter
    if (filters.creator !== "all") {
      result = result.filter(item => item.creator === filters.creator);
    }
    
    // Status filter
    if (filters.status !== "all") {
      result = result.filter(item => item.status === filters.status);
    }
    
    // Assigned to filter
    if (filters.assignedTo !== "all") {
      result = result.filter(item => item.user._id === filters.assignedTo);
    }
    
    // Date range filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      let startDate;
      
      switch(filters.dateRange) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          result = result.filter(item => new Date(item.startDate) >= startDate);
          break;
        case "thisWeek":
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          result = result.filter(item => new Date(item.startDate) >= startDate);
          break;
        case "thisMonth":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          result = result.filter(item => new Date(item.startDate) >= startDate);
          break;
        default:
          break;
      }
    }
    
    setFilteredData(result);
    setCurrentPage(1); // reset to first page when filters change
    
    // Update active filters display
    const newActiveFilters = [];
    if (filters.search) newActiveFilters.push(`Search: ${filters.search}`);
    if (filters.creator !== "all") newActiveFilters.push(`Creator: ${filters.creator}`);
    if (filters.status !== "all") newActiveFilters.push(`Status: ${filters.status}`);
    if (filters.dateRange !== "all") newActiveFilters.push(`Date: ${filters.dateRange}`);
    if (filters.assignedTo !== "all") {
      const user = users.find(u => u._id === filters.assignedTo);
      newActiveFilters.push(`Assigned: ${user?.username || filters.assignedTo}`);
    }
    
    setActiveFilters(newActiveFilters);
  }, [filters, data, users]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilter = (filterName) => {
    if (filterName === "search") {
      setFilters(prev => ({ ...prev, search: "" }));
    } else {
      setFilters(prev => ({ ...prev, [filterName]: "all" }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      creator: "all",
      status: "all",
      dateRange: "all",
      assignedTo: "all",
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
      {/* Filters */}
      <div className="p-4 border-b space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by goal title, user, or type"
              className="pl-10 w-80 text-sm"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          
          <Select 
            value={filters.creator} 
            onValueChange={(value) => handleFilterChange("creator", value)}
          >
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Creator (All)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Creator (All)</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.status} 
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Status (All)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status (All)</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.dateRange} 
            onValueChange={(value) => handleFilterChange("dateRange", value)}
          >
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Date Range (All)</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
            </SelectContent>
          </Select>
          
          {activeFilters.length > 0 && (
            <button 
              className="text-sm text-blue-600 ml-auto" 
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          )}
        </div>
        
        {/* Active filters display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm">
            {activeFilters.map((filter, index) => {
              const filterType = filter.split(": ")[0];
              
              return (
                <span 
                  key={index} 
                  className="bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1"
                >
                  {filter}
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={() => {
                      switch(filterType) {
                        case "Search": clearFilter("search"); break;
                        case "Creator": clearFilter("creator"); break;
                        case "Status": clearFilter("status"); break;
                        case "Date": clearFilter("dateRange"); break;
                        case "Assigned": clearFilter("assignedTo"); break;
                        default: break;
                      }
                    }}
                  />
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-muted-foreground text-left">
            <tr>
              <th className="p-3 font-medium">Goal Name</th>
              <th className="p-3 font-medium">Creator</th>
              <th className="p-3 font-medium">Assigned To</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Dates</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="align-top">
                <td className="p-3">
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="font-medium text-sm">{row.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {row.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${row.creator==='Admin'?'bg-purple-100 text-purple-700':row.creator==='AI'?'bg-orange-100 text-orange-700':'bg-blue-100 text-blue-700'}`}
                  >
                    {row.creator}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                      <img
                        src={API_URL+(row.user.avatarUrl||"/Befab.png")}
                        alt="avatar"
                        className="w-6 h-6 rounded-full border"
                      />
                    <span className="text-sm text-muted-foreground">
                      {row.user.username}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      row.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : row.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm">{new Date(row.startDate).toLocaleString('en-US')}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No goals match your filters
          </div>
        )}
      </div>

      {/* Footer with Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
        <div>
          Showing {paginatedData.length} of {filteredData.length} results
        </div>
        {totalPages > 1 && (
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                variant={currentPage === idx + 1 ? "custom" : "outline"}
                className={`border px-2 h-7 w-7 rounded ${currentPage === idx + 1 ? "text-blue-600" : ""}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
