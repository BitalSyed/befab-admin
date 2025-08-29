import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function CalendarAuditLog({ data }) {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  function mapEventToActivityLog(item) {
    const name = `${item.author.firstName} ${item.author.lastName}`;
    const dateObj = new Date(item.createdAt);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = dateObj.toLocaleString("en-US", options);

    return {
      src: item.author.avatarUrl,
      name,
      action: "Created",
      actionType: "success",
      event: item.title || item.location || "Event",
      date: formattedDate,
      ip: item.ip || "N/A",
    };
  }

  useEffect(() => {
    if (data?.length) setEvents(data.map((e) => mapEventToActivityLog(e)));
  }, [data]);

  function exportToCSV(data, fileName = "data.csv") {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
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
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const getBadgeVariant = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "destructive":
        return "bg-red-100 text-red-700";
      case "secondary":
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Calendar Audit Log</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => exportToCSV(events, "auditLog.csv")}
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground">ADMIN</TableHead>
            <TableHead className="text-muted-foreground">ACTION</TableHead>
            <TableHead className="text-muted-foreground">EVENT</TableHead>
            <TableHead className="text-muted-foreground">DATE</TableHead>
            <TableHead className="text-muted-foreground">IP ADDRESS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEvents.map((log, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`${log.src}`} />
                  <AvatarFallback>{log.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{log.name}</span>
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeVariant(
                    log.actionType
                  )}`}
                >
                  {log.action}
                </span>
              </TableCell>
              <TableCell>{log.event}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, events.length)} of {events.length} entries
        </p>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              variant={currentPage === idx + 1 ? "custom" : "outline"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
