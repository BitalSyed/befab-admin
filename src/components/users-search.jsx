import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VideoFilterBar({ users, setData }) {
  const navigate = useNavigate();

  // filters
  const [search, setSearch] = useState("");
  const [uploader, setUploader] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    let filtered = [...users];

    // Search by title or uploader (case-insensitive)
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.title?.toLowerCase().includes(term) ||
          v.uploader.username?.toLowerCase().includes(term)
      );
    }

    // Filter by uploader
    if (uploader !== "all") {
      filtered = filtered.filter((v) => v.uploader?._id === uploader);
    }

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((v) => v.status === status);
    }

    // Sort by createdAt
    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setData(filtered);
  }, [search, uploader, status, sort, users]);

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 border rounded-md bg-white">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search videos by title, uploader..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-80 text-sm"
        />
      </div>

      {/* Uploaders */}
      <Select value={uploader} onValueChange={setUploader}>
        <SelectTrigger className="w-[150px] text-sm">
          <SelectValue placeholder="All Uploaders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Uploaders</SelectItem>
          {[
            ...new Map(
              users
                .filter((u) => u.uploader) // ensure uploader exists
                .map((u) => [u.uploader._id, u.uploader]) // unique by _id
            ).values(),
          ].map((u) => (
            <SelectItem key={u._id} value={u._id}>
              {u.username}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[130px] text-sm">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="flagged">Flagged</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Posted */}
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-[180px] text-sm">
          <SelectValue placeholder="Date Posted: Newest" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>

      {/* Upload Button */}
      <Button
        onClick={() => navigate("/new-video")}
        className="bg-[#862633] hover:bg-[#6f1a23] text-white ml-auto"
      >
        <Plus className="w-4 h-4" />
        Upload Video
      </Button>
    </div>
  );
}
