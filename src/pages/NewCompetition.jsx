import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = ['Fitness', 'Nutrition', 'Wellness', 'Strength', 'Cardio', 'Team'];

const NewCompetition = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState(""); // 🔹 New state

  const publishCompetition = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Validation
  if (!title || !description || !start || !end || !category) {
    toast.error("All fields are required.");
    return;
  }

  if (startDate < today) {
    toast.error("Start date cannot be before today.");
    return;
  }

  if (endDate < startDate) {
    toast.error("End date cannot be before start date.");
    return;
  }

  // Send JSON
  fetch(`${API_URL}/admin/competitions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
    },
    body: JSON.stringify({ title, description, start, end, category }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) toast.error(data.error);
      else {
        toast.success(data.message);
        navigate("/competitions");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Error adding competition.");
    });
};


  return (
    <div className="w-[80%] p-5 flex flex-col gap-5">
      <div className="flex bg-white flex-col gap-5 border-2 border-gray-300 p-5 rounded-md">
        
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Title</h3>
          <input
            type="text"
            placeholder="Competition Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Description</h3>
          <textarea
            placeholder="Competition Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2 h-32"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Category</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Start Date</h3>
          <input
            type="date"
            value={start}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStart(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">End Date</h3>
          <input
            type="date"
            value={end}
            min={start || new Date().toISOString().split("T")[0]}
            onChange={(e) => setEnd(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Button */}
        <div className="flex gap-3">
          <button
            onClick={publishCompetition}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Publish Competition
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCompetition;
