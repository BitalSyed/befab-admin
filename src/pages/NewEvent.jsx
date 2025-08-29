import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const publishEvent = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time for comparison
  const eventDate = new Date(start); // make sure `date` is defined in state

  // 🔹 Validation
  if (!title || !description || !start) {
    toast.error("All fields are required.");
    return;
  }

  if (eventDate < today) {
    toast.error("Event date cannot be before today.");
    return;
  }

  try {
    // 🔹 Get user's public IP
    const ipResponse = await fetch("https://api.ipify.org/?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip || "";

    // 🔹 Prepare JSON payload
    const payload = {
      token: getCookie("skillrextech_auth"),
      title,
      location: description, // assuming description is location
      date: start,
      ip,
    };

    const response = await fetch(`${API_URL}/admin/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) toast.error(data.error);
    else {
      toast.success(data.message);
      navigate("/calender");
    }
  } catch (error) {
    console.error("Error adding event:", error);
    toast.error("An error occurred while adding the event.");
  }
};


  return (
    <div className="w-[80%] p-5 flex flex-col gap-5">
      <div className="flex bg-white flex-col gap-5 border-2 border-gray-300 p-5 rounded-md">
        
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Title</h3>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Location</h3>
          <textarea
            placeholder="Competition Location (eg. Conference Room A...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2 h-32"
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Date</h3>
          <input
            type="date"
            value={start}
            min={new Date().toISOString().split("T")[0]} // 🔹 disable past dates
            onChange={(e) => setStart(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Button */}
        <div className="flex gap-3">
          <button
            onClick={publishEvent}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Add Event

          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
