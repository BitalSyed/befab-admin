import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Trash2, Ban } from "lucide-react";

const flaggedContent = [
  {
    title: "Inappropriate comment on workout post",
    description: "This workout is terrible, you should be ashamed...",
    group: "Strength Training",
    reporter: {
      name: "Jessica Parker",
      avatar: "https://i.pravatar.cc/40?u=jessica",
    },
    reason: "Harassment",
    reasonType: "destructive",
    date: "Jul 15, 2023",
  },
  {
    title: "Spam link in group post",
    description: "Check out this amazing supplement at www.scam-su...",
    group: "Healthy Eating",
    reporter: {
      name: "Robert Brown",
      avatar: "https://i.pravatar.cc/40?u=robert",
    },
    reason: "Spam",
    reasonType: "warning",
    date: "Jul 14, 2023",
  },
  {
    title: "Inappropriate profile picture",
    description: "User has uploaded an offensive profile image",
    group: "Runners Club",
    reporter: {
      name: "Lisa Wong",
      avatar: "https://i.pravatar.cc/40?u=lisa",
    },
    reason: "Inappropriate",
    reasonType: "secondary",
    date: "Jul 13, 2023",
  },
];

const reasonColorMap = {
  Harassment: "bg-red-100 text-red-700",
  Spam: "bg-yellow-100 text-yellow-800",
  Inappropriate: "bg-purple-100 text-purple-700",
};

export default function FlaggedContentQueue() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between px-4 py-3 pb-5 -mb-8 border-b">
        <h3 className="text-sm font-medium">Flagged Content Queue</h3>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
          12 items need review
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Content</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flaggedContent.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="text-sm font-medium mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[280px]">
                  {item.description}
                </div>
              </TableCell>
              <TableCell className="text-sm">{item.group}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.reporter.avatar} />
                    <AvatarFallback>{item.reporter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{item.reporter.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${reasonColorMap[item.reason]}`}
                >
                  {item.reason}
                </span>
              </TableCell>
              <TableCell className="text-sm">{item.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Check className="h-4 w-4 text-green-600 cursor-pointer" />
                  <Trash2 className="h-4 w-4 text-red-600 cursor-pointer" />
                  <Ban className="h-4 w-4 text-orange-600 cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-center text-sm text-blue-600 py-3 cursor-pointer font-medium hover:underline">
        View all flagged content
      </div>
    </Card>
  );
}