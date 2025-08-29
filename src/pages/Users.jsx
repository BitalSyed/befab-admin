import { API_URL, getCookie } from "@/components/cookieUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserTable } from "@/components/user-table";
import Dashboard from "@/components/users-activity";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]); // original users
  const [data, setData] = useState([]); // filtered & sorted users
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activityData, setActivityData] = useState([]); // for dashboard

  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${API_URL}/admin/users?token=${getCookie("skillrextech_auth")}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const usersData = await response.json();

        if (usersData.error) {
          toast.error(usersData.error);
        } else {
          setAllUsers(usersData); // store original data
          setData(usersData); // display initially
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  // Fetch activity data for dashboard
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(
          `${API_URL}/admin/users/activity?token=${getCookie("skillrextech_auth")}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const activity = await response.json();

        if (activity.error) {
          toast.error(activity.error);
        } else {
          setActivityData(activity);
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchActivity();
  }, []);

  // Filter & sort users whenever any dependency changes
  useEffect(() => {
    let filteredUsers = [...allUsers];

    // Search filter
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.firstName.toLowerCase() + user.lastName.toLowerCase()).includes(
            searchTerm.toLowerCase()
          ) ||
          (user.role && user.role.includes(searchTerm.toLowerCase()))
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        user.role.includes(roleFilter)
      );
    }

    // Sorting
    filteredUsers.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.firstName.localeCompare(b.firstName);
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "role":
          comparison = (a.role[0] || "").localeCompare(b.role[0] || "");
          break;
        default:
          comparison = a.firstName.localeCompare(b.firstName);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    setData(filteredUsers);
  }, [allUsers, searchTerm, roleFilter, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Export users to CSV
  const exportUserData = () => {
    if (!allUsers || allUsers.length === 0) {
      toast.error("No data to export");
      return;
    }

    const convertToCSV = (data) => {
      const csvRows = data.map((user) => ({
        ID: user._id,
        "First Name": user.firstName,
        "Last Name": user.lastName,
        Username: user.userName,
        Email: user.email,
        Roles: user.role.join(", "),
        Points: user.points,
        "Created At": user.createdAt,
        "Show Email": user.privacySettings?.showEmail || false,
      }));

      if (csvRows.length === 0) return "";

      const headers = Object.keys(csvRows[0]);
      const csvArray = [
        headers.join(","), // header row first
        ...csvRows.map((row) =>
          headers.map((field) => `"${String(row[field] || "").replace(/"/g, '""')}"`).join(",")
        ),
      ];

      return csvArray.join("\n");
    };

    const csvData = convertToCSV(allUsers);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("User data exported successfully as CSV");
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Users</h1>
            <p className="text-sm text-gray-600">
              Manage all user accounts and permissions
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportUserData} className="cursor-pointer bg-white px-4 py-2 rounded-md border border-gray-300 text-gray-700">
              Export CSV
            </button>
            <Button
              onClick={() => navigate("/new-user")}
              className="bg-[#862633] text-white ml-auto py-2 px-4 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add User
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-4 px-6 rounded-md shadow-sm">
          <div className="flex flex-wrap gap-2 items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search users by name, email or role..."
                className="pl-10 w-80 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-4">
            Sort By:&emsp;
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>
            <button onClick={toggleSortDirection}>
              <svg
                width="19"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.77421 15.5898C5.58369 15.7959 5.31821 15.9146 5.03712 15.9146C4.75602 15.9146 4.49054 15.7959 4.30003 15.5898L1.55155 12.5914C1.17989 12.1854 1.20487 11.5514 1.61402 11.1797C2.02317 10.808 2.65407 10.833 3.02573 11.2422L4.03767 12.3447V2.92181C4.03767 2.36899 4.4843 1.92236 5.03712 1.92236C5.58993 1.92236 6.03656 2.36899 6.03656 2.92181V12.3447L7.0485 11.2391C7.42017 10.833 8.05419 10.8049 8.46021 11.1766C8.86624 11.5483 8.89435 12.1823 8.52268 12.5883L5.77421 15.5866V15.5898ZM10.0343 10.9174C10.0343 10.3645 10.481 9.91792 11.0338 9.91792H15.0316C15.4345 9.91792 15.7999 10.1615 15.956 10.5363C16.1122 10.9111 16.0248 11.339 15.7405 11.6263L13.4481 13.9157H15.0316C15.5844 13.9157 16.031 14.3623 16.031 14.9151C16.031 15.468 15.5844 15.9146 15.0316 15.9146H11.0338C10.6309 15.9146 10.2655 15.671 10.1093 15.2962C9.95313 14.9214 10.0406 14.4935 10.3248 14.2062L12.6173 11.9168H11.0338C10.481 11.9168 10.0343 11.4702 10.0343 10.9174ZM13.0327 1.92236C13.4106 1.92236 13.7573 2.13475 13.9259 2.47518L15.9248 6.47296L16.4245 7.4724C16.6713 7.96588 16.4714 8.56555 15.9779 8.81228C15.4844 9.05902 14.8848 8.85913 14.638 8.36566L14.4132 7.91903H11.6522L11.4273 8.36566C11.1806 8.85913 10.5809 9.05902 10.0874 8.81228C9.59396 8.56555 9.39407 7.96588 9.64081 7.4724L10.1405 6.47296L12.1394 2.47518C12.3081 2.13475 12.6548 1.92236 13.0327 1.92236ZM12.4018 6.41986H13.6636L13.0327 5.15806L12.4018 6.41986Z"
                  fill="#6B7280"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <UserTable data={data} />
      <Dashboard data={activityData} />
    </div>
  );
};

export default Users;
