import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URL } from "./cookieUtils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function VideoTable({ data }) {
  const [d, setD] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // videos per page

  function mapDBVideoToFrontend(dbVideo) {
    const formatDuration = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return {
      thumbnail: API_URL + dbVideo.thumbnailUrl,
      title: dbVideo.title,
      duration: formatDuration(dbVideo.durationSec),
      uploader: {
        name: dbVideo.uploader.username,
        role: dbVideo.uploader.role[0].toUpperCase() + dbVideo.uploader.role.slice(1),
        avatar: dbVideo.uploader.avatar || "/BeFab.png",
      },
      date: new Date(dbVideo.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      status: dbVideo.status[0].toUpperCase() + dbVideo.status.slice(1),
      views: dbVideo.views.toLocaleString(),
    };
  }

  // map data once
  useEffect(() => {
    setD(data.map(mapDBVideoToFrontend));
  }, [data]);

  // Pagination logic
  const totalPages = Math.ceil(d.length / itemsPerPage);
  const paginatedData = d.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="border rounded-md bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Video</TableHead>
            <TableHead>Uploader</TableHead>
            <TableHead>Date Posted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt="Thumbnail"
                    className="w-20 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Befab • {item.duration}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.uploader.avatar} />
                    <AvatarFallback>{item.uploader.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{item.uploader.name}</div>
                    <div className="text-xs text-muted-foreground">{item.uploader.role}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">{item.date}</TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "Published" ? "success" : "secondary"}
                  className={
                    item.status === "Draft"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                      : "bg-green-100 text-green-700 border border-green-400"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{item.views}</TableCell>
              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => o(user._id, user)}>
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => deleteUser(user._id)}>
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center px-2 mt-4 text-sm text-muted-foreground">
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, d.length)} of {d.length} videos
        </span>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={() => goToPage(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "custom" : "outline"}
              size="sm"
              className="px-3"
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button size="icon" variant="ghost" onClick={() => goToPage(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
