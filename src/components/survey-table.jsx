import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, BarChart2, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { API_URL, getCookie } from "./cookieUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const surveyTable = [
  {
    title: "User Satisfaction Survey",
    questions: "12 questions",
    created: "Jun 15, 2023",
    status: "Active",
    statusColor: "green",
    duration: "Jul 15 - Jul 15, 2023",
    audience: "All Users",
    responses: "1,245",
  },
  {
    title: "Fitness Goal Assessment",
    questions: "8 questions",
    created: "Jun 02, 2023",
    status: "Active",
    statusColor: "green",
    duration: "∞ Unlimited",
    audience: "New Users",
    responses: "3,872",
  },
  {
    title: "Nutrition Feature Feedback",
    questions: "10 questions",
    created: "May 28, 2023",
    status: "Scheduled",
    statusColor: "yellow",
    duration: "Jul 01 - Jul 31, 2023",
    audience: "Premium Users",
    responses: "0",
  },
  {
    title: "App Experience Survey",
    questions: "15 questions",
    created: "May 15, 2023",
    status: "Expired",
    statusColor: "red",
    duration: "May 15 - Jun 15, 2023",
    audience: "All Users",
    responses: "2,134",
  },
  {
    title: "New Feature Feedback",
    questions: "6 questions",
    created: "May 10, 2023",
    status: "Draft",
    statusColor: "gray",
    duration: "Not Set",
    audience: "Not Set",
    responses: "0",
  },
];

const activityTable = [
  {
    name: "John Smith",
    avatar: "https://i.pravatar.cc/40?u=johnsmith",
    action: "Created",
    actionColor: "green",
    survey: "Nutrition Feature Feedback",
    date: "May 28, 2023 - 14:23",
  },
  {
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/40?u=sarahjohnson",
    action: "Edited",
    actionColor: "blue",
    survey: "User Satisfaction Survey",
    date: "Jun 16, 2023 - 09:45",
  },
  {
    name: "John Smith",
    avatar: "https://i.pravatar.cc/40?u=johnsmith2",
    action: "Deleted",
    actionColor: "red",
    survey: "Weekly Feedback Survey",
    date: "Jun 10, 2023 - 11:32",
  },
  {
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/40?u=michaelbrown",
    action: "Published",
    actionColor: "purple",
    survey: "Fitness Goal Assessment",
    date: "Jun 02, 2023 - 15:10",
  },
];

export default function SurveyTables({ data, users, allusers, d }) {
  const navigate = useNavigate();
  function deleteSurvey(id) {
    fetch(`${API_URL}/admin/surveys/${id}`, {
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
        toast.success("Survey deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error deleting video:", err.message);
        toast.error("Failed to delete video");
      });
  }
  useEffect(()=>{
    console.log(users, allusers);
  }, [users, allusers])
  return (
    <div className="space-y-6">
      <Card className="p-0 rounded-md overflow-hidden border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-4">
                <Checkbox />
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Title
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Created
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Status
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Duration
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Audience
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Responses
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((row, i) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  <TableCell className="px-4">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900 leading-tight">
                      {row.title}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {row.questions.length + " questions"}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleString("en-US")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const createdDate = new Date(row.createdAt);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // strip time for accurate comparison

                      const isExpired = createdDate < today;

                      const status = isExpired ? "Expired" : "Active";
                      const colorClasses = isExpired
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800";

                      return (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${colorClasses}`}
                        >
                          {status}
                        </span>
                      );
                    })()}
                  </TableCell>

                  <TableCell className="text-gray-500 text-sm">
                    {row.durationMin}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {row.audience}
                  </TableCell>
                  <TableCell className="text-gray-900 text-sm font-medium">
                    {row.responses.length}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/surveys/${row._id}`)}>
                          See Responses
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteSurvey(row._id)}>
                          Delete
                        </DropdownMenuItem>
                        {d &&
                          !row.responses.some(r => r.user === d._id) &&
                          row.audience !== "members" &&
                          (() => {
                            const createdDate = new Date(row.createdAt);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // strip time for accurate comparison

                            const isExpired = createdDate < today;

                            return !isExpired ? (
                              <DropdownMenuItem onClick={() => navigate(`/surveys/take/${row._id}`)}>
                                Take Survey
                              </DropdownMenuItem>
                            ) : null;
                          })()}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-0 rounded-md overflow-hidden border border-gray-200">
        <div className="border-b px-6 pt-5 pb-3">
          <h2 className="text-sm font-semibold">Recent Survey Activity</h2>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 text-xs uppercase text-gray-500 font-medium">
                Created By
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Response Rate
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Survey
              </TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">
                Due Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              allusers &&
              users.map((entry, i) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  <TableCell className="px-6">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={entry.avatarUrl || API_URL + "/Befab.png"}
                        />
                        <AvatarFallback>
                          {entry.createdBy?.firstName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">
                        {entry.createdBy?.username || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full bg-${entry.actionColor}-100 text-${entry.actionColor}-800`}
                    >
                      {(entry.responses.length / allusers.length) * 100
                        ? (
                            (entry.responses.length / allusers.length) *
                            100
                          ).toFixed(2) + "%"
                        : "0%"}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-900 text-sm font-medium">
                    {entry.title}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {entry.dueDate
                      ? new Date(entry.dueDate).toLocaleDateString("en-US")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
