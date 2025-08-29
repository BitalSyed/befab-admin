"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { API_URL, getCookie } from "./cookieUtils";
import { toast } from "react-toastify";

export default function NewsletterTable({ data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // slice data for current page
  const currentData = useMemo(() => {
    console.log(data)
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage]);

  // change page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const deleteLetter = (id) => {
    if (confirm("Are you sure you want to delete this letter?"))
      fetch(`${API_URL}/admin/newsletters/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie("skillrextech_auth"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Letter deleted successfully!");
            window.location.reload(); // refresh after delete
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user.");
        });
  };

  return (
    <div className="rounded-md border bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow className="text-muted-foreground text-xs">
            <TableHead className="w-10">
              <input type="checkbox" />
            </TableHead>
            <TableHead className="text-left">Title</TableHead>
            <TableHead className="text-left">Created</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item, i) => (
            <TableRow key={i} className="text-sm">
              <TableCell className="w-10">
                <input type="checkbox" />
              </TableCell>
              <TableCell className={"max-w-50"}>
                <div className="font-medium">{item.title}</div>
                <div className="text-muted-foreground text-sm truncate text-wrap max-w-xl">
                  {item.description}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={`px-2 py-0.5 rounded-md text-xs font-medium w-fit
    ${
      item.status === "published"
        ? "text-green-800 bg-green-100 border border-green-300"
        : ""
    }
    ${
      item.status === "draft"
        ? "text-gray-800 bg-gray-100 border border-gray-300"
        : ""
    }
    ${
      item.status === "sheduled"
        ? "text-yellow-800 bg-yellow-100 border border-yellow-300"
        : ""
    }
  `}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                    <DropdownMenuItem onClick={()=>deleteLetter(item._id)}>Delete</DropdownMenuItem>
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
          Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
          {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}{" "}
          results
        </span>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dynamic page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "custom" : "outline"}
              className="px-3 text-sm"
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            size="icon"
            variant="ghost"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
