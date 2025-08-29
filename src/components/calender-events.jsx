import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// const events = [
//   {
//     day: "16",
//     month: "NOV",
//     title: "Nutrition Workshop",
//     time: "11:00 AM - 12:30 PM",
//     location: "Virtual (Zoom)",
//     badge: "Today",
//     badgeColor: "bg-red-200 text-red-800",
//   },
//   {
//     day: "20",
//     month: "NOV",
//     title: "Team Meeting",
//     time: "9:00 AM - 10:00 AM",
//     location: "Conference Room A",
//     badge: "In 4 days",
//     badgeColor: "bg-blue-200 text-blue-800",
//   },
//   {
//     day: "22",
//     month: "NOV",
//     title: "Fitness Class",
//     time: "10:00 AM - 11:00 AM",
//     location: "Main Gym",
//     badge: "In 6 days",
//     badgeColor: "bg-green-200 text-green-800",
//   },
//   {
//     day: "23",
//     month: "NOV",
//     title: "Thanksgiving",
//     time: "All Day",
//     location: "Holiday",
//     badge: "In 7 days",
//     badgeColor: "bg-yellow-200 text-yellow-800",
//   },
// ];

const CalendarPanel = ({ data }) => {
  const [events, setEvents] = useState([]);
  function mapToCalendarEvent(item) {
    const startDate = new Date(item.date);

    // Format day and month
    const day = startDate.getDate();
    const month = startDate
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();

    // Determine time
    const time = "All Day"; // optional: can compute actual time if needed

    // Determine badge and color based on start date
    const today = new Date();
    const diffDays = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
    let badge = "";
    let badgeColor = "";

    if (diffDays > 0) {
      badge = `In ${diffDays} day${diffDays > 1 ? "s" : ""}`;
      badgeColor = "bg-yellow-200 text-yellow-800";
    } else if (diffDays === 0) {
      badge = "Today";
      badgeColor = "bg-green-200 text-green-800";
    } else {
      badge = `${Math.abs(diffDays)} day${
        Math.abs(diffDays) > 1 ? "s" : ""
      } ago`;
      badgeColor = "bg-red-200 text-red-800";
    }

    return {
      day: day.toString().padStart(2, "0"),
      month,
      title: item.title,
      time,
      location: item.description, // use description as location
      badge,
      badgeColor,
    };
  }
  useEffect(() => {
    setEvents(
      data.map((e) => e.status != "completed" && mapToCalendarEvent(e))
    );
  }, [data]);
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-4">
      {/* Upcoming Events */}
      <Card className="w-full rounded-md">
        <CardContent className="p-4 py-0">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          {events.map((event, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-3 border-b last:border-none"
            >
              <div className="text-center w-12">
                <div className="text-xl font-bold text-gray-800">
                  {event.day}
                </div>
                <div className="text-xs text-gray-500 uppercase">
                  {event.month}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {event.title}
                </div>
                <div className="text-xs text-gray-500">{event.time}</div>
                <div className="text-xs text-gray-400">{event.location}</div>
              </div>
              <div className="mt-1">
                <Badge className={`text-xs ${event.badgeColor}`}>
                  {event.badge}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendar Settings */}
      {/* <Card className="w-full lg:w-[50%] rounded-md">
        <CardContent className="p-4 py-0">
          <h2 className="text-lg font-semibold mb-4">Calendar Settings</h2>

          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Calendar Visibility</div>
            <div className="flex flex-col gap-2 text-sm">
              <label className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm" /> Team Events
              </label>
              <label className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm" /> Fitness
                Classes
              </label>
              <label className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm" /> Competitions
              </label>
              <label className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm" /> Holidays
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium mb-2">
              Notification Settings
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span>Email Notifications</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Push Notifications</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>In-App Notifications</span>
                <Switch />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">
              Default Reminder Time
            </div>
            <Select>
              <SelectTrigger className="w-full text-sm shadow-none border-none">
                <SelectValue placeholder="30 mintues before" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">30 mintues before</SelectItem>
                <SelectItem value="user1">User 1</SelectItem>
                <SelectItem value="user2">User 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default CalendarPanel;
