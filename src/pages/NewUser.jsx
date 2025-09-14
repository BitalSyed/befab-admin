import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const saveUpdate = () => {
    toast.success("Saved draft");
  };

  const publishUser = () => {
    fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("skillrextech_auth"),
        firstName,
        lastName,
        username: userName + "@befab",
        userId,
        email,
        passwordHash: password,
        role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        toast.error("An error occurred while adding the user.");
      });
    // reset form
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setRole("member");
  };

  const navigate = useNavigate();

  return (
    <div className="w-[100%] p-5 flex flex-col gap-5">
      <button
        onClick={() => navigate("/users")}
        class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group ml-auto cursor-pointer shadow-lg"
        type="button"
      >
        <div class="bg-[#732e26] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#ffffff"
            ></path>
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <p class="translate-x-2">Back</p>
      </button>

      <div className="w-[80%] flex bg-white flex-col gap-5 border-2 border-gray-300 p-5 rounded-md">
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">First Name</h3>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Last Name</h3>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* User Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">User Name</h3>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border text-liblack border-gray-500 outline-none rounded-md p-2 w-full pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              @Befab
            </span>
          </div>
        </div>

        {/* User Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">User ID</h3>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border text-liblack border-gray-500 outline-none rounded-md p-2 w-full pr-16"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Email</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Role</h3>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={publishUser}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
