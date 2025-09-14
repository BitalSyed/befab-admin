import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useEffect, useState } from "react";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewSurvey = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("optional");
  const [audience, setAudience] = useState("all");
  const [dueDate, setDueDate] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [data, setData] = useState([]);
  const [questions, setQuestions] = useState([
    { q: "", kind: "text", options: [] },
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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
    if (audience === "admins") {
      return data.filter((u) => u.role === "admin");
    } else if (audience === "members") {
      return data.filter((u) => u.role === "member");
    }
    return data; // all
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { q: "", kind: "text", options: [] }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const publishSurvey = async () => {
    if (!title || questions.some((q) => !q.q)) {
      toast.error("Title and all questions are required.");
      return;
    }

    const filtered = getFilteredUsers().map((u) => u.username);
    const excludedUsers = filtered.filter((u) => !selectedUsers.includes(u));

    try {
      const payload = {
        title,
        description,
        type,
        audience,
        dueDate: dueDate ? new Date(dueDate) : null,
        durationMin: durationMin ? Number(durationMin) : null,
        questions,
        excludedUsers, // send excluded list
      };

      const response = await fetch(`${API_URL}/admin/surveys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message || "Survey created successfully!");
        navigate("/surveys");
      }
    } catch (error) {
      console.error("Error adding survey:", error);
      toast.error("An error occurred while creating the survey.");
    }
  };

  return (
    <div className="w-[100%] p-5 flex flex-col gap-5">
      <button
        onClick={() => navigate("/surveys")}
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
          <h3 className="text-lg font-semibold text-liblack">Survey Title</h3>
          <input
            type="text"
            placeholder="Enter survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Description</h3>
          <textarea
            placeholder="Enter survey description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2 h-24"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Type</h3>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="optional">Optional</option>
            <option value="required">Required</option>
          </select>
        </div>

        {/* Audience */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Audience</h3>
          <select
            value={audience}
            onChange={(e) => {
              setAudience(e.target.value);
              setSelectedUsers([]); // reset selected when audience changes
            }}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          >
            <option value="all">All</option>
            <option value="members">Members</option>
            <option value="admins">Admins</option>
          </select>
        </div>

        {/* Select Users */}
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

        {/* Due Date & Duration */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-liblack">Due Date</h3>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border text-liblack border-gray-500 outline-none rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-liblack">
              Duration (min)
            </h3>
            <input
              type="number"
              placeholder="e.g. 30"
              value={durationMin}
              onChange={(e) => setDurationMin(e.target.value)}
              className="border text-liblack border-gray-500 outline-none rounded-md p-2"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-liblack">Questions</h3>
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border p-3 rounded-md flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="Enter question text"
                value={q.q}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "q", e.target.value)
                }
                className="border p-2 rounded-md"
              />
              <select
                value={q.kind}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "kind", e.target.value)
                }
                className="border p-2 rounded-md"
              >
                <option value="text">Text</option>
                <option value="single">Single Choice</option>
                <option value="multi">Multiple Choice</option>
                <option value="number">Number</option>
              </select>

              {/* Options (only for single/multi) */}
              {(q.kind === "single" || q.kind === "multi") && (
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Option ${oIndex + 1} (other for "Other")`}
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="border p-2 rounded-md flex-1"
                      />
                      <button
                        onClick={() => removeOption(qIndex, oIndex)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(qIndex)}
                    className="text-sm bg-gray-200 px-2 py-1 rounded-md flex items-center gap-2"
                  >
                    <FaPlus /> Add Option
                  </button>
                </div>
              )}

              <button
                onClick={() => removeQuestion(qIndex)}
                className="text-red-500 self-start mt-2 flex items-center gap-2"
              >
                <FaTrash /> Remove Question
              </button>
            </div>
          ))}
          <button
            onClick={addQuestion}
            className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaPlus /> Add Question
          </button>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            onClick={publishSurvey}
            className="text-sm font-medium p-2 rounded-md text-white bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            <FaCheck /> Create Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSurvey;
