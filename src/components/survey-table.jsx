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
import { ArrowUpDown, BarChart2, Edit } from "lucide-react";

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

export default function SurveyTables() {
  return (
    <div className="space-y-6">
      <Card className="p-0 rounded-md overflow-hidden border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-4"><Checkbox /></TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Title</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Created</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Status</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Duration</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Audience</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Responses</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveyTable.map((row, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                <TableCell className="px-4"><Checkbox /></TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900 leading-tight">{row.title}</div>
                  <div className="text-gray-500 text-sm">{row.questions}</div>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">{row.created}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${row.statusColor}-100 text-${row.statusColor}-800 font-medium`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">{row.duration}</TableCell>
                <TableCell className="text-gray-500 text-sm">{row.audience}</TableCell>
                <TableCell className="text-gray-900 text-sm font-medium">{row.responses}</TableCell>
                <TableCell className="flex gap-2">
                  <BarChart2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  <Edit className="h-4 w-4 text-muted-foreground cursor-pointer" />
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
              <TableHead className="px-6 text-xs uppercase text-gray-500 font-medium">Admin</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Action</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Survey</TableHead>
              <TableHead className="text-xs uppercase text-gray-500 font-medium">Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityTable.map((entry, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                <TableCell className="px-6">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${entry.actionColor}-100 text-${entry.actionColor}-800`}>
                    {entry.action}
                  </span>
                </TableCell>
                <TableCell className="text-gray-900 text-sm font-medium">{entry.survey}</TableCell>
                <TableCell className="text-gray-500 text-sm">{entry.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
