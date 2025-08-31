"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const statusColors = {
  active: "bg-green-100 text-green-800 border border-green-300",
  upcoming: "bg-blue-100 text-blue-800 border border-blue-300",
  draft: "bg-gray-100 text-gray-800 border border-gray-300",
  completed: "bg-purple-100 text-purple-800 border border-purple-300",
};

const typeColors = {
  Admin: "bg-blue-100 text-blue-800 border border-blue-300",
  AI: "bg-purple-100 text-purple-800 border border-purple-300",
};

export default function CompetitionsTable({ data }) {
  const [competitionsData, setCompetitionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (!data?.length) return;

    setCompetitionsData(
      data?.map((competition) => {
        return {
          name: competition.title,
          description: competition.description,
          type: competition.type,
          status: competition.status,
          startDate: new Date(competition.start).toLocaleDateString(),
          endDate: new Date(competition.end).toLocaleDateString(),
          participants: competition.participants.length,
        };
      })
    );
  }, [data]);

  // Pagination logic
  const totalPages = Math.ceil(competitionsData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = competitionsData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="rounded-md border bg-white p-4">
      <h1 className="text-xl font-semibold mb-4">All Competitions</h1>

      <Table>
        <TableHeader>
          <TableRow className="text-muted-foreground text-xs">
            <TableHead className="w-[30%]">NAME</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
            <TableHead>PARTICIPANTS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((competition, index) => (
            <TableRow key={index} className="text-sm">
              <TableCell>
                <div className="flex gap-5 max-w-80">
                  <div>
                    <div className="font-medium">{competition.name}</div>
                    <div className="text-muted-foreground text-sm max-w-80 text-wrap">
                      {competition.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs ${typeColors[competition.type]}`}>
                  {competition.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`text-xs ${statusColors[competition.status]}`}
                >
                  {competition.status}
                </Badge>
              </TableCell>
              <TableCell>{competition.startDate}</TableCell>
              <TableCell>{competition.endDate}</TableCell>
              <TableCell>{competition.participants}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center px-2 mt-4 text-sm text-muted-foreground">
        <span>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + rowsPerPage, competitionsData.length)} of{" "}
          {competitionsData.length} competitions
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "custom" : "outline"}
              size="sm"
              className="px-3"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
