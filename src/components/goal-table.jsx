import {
  CheckCircle,
  CircleDot,
  Dot,
  Filter,
  MoreHorizontal,
  Search,
  SortAsc,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function GoalTrackerTable() {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
      {/* Filters */}
      <div className="p-4 border-b space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by goal title, user, or type"
              className="pl-10 w-80 text-sm"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Creator (All)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Creator (All)</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Status (All)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status (All)</SelectItem>
              <SelectItem value="user1">User 1</SelectItem>
              <SelectItem value="user2">User 2</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Date Range</SelectItem>
              <SelectItem value="user1">User 1</SelectItem>
              <SelectItem value="user2">User 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[100px] text-sm">
              <svg
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.07878 0.747475C4.41981 0.406441 4.97365 0.406441 5.31468 0.747475L8.80687 4.23966C9.05787 4.49066 9.13154 4.86444 8.99512 5.19183C8.85871 5.51922 8.54223 5.73203 8.18755 5.73203H1.20318C0.851232 5.73203 0.532024 5.51922 0.395611 5.19183C0.259197 4.86444 0.335589 4.49066 0.583861 4.23966L4.07605 0.747475H4.07878ZM4.07878 12.4599L0.58659 8.96776C0.335589 8.71676 0.261925 8.34298 0.398339 8.01559C0.534752 7.6882 0.851232 7.47539 1.20591 7.47539H8.18755C8.5395 7.47539 8.85871 7.6882 8.99512 8.01559C9.13154 8.34298 9.05515 8.71676 8.80687 8.96776L5.31468 12.4599C4.97365 12.801 4.41981 12.801 4.07878 12.4599Z"
                  fill="black"
                />
              </svg>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sort</SelectItem>
              <SelectItem value="user1">User 1</SelectItem>
              <SelectItem value="user2">User 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] text-sm">
              <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.286521 1.10916C0.466732 0.726898 0.848998 0.483887 1.27222 0.483887H13.0678C13.4911 0.483887 13.8733 0.726898 14.0535 1.10916C14.2338 1.49143 14.1791 1.94196 13.9116 2.26961L8.91753 8.37221V11.8426C8.91753 12.173 8.73186 12.4761 8.43424 12.6236C8.13662 12.771 7.78439 12.741 7.51953 12.5416L5.77203 11.231C5.55086 11.0672 5.42253 10.8078 5.42253 10.532V8.37221L0.425775 2.26688C0.16092 1.94196 0.10358 1.4887 0.286521 1.10916Z" fill="black"/>
</svg>

              <SelectValue placeholder="More Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">More Filters</SelectItem>
              <SelectItem value="user1">User 1</SelectItem>
              <SelectItem value="user2">User 2</SelectItem>
            </SelectContent>
          </Select>
          <button className="text-sm text-blue-600 ml-auto">Clear All</button>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-gray-100 px-2 py-0.5 rounded-full">Active ✕</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded-full">
            This Month ✕
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-muted-foreground text-left">
            <tr>
              <th className="p-3 font-medium">Goal Name</th>
              <th className="p-3 font-medium">Creator</th>
              <th className="p-3 font-medium">Assigned To</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Dates</th>
              <th className="p-3 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Sample Row */}
            {[
              {
                iconBg: "bg-blue-100",
                icon: "🏃‍♂️",
                title: "Run 5km in 2 weeks",
                subtitle: "Cardio + Fitness",
                creator: "Admin",
                creatorColor: "bg-purple-100 text-purple-700",
                assigned: ["/avatar1.jpg"],
                name: "Sarah Johnson",
                status: "Active",
                statusColor: "bg-green-100 text-green-700",
                date: "Jul 1 - Jul 15, 2023",
                countdown: "5 days left",
                percent: 65,
                percentColor: "bg-green-500",
              },
              {
                iconBg: "bg-green-100",
                icon: "💧",
                title: "Drink 2L water daily for a month",
                subtitle: "Hydration + Wellness",
                creator: "Admin",
                creatorColor: "bg-purple-100 text-purple-700",
                assigned: ["/avatar2.jpg", "/avatar3.jpg"],
                name: "...245 more",
                status: "Active",
                statusColor: "bg-green-100 text-green-700",
                date: "Jul 1 - Jul 31, 2023",
                countdown: "21 days left",
                percent: 32,
                percentColor: "bg-green-500",
              },
              {
                iconBg: "bg-purple-100",
                icon: "🏋️‍♀️",
                title: "Complete 12 strength workouts",
                subtitle: "Strength + Fitness",
                creator: "User",
                creatorColor: "bg-blue-100 text-blue-700",
                assigned: ["/avatar4.jpg"],
                name: "Michael Chen",
                status: "Completed",
                statusColor: "bg-blue-100 text-blue-700",
                date: "Jun 1 - Jun 30, 2023",
                countdown: "Completed 2 days early",
                percent: 100,
                percentColor: "bg-blue-600",
              },
              {
                iconBg: "bg-yellow-100",
                icon: "🍎",
                title: "Eat 5 servings of vegetables daily",
                subtitle: "Nutrition + Wellness",
                creator: "AI",
                creatorColor: "bg-orange-100 text-orange-700",
                assigned: ["/avatar5.jpg"],
                name: "Emily Rodriguez",
                status: "Active",
                statusColor: "bg-green-100 text-green-700",
                date: "Jul 5 - Aug 5, 2023",
                countdown: "26 days left",
                percent: 20,
                percentColor: "bg-gray-300",
              },
              {
                iconBg: "bg-red-100",
                icon: "❤️",
                title: "Reach 10,000 daily steps",
                subtitle: "Activity + Fitness",
                creator: "AI",
                creatorColor: "bg-orange-100 text-orange-700",
                assigned: ["/avatar6.jpg"],
                name: "David Wilson",
                status: "Expired",
                statusColor: "bg-red-100 text-red-700",
                date: "Jun 1 - Jun 30, 2023",
                countdown: "Expired 5 days ago",
                percent: 68,
                percentColor: "bg-red-500",
              },
            ].map((row, idx) => (
              <tr key={idx} className="align-top">
                <td className="p-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-lg ${row.iconBg}`}
                    >
                      {row.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{row.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {row.subtitle}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${row.creatorColor}`}
                  >
                    {row.creator}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {row.assigned.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="avatar"
                        className="w-6 h-6 rounded-full border"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${row.statusColor}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm">{row.date}</div>
                  <div className="text-xs text-muted-foreground">
                    {row.countdown}
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    {row.percent}% completed
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full ${row.percentColor}`}
                      style={{ width: `${row.percent}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
        <div>Showing 1 to 5 of 28 results</div>
        <div className="flex gap-1">
          <Button variant="custom" className="border px-2 h-7 w-7 rounded text-blue-600">
            1
          </Button>
          <Button variant="outline" className="border px-2 h-7 w-7 rounded">2</Button>
          <Button variant="outline" className="border px-2 h-7 w-7 rounded">3</Button>
          <span className="px-1">...</span>
          <Button variant="outline" className="border px-2 h-7 w-7 rounded">6</Button>
        </div>
      </div>
    </div>
  );
}
