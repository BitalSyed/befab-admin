"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { API_URL, getCookie } from "@/components/cookieUtils";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SurveyResponsesPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(0); // first response expanded by default
  const { id } = useParams();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/surveys/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const result = await response.json();

        if (result.error) {
          toast.error(result.error);
        } else {
          setData(result.responses || []);
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchSurvey();
  }, [id]);

  function DeleteResponse(i) {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(
          `${API_URL}/admin/surveys/delete/${id}/${i}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
            },
          }
        );

        const result = await response.json();

        if (result.error) {
          toast.error(result.error);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
        toast.error("An error occurred. Please try again.");
      }
    };
    if (confirm("Are you sure to delete that resonse?")) fetchSurvey();
  }

  // Filter responses based on search
  const filteredResponses = data.filter((resp) => {
    const usernameMatch = resp.user?.username
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const answersMatch = resp.answers.some(
      (ans) =>
        ans.question.toLowerCase().includes(search.toLowerCase()) ||
        ans.answer.toString().toLowerCase().includes(search.toLowerCase())
    );

    return usernameMatch || answersMatch;
  });

  // CSV export
  const exportCSV = () => {
    if (!filteredResponses.length) return;

    const rows = [];

    // Add header
    rows.push(["userId", "username", "question", "answer"]);

    filteredResponses.forEach((resp) => {
      resp.answers.forEach((ans) => {
        rows.push([
          resp.user?._id || "",
          resp.user?.username || "",
          ans.question,
          Array.isArray(ans.answer) ? ans.answer.join(", ") : ans.answer,
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.map((v) => `"${v}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `survey_responses_${id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Survey Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search by username, question or answer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" onClick={exportCSV}>
              Export CSV
            </Button>
          </div>

          <div className="space-y-4">
            {filteredResponses.map((resp, idx) => {
              const isExpanded = idx === expandedIndex;
              return (
                <Card
                  key={resp.user._id || idx}
                  className={`border ${
                    isExpanded ? "border-blue-400" : "border-gray-300"
                  } shadow-sm`}
                >
                  <CardHeader
                    className="flex justify-between items-center cursor-pointer bg-gray-50 p-3"
                    onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  >
                    <span className="font-semibold text-gray-800">
                      {resp.user?.username || "Unknown User"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {resp.user?.firstName || "Unknown User"}{" "}
                      {resp.user?.lastName || "Unknown User"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {resp.user?.userId || "UserId: N/A"}
                    </span>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </CardHeader>
                  <CardHeader className="flex justify-evenly items-center bg-gray-50 p-3">
                    <span className="font-semibold text-gray-800">
                      {resp.user?.email || "Unknown User"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {resp.user?.role || "Unknown User"}{" "}
                      {resp.user?.lastName || "Unknown User"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      Active: {resp.user?.isActive ? "Yes" : "No"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      Locked: {resp.user?.isLocked ? "Yes" : "No"}
                    </span>
                    <span
                      onClick={() => DeleteResponse(resp._id)}
                      className="font-semibold text-white bg-red-800 rounded-md px-2 py-1 cursor-pointer"
                    >
                      Delete Resonse (Deleting May Require new Response)
                    </span>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="bg-white">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-blue-600">
                              Question
                            </TableHead>
                            <TableHead className="text-green-600">
                              Answer
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resp.answers.map((ans, aIdx) => (
                            <TableRow key={aIdx}>
                              <TableCell className="whitespace-normal break-words">
                                {ans.question}
                              </TableCell>
                              <TableCell className="whitespace-normal break-words">
                                {Array.isArray(ans.answer)
                                  ? ans.answer.join(", ")
                                  : ans.answer}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="italic text-gray-500 whitespace-normal break-words">
                              Submitted At
                            </TableCell>
                            <TableCell className="whitespace-normal break-words">
                              {new Date(resp.submittedAt).toLocaleString(
                                "en-US"
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
