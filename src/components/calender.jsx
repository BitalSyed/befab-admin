import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ view, setView, currentDate, setCurrentDate, data }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  const [events, setEvents] = useState([]);
  function mapToSimpleCalendarEvent(item) {
    const startDate = new Date(item.date);

    // Format date as YYYY-MM-DD
    const date = startDate.toISOString().split("T")[0];

    // Determine color based on status
    let color = "bg-gray-200"; // default
    if (item.status === "active") color = "bg-green-200";
    else if (item.status === "upcoming") color = "bg-yellow-200";
    else if (item.status === "completed") color = "bg-red-200";

    return {
      date,
      title: item.title,
      allDay: true, // you can customize if needed
      color,
    };
  }
  useEffect(() => {
    setEvents(data.map((e) => mapToSimpleCalendarEvent(e)));
  }, [data]);
  function redirectToGoogleCalendar(event) {
  const { date, title } = event;

  // Format date as YYYYMMDD
  const startDate = date.replace(/-/g, "");
  // For all-day event, end date in Google Calendar is exclusive, so add 1 day
  const endDateObj = new Date(date);
  endDateObj.setDate(endDateObj.getDate() + 1);
  const endDate = endDateObj.toISOString().split("T")[0].replace(/-/g, "");

  // Build URL
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate}/${endDate}`;

  // Redirect
  window.open(calendarUrl, "_blank");
}

  // State
  // const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  // const [view, setView] = useState("month"); // month | week | day | list

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get month details
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const dates = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDay + 1;
    if (dayNum <= 0) {
      return { day: prevMonthDays + dayNum, inMonth: false };
    } else if (dayNum > daysInMonth) {
      return { day: dayNum - daysInMonth, inMonth: false };
    }
    return { day: dayNum, inMonth: true };
  });

  // Navigation
  const goToPrev = () => {
    if (view === "month") setCurrentDate(new Date(year, month - 1, 1));
    else if (view === "week")
      setCurrentDate(new Date(year, month, currentDate.getDate() - 7));
    else if (view === "day")
      setCurrentDate(new Date(year, month, currentDate.getDate() - 1));
  };

  const goToNext = () => {
    if (view === "month") setCurrentDate(new Date(year, month + 1, 1));
    else if (view === "week")
      setCurrentDate(new Date(year, month, currentDate.getDate() + 7));
    else if (view === "day")
      setCurrentDate(new Date(year, month, currentDate.getDate() + 1));
  };

  // Month View
  const renderMonthView = () => (
    <div className="grid grid-cols-7 mt-2 border-t border-l">
      {dates.map((d, i) => {
        const cellDate = new Date(
          year,
          d.inMonth ? month : month + (d.day <= 7 ? 1 : -1),
          d.day
        );
        const dateKey = cellDate.toISOString().split("T")[0];

        return (
          <div
            key={i}
            className={cn(
              "min-h-[100px] border-r border-b relative p-1",
              !d.inMonth && "bg-gray-50 text-gray-400"
            )}
          >
            <div
              className={cn(
                "text-xs font-semibold mb-1",
                today.toDateString() === cellDate.toDateString()
                  ? "bg-blue-500 text-white rounded-full px-2 inline-block"
                  : "text-gray-600"
              )}
            >
              {d.day}
            </div>
            {events
              .filter((event) => event.date === dateKey)
              .map((event, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "text-[11px] px-1 py-[1px] rounded mb-1 text-gray-800 truncate cursor-pointer hover:opacity-80",
                    event.color
                  )}
                  onClick={()=>redirectToGoogleCalendar(event)}
                >
                  {event.allDay ? "All Day - " : `${event.time} - `}
                  {event.title}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );

  // List View
  const renderListView = () => (
    <div className="mt-4 space-y-2">
      {events.map((event, i) => (
        <div key={i} className={cn("p-2 rounded shadow-sm", event.color)} onClick={()=>redirectToGoogleCalendar(event)}>
          <strong>{event.date}</strong> —{" "}
          {event.allDay ? "All Day" : event.time} — {event.title}
        </div>
      ))}
    </div>
  );

  // Day View
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const dateKey = currentDate.toISOString().split("T")[0];
    const dayEvents = events.filter((e) => e.date === dateKey);

    return (
      <div className="border-t border-l">
        {hours.map((hour, i) => (
          <div
            key={i}
            className="h-12 border-b border-r flex items-start p-1 relative" onClick={()=>redirectToGoogleCalendar(event)}
          >
            <div className="w-12 text-xs text-gray-500">{hour}</div>
            <div className="flex-1 relative">
              {dayEvents
                .filter((e) => e.time?.startsWith(hour.split(":")[0]))
                .map((event, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "absolute left-14 right-1 p-1 rounded text-xs text-gray-800",
                      event.color
                    )}
                  >
                    {event.time} - {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Week View
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });

    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    return (
      <div className="grid grid-cols-8 border-t border-l">
        {/* Header row */}
        <div className="border-b border-r bg-gray-50"></div>
        {weekDays.map((d, i) => (
          <div
            key={i}
            className="border-b border-r text-center text-sm font-medium p-2" onClick={()=>redirectToGoogleCalendar(event)}
          >
            {d.toLocaleDateString("default", {
              weekday: "short",
              day: "numeric",
            })}
          </div>
        ))}

        {/* Hourly slots */}
        {hours.map((hour, hIdx) => (
          <React.Fragment key={hIdx}>
            <div className="h-12 border-b border-r text-xs text-gray-500 p-1">
              {hour}
            </div>
            {weekDays.map((day, dIdx) => {
              const dateKey = day.toISOString().split("T")[0];
              const slotEvents = events.filter(
                (e) =>
                  e.date === dateKey && e.time?.startsWith(hour.split(":")[0])
              );

              return (
                <div key={dIdx} className="h-12 border-b border-r relative p-1">
                  {slotEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "absolute left-1 right-1 p-1 rounded text-xs text-gray-800 truncate",
                        event.color
                      )}
                    >
                      {event.time} - {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 rounded-md bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrev}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={goToNext}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Render calendar depending on view */}
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
      {view === "list" && renderListView()}
    </div>
  );
};

export default Calendar;
