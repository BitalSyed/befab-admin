import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewNewsLetter = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [status, setStatus] = useState("draft"); // default draft
  const [scheduleDate, setScheduleDate] = useState("");
  const [Case, setCase] = useState(0);
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const result = await response.json();

        if (result.error) {
          toast.error(result.error);
        } else {
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchSurvey();
  }, []);

  const getFilteredUsers = () => {
    return data; // all
  };

  const publishNews = () => {
    if (status === "scheduled") {
      if (!scheduleDate) {
        toast.error("Please select a schedule date.");
        return;
      }
      if (new Date(scheduleDate) <= new Date()) {
        toast.error("Schedule date must be in the future.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("token", getCookie("skillrextech_auth"));
    formData.append("title", title);
    const filtered = getFilteredUsers().map((u) => u.username);
    const excludedUsers = filtered.filter((u) => !selectedUsers.includes(u));
    formData.append("audience", excludedUsers);
    formData.append("description", description);
    formData.append("status", status);

    if (status === "scheduled" && scheduleDate) {
      formData.append("schedule", scheduleDate);
    }

    if (picture) {
      formData.append("picture", picture);
    }

    if (id) {
      formData.append("id", id);
    }

    fetch(`${API_URL}/admin/newsletters`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getCookie("skillrextech_auth")}` },
      body: formData, // sending multipart/form-data
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          navigate("/news-letters"); // move after success
        }
      })
      .catch((error) => {
        console.error("Error adding newsletter:", error);
        toast.error("An error occurred while adding the newsletter.");
      });
  };

  useEffect(() => {
    if (!id) return;

    const fetchNewsletter = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/newsletters/get/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          toast.error(data.error);
        } else {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setStatus(data.status || "");
          setScheduleDate(data.schedule || "");
          setCase(1);
          // optionally handle picture if needed
        }
      } catch (error) {
        console.error("Error fetching newsletter:", error);
        toast.error("An error occurred while fetching the newsletter.");
      }
    };

    fetchNewsletter();
  }, [id]);

  return (
    <div className="w-[100%] p-5 flex flex-col gap-5">
      <button
        onClick={() => navigate("/news-letters")}
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
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Title</h3>
          <input
            type="text"
            placeholder="Newsletter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Description</h3>
          <textarea
            placeholder="Newsletter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2 h-32"
          />
        </div>

        {/* Picture */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Picture</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPicture(e.target.files[0])}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
          {picture && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {picture.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Select Users</h3>
          <select
            onChange={(e) => {
              const username = e.target.value;

              if (username === "__all__") {
                // Add all users from the current audience
                const allUsernames = getFilteredUsers().map((u) => u.username);
                setSelectedUsers(allUsernames);
              } else if (username === "__clear__") {
                // Remove all
                setSelectedUsers([]);
              } else if (username && !selectedUsers.includes(username)) {
                // Add individual user
                setSelectedUsers([...selectedUsers, username]);
              }
            }}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="">-- Select User --</option>
            <option value="__all__">Add All</option>
            <option value="__clear__">Remove All</option>
            {getFilteredUsers().map((u, i) => (
              <option key={i} value={u.username}>
                {u.username}
              </option>
            ))}
          </select>

          {/* Selected tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedUsers.map((user, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center gap-2"
              >
                {user}
                <button
                  onClick={() =>
                    setSelectedUsers(selectedUsers.filter((u) => u !== user))
                  }
                  className="text-red-500"
                >
                  <FaTrash size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Status</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        {/* Schedule Date (only if scheduled) */}
        {status === "scheduled" && (
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-liblack">
              Schedule Date & Time
            </h3>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="border text-liblack border-gray-500 outline-none rounded-md p-2"
              min={new Date().toISOString().slice(0, 16)} // restrict to future
            />
          </div>
        )}

        {/* Button */}
        <div className="flex gap-3">
          <button
            onClick={publishNews}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Save Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNewsLetter;
