import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL, getCookie } from "@/components/cookieUtils";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {

      try {
        const res = await fetch(`${API_URL}/admin/notifications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
          return;
        }

        setNotifications(data.notifications);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch notifications.");
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_URL}/admin/notifications/read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
        body: JSON.stringify({ id }),
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as read.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      <ul>
        {notifications.map((n) => (
          <li
            key={n._id}
            className={`p-3 mb-2 border rounded ${
              n.read ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{n.content}</span>
              {!n.read && (
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => markAsRead(n._id)}
                >
                  Mark as read
                </button>
              )}
            </div>
            <small className="text-gray-400">
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
