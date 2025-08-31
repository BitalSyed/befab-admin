import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { API_URL, getCookie } from "./cookieUtils";
import { toast } from "react-toastify";

const typeColorMap = {
  Public: "bg-green-100 text-green-700",
  Private: "bg-blue-100 text-blue-700",
};

export default function GroupTable({ data }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // calculate total pages
  const [totalPages, setTotalPages] = useState([])

  // slice data for current page
  const [paginatedData, setPaginatedData] = useState([])

  useEffect(()=>{
if(!data)return;
setTotalPages(Math.ceil(data.length / pageSize));
setPaginatedData(data.slice((page - 1) * pageSize, page * pageSize));
  }, [data])

    function deleteGroup(id) {
    fetch(`${API_URL}/admin/groups/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete video");
        return res.json();
      })
      .then((data) => {
        console.log("Deleted successfully:", data);
        toast.success("Video deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error deleting video:", err.message);
        toast.error("Failed to delete video");
      });
  }

  return (
    <Card className="p-0 overflow-hidden rounded-md">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData&&paginatedData.map((group, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                <img src={API_URL + group?.bannerUrl} alt="" className="w-28 shadow-md" />
                  <div>
                    <div className="font-medium text-sm">{group?.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {group?.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    typeColorMap[group?.visibility]
                  }`}
                >
                  {group?.visibility}
                </span>
              </TableCell>
              <TableCell>
                {new Date(group?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{group?.members.length}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => deleteGroup(group?._id)}>
                      Delete
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => console.log("Flag")}>
                      Flag
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground border-t">
        <div>
          Showing{" "}
          {(page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, data?.length)} of {data?.length} results
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              onClick={() => setPage(p)}
              variant={p === page ? "custom" : "ghost"}
              size="icon"
              className="h-7 w-7 px-0 text-xs"
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
