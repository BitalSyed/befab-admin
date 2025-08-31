import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { API_URL, getCookie } from "@/components/cookieUtils";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

export function UserTable({ data, d }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [locked, setLocked] = useState(false);
  const [id, setId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function openEditDialog(userId, userData) {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setUserName(userData.username.split("@Befab")[0]);
    setEmail(userData.email);
    setPassword(userData.password);
    setRole(userData.role);
    setLocked(userData.isLocked);
    setId(userId);
    setIsDialogOpen(true);
  }

  const publishUser = () => {
    fetch(`${API_URL}/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("skillrextech_auth"),
        firstName,
        lastName,
        username: userName+"@Befab",
        email,
        password,
        role,
        isLocked: locked,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("User updated successfully!");
          setIsDialogOpen(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("An error occurred while updating the user.");
      });
  };

  const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie("skillrextech_auth"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("User deleted successfully!");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user.");
        });
    }
  };

  // Calculate pagination
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);

      if (leftBound > 1) {
        pageNumbers.push(1);
        if (leftBound > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  function RelativeTime({ dateString }) {
    const formatRelativeTime = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };

      for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
          return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
      }

      return "just now";
    };

    return <span>{formatRelativeTime(dateString)}</span>;
  }

  return (
    <div className="space-y-4 bg-white rounded-md overflow-hidden">
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="w-[48px]"></TableHead>
              <TableHead className="text-gray-500">USER</TableHead>
              <TableHead className="text-gray-500">RECORD ID</TableHead>
              <TableHead className="text-gray-500">USERNAME</TableHead>
              <TableHead className="text-gray-500">STATUS</TableHead>
              <TableHead className="text-gray-500">ROLE</TableHead>
              <TableHead className="text-gray-500">ACCOUNT CREATED</TableHead>
              <TableHead className="text-gray-500">2FA</TableHead>
              <TableHead className="text-gray-500">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {user.firstName + " " + user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </TableCell>
                <TableCell>{user.userId||'N/A'}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Badge variant="enabled">
                    {user.isActive
                      ? "Active"
                      : user.isLocked
                      ? "Locked"
                      : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="enabled">Enabled</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => openEditDialog(user._id, user)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteUser(user._id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* HTML-based Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-xs !z-[101] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-lg w-full rounded-2xl bg-white shadow-xl backdrop-blur-sm border border-gray-200 overflow-y-auto max-h-[90vh]" style={{scrollbarWidth: 'thin'}}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Update the user details below.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  publishUser();
                }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border text-gray-800 border-gray-300 outline-none rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border text-gray-800 border-gray-300 outline-none rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    User Name
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="border text-gray-800 border-gray-300 outline-none rounded-md p-2 w-full pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      @Befab
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border text-gray-800 border-gray-300 outline-none rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border text-gray-800 border-gray-300 outline-none rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border text-gray-800 border-gray-300 outline-none rounded-md p-2"
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Locked
                  </label>
                  <select
                    value={locked}
                    onChange={(e) => setLocked(e.target.value === "true")}
                    className="border text-gray-800 border-gray-300 outline-none rounded-md p-2"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="text-sm font-medium p-2 px-4 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-sm font-medium p-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center gap-2 cursor-pointer"
                  >
                    <FaCheck /> Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-center justify-between text-sm text-gray-500 px-5 pb-5">
        <div>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, totalItems)} of {totalItems} users
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {getPageNumbers().map((number, index) =>
            number === "..." ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={number === currentPage ? "custom" : "outline"}
                size="sm"
                onClick={() => paginate(number)}
              >
                {number}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}