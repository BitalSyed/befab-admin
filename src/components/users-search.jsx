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

export default function VideoFilterBar() {
  const navigate=useNavigate()
  return (
    <div className="flex flex-wrap items-center gap-2 p-4 border rounded-md bg-white">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search videos by title, uploader..."
          className="pl-10 w-80 text-sm"
        />
      </div>

      {/* All Uploaders */}
      <Select>
        <SelectTrigger className="w-[150px] text-sm">
          <SelectValue placeholder="All Uploaders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Uploaders</SelectItem>
          <SelectItem value="user1">User 1</SelectItem>
          <SelectItem value="user2">User 2</SelectItem>
        </SelectContent>
      </Select>

      {/* All Status */}
      <Select>
        <SelectTrigger className="w-[130px] text-sm">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Posted */}
      <Select>
        <SelectTrigger className="w-[180px] text-sm">
          <SelectValue placeholder="Date Posted: Newest" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>

      {/* Upload Button */}
      <Button onClick={()=>navigate('/new-video')} className="bg-[#862633] hover:bg-[#6f1a23] text-white ml-auto">
        <Plus className="w-4 h-4" />
        Upload Video
      </Button>
    </div>
  );
}
