import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewGroup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [visibility, setVisibility] = useState("public");

  const publishGroup = async () => {
  if (!name || !description || !imageFile || !bannerFile) {
    toast.error("All fields are required.");
    return;
  }

  try {
    // 🔹 Get user's public IP
    const ipResponse = await fetch("https://api.ipify.org/?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip || "";

    // 🔹 Prepare FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("visibility", visibility);
    formData.append("ip", ip);
    formData.append("image", imageFile);
    formData.append("banner", bannerFile);

    // 🔹 Send request with token in header
    const response = await fetch(`${API_URL}/admin/groups`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`, // or "x-auth-token": ...
      },
      body: formData,
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message || "Group created successfully!");
      navigate("/groups");
    }
  } catch (error) {
    console.error("Error adding group:", error);
    toast.error("An error occurred while adding the group.");
  }
};

  return (
    <div className="w-[100%] p-5 flex flex-col gap-5">
      <button
        onClick={() => navigate("/groups")}
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
        
        {/* Group Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Group Name</h3>
          <input
            type="text"
            placeholder="Enter group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Description</h3>
          <textarea
            placeholder="Enter group description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2 h-32"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Group Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Banner Upload */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Banner Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerFile(e.target.files[0])}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Visibility */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Visibility</h3>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Button */}
        <div className="flex gap-3">
          <button
            onClick={publishGroup}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGroup;
