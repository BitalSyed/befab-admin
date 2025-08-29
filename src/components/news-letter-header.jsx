import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Download, Plus, Search } from "lucide-react";
import { RiFilter2Fill } from "react-icons/ri";

export function NewsletterHeader({ data, setData }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔍 Search by title
  const handleSearch = (value) => {
    setSearch(value);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  // 🆕 Sort newest first
  const sortNewestFirst = () => {
    const sorted = [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(sorted);
  };

  // 👤 Filter by author
  const filterByAuthor = (authorName) => {
    const filtered = data.filter((item) =>
      `${item.author.firstName} ${item.author.lastName}`
        .toLowerCase()
        .includes(authorName.toLowerCase())
    );
    setData(filtered);
  };

  // ♻ Reset filters
  const reset = () => {
    setData(data);
    setSearch("");
  };

  // CSV Export
  const exportNewslettersToCSV = (newsletters) => {
    if (!newsletters || newsletters.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const formatted = newsletters.map((n) => ({
      Title: n.title,
      Description: n.description?.replace(/\r?\n|\r/g, " "),
      Author: `${n.author?.firstName || ""} ${n.author?.lastName || ""}`.trim(),
      Username: n.author?.username || "",
      Email: n.author?.email || "",
      Role: Array.isArray(n.author?.role)
        ? n.author.role.join(", ")
        : n.author?.role || "",
      Date: new Date(n.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    const headers = Object.keys(formatted[0]);
    const csvRows = [
      headers.join(","), 
      ...formatted.map((row) =>
        headers
          .map((field) => {
            let value = row[field] ?? "";
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      ),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `newsletters_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-2 justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Newsletter Management</h1>
          <p className="text-sm text-gray-600">
            Create, edit, and manage your newsletters
          </p>
        </div>
        <Button
          onClick={() => navigate("/new-news")}
          className="bg-[#862633] hover:bg-[#6f1a23] text-white lg:ml-auto"
        >
          <Plus className="w-4 h-4" />
          Create Newsletter
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-4 px-6 rounded-md shadow-sm">
        <div className="flex flex-wrap gap-2 items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search newsletters..."
              className="pl-10 w-80 text-sm"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Reset */}
          <Button variant="outline" onClick={reset}>
            All Statuses
          </Button>

          {/* Sort */}
          <Button variant="outline" onClick={sortNewestFirst}>
            Newest First
          </Button>
        </div>

        {/* Filters + Export */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <RiFilter2Fill /> <span>More Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => filterByAuthor("Syed")}>
                By Author
              </DropdownMenuItem>
              {/* Add more filters if needed */}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => exportNewslettersToCSV(data)}
            variant="outline"
            className="flex items-center"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
