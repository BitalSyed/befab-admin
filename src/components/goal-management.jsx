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

const auditLog = [
  {
    timestamp: "Jul 10, 2023 • 14:32",
    user: {
      name: "John Smith (Admin)",
      avatar: "https://i.pravatar.cc/40?u=johnsmith",
    },
    action: "Created Goal",
    actionType: "created",
    details: "Created \"Run 5km in 2 weeks\" goal for Sarah Johnson",
  },
  {
    timestamp: "Jul 10, 2023 • 13:45",
    user: {
      name: "AI System",
      avatar: "https://i.pravatar.cc/40?u=ai-system",
    },
    action: "Suggested Goal",
    actionType: "suggested",
    details: "Suggested \"Increase daily protein intake to 120g\" for Emily Rodriguez",
  },
  {
    timestamp: "Jul 10, 2023 • 10:18",
    user: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/40?u=michaelchen",
    },
    action: "Completed Goal",
    actionType: "completed",
    details: "Completed \"Complete 12 strength workouts\" goal 2 days early",
  },
  {
    timestamp: "Jul 9, 2023 • 16:05",
    user: {
      name: "John Smith (Admin)",
      avatar: "https://i.pravatar.cc/40?u=johnsmith",
    },
    action: "Edited Goal",
    actionType: "edited",
    details:
      "Extended deadline for \"Drink 2L water daily for a month\" from Jul 15 to Jul 31",
  },
];

const badgeStyles = {
  created: "bg-green-100 text-green-700",
  suggested: "bg-blue-100 text-blue-700",
  completed: "bg-purple-100 text-purple-700",
  edited: "bg-yellow-100 text-yellow-800",
};

export default function GoalAuditLog() {
  return (
    <Card className="p-0 rounded-xl overflow-hidden border border-gray-200">
      <div className="px-6 pt-5 pb-3 border-b">
        <h2 className="text-sm font-semibold">Goal Management Audit Log</h2>
        <p className="text-sm text-gray-500">
          Track all admin, user, and AI actions related to goals
        </p>
      </div>
      <Table className="text-sm">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-muted-foreground text-xs font-medium uppercase">Timestamp</TableHead>
            <TableHead className="px-6 py-3 text-muted-foreground text-xs font-medium uppercase">User</TableHead>
            <TableHead className="px-6 py-3 text-muted-foreground text-xs font-medium uppercase">Action</TableHead>
            <TableHead className="px-6 py-3 text-muted-foreground text-xs font-medium uppercase">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLog.map((entry, index) => (
            <TableRow key={index} className="border-b hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-gray-500 whitespace-nowrap">{entry.timestamp}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={entry.user.avatar} />
                    <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900">{entry.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${badgeStyles[entry.actionType]}`}
                >
                  {entry.action}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-gray-500 whitespace-nowrap">
                {entry.details}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-center text-sm text-blue-600 py-3 font-medium hover:underline cursor-pointer">
        View Full Audit Log
      </div>
    </Card>
  );
}
