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
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { API_URL, getCookie } from "./cookieUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function SurveyTables({ data, users, allusers, d }) {
  const navigate = useNavigate();

  // 🔹 NEW STATES for custom popup
  const [showNotify, setShowNotify] = useState(false);
  const [notifyUsers, setNotifyUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // multi select
  const [notifyMsg, setNotifyMsg] = useState("");
  const [targetAudience, setTargetAudience] = useState("all"); // audience filter

  function deleteSurvey(id) {
    fetch(`${API_URL}/admin/surveys/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete survey");
        return res.json();
      })
      .then(() => {
        toast.success("Survey deleted successfully");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to delete survey");
      });
  }

  useEffect(() => {
    console.log(users, allusers);
  }, [users, allusers]);

  // 🔹 fetch users when popup opens
  useEffect(() => {
    if (showNotify) {
      fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setNotifyUsers(data))
        .catch(() => toast.error("Failed to fetch users"));
    }
  }, [showNotify]);

  // 🔹 handlers for multi-select
  const handleAddUser = (username) => {
    if (username && !selectedUsers.includes(username)) {
      setSelectedUsers([...selectedUsers, username]);
    }
  };

  const handleRemoveUser = (username) => {
    setSelectedUsers(selectedUsers.filter((u) => u !== username));
  };

  // 🔹 send notification
  const sendNotification = async () => {
    if (!selectedUsers.length) {
      toast.error("Please select at least one user");
      return;
    }
    if (!notifyMsg.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
        body: JSON.stringify({
          usernames: selectedUsers, // array
          message: notifyMsg,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success("Notification sent");
      setShowNotify(false);
      setSelectedUsers([]);
      setNotifyMsg("");
    } catch (err) {
      toast.error(err.message || "Error sending notification");
    }
  };

  return (
    <div className="space-y-6">
      {/* Survey Table */}
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
                      today.setHours(0, 0, 0, 0);
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
                        <DropdownMenuItem
                          onClick={() => navigate(`/surveys/${row._id}`)}
                        >
                          See Responses
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate(`/surveys/modify/${row._id}`)}
                        >
                          Modify
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteSurvey(row._id)}>
                          Delete
                        </DropdownMenuItem>
                        {(() => {
                          const createdDate = new Date(row.createdAt);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const isExpired = createdDate < today;

                          if (isExpired) return null; // don’t render anything if expired

                          return (
                            <DropdownMenuItem
                              onClick={() => {
                                setTargetAudience(row.audience || "all");
                                setShowNotify(true);
                              }}
                            >
                              Send Notification
                            </DropdownMenuItem>
                          );
                        })()}

                        {d &&
                          !row.responses.some((r) => r.user === d._id) &&
                          !row.exclude.some((r) => r === d.username) &&
                          row.audience !== "members" &&
                          (() => {
                            const createdDate = new Date(row.createdAt);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const isExpired = createdDate < today;
                            return !isExpired ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/surveys/take/${row._id}`)
                                }
                              >
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

      {/* Recent Survey Activity */}
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
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
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

      {/* 🔹 Custom Popup */}
      {showNotify && (
        <div className="fixed inset-0 bg-[#925f606a] backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Send Notification</h2>

            {/* Selected user tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedUsers.map((u, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {u}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveUser(u)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <label className="block text-sm font-medium mb-1">Add User</label>
            <select
              onChange={(e) => {
                handleAddUser(e.target.value);
                e.target.value = "";
              }}
              className="border rounded-md w-full p-2 mb-4"
            >
              <option value="">-- Select User --</option>
              {notifyUsers
                .filter((u) => {
                  if (targetAudience === "admins") return u.role === "admin";
                  if (targetAudience === "members") return u.role === "member";
                  return true;
                })
                .filter((u) => !selectedUsers.includes(u.username))
                .map((u, i) => (
                  <option key={i} value={u.username}>
                    {u.username}
                  </option>
                ))}
            </select>

            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={notifyMsg}
              onChange={(e) => setNotifyMsg(e.target.value)}
              className="border rounded-md w-full p-2 h-24 mb-4"
              placeholder="Enter notification message"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => {
                  setShowNotify(false);
                  setSelectedUsers([]);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#925f60] text-white rounded-md"
                onClick={sendNotification}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
