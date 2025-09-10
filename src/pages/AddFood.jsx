import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const AddFood = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("member");

  const saveUpdate = () => {
    toast.success("Saved draft");
  };

  const publishUser = () => {
    fetch(`${API_URL}/admin/food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("skillrextech_auth"),
        name: firstName,
        calories: lastName,
        category: role,
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

  return (
    <div className="w-[80%] p-5 flex flex-col gap-5">
      <div className="flex bg-white flex-col gap-5 border-2 border-gray-300 p-5 rounded-md">
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Food Name</h3>
          <input
            type="text"
            placeholder="Food Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Calories</h3>
          <input
            type="number"
            placeholder="Calories"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Category</h3>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="grains">Grains</option>
            <option value="dairy">Dairy</option>
            <option value="proteins">Proteins</option>
            <option value="more">More</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={publishUser}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Add Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
