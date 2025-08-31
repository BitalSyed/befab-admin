import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
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
  const { id } = useParams();

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
    formData.append("description", description);
    formData.append("status", status);

    if (status === "scheduled" && scheduleDate) {
      formData.append("schedule", scheduleDate);
    }

    if (picture) {
      formData.append("picture", picture);
    }

    if(id){
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
          setCase(1)
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
    <div className="w-[80%] p-5 flex flex-col gap-5">
      <div className="flex bg-white flex-col gap-5 border-2 border-gray-300 p-5 rounded-md">
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
