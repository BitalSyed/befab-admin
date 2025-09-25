import { API_URL, getCookie } from "@/components/cookieUtils";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeepDiveForm from "@/components/DeepDiveForm";
import uploadFileToFirebase from "@/helper/uploadFileToFirebase";

const NewNewsLetter = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [status, setStatus] = useState("draft"); // default draft
  const [scheduleDate, setScheduleDate] = useState("");
  const [Case, setCase] = useState(0);
  const [deepDives, setDeepDives] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

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

  const publishNews = async () => {
    setIsLoading(true);
    try {
      const pictureUrl = await uploadFileToFirebase(
        picture,
        "NewsletterPictures"
      );
      const pdfUrl = await uploadFileToFirebase(pdfFile, "NewsletterPdfs");

      const deepDiveUrls = await Promise.all(
        deepDives.map(async (dd) => {
          const ddPictureUrl = await uploadFileToFirebase(
            dd.picture,
            "DeepDivePictures"
          );
          const ddPdfUrl = await uploadFileToFirebase(
            dd.pdfFile,
            "DeepDivePdfs"
          );
          return {
            title: dd.title,
            description: dd.description,
            picture: ddPictureUrl,
            pdf: ddPdfUrl,
          };
        })
      );

      const payload = {
        token: getCookie("skillrextech_auth"),
        title,
        description,
        status,
        scheduledAt: status === "scheduled" ? scheduleDate : undefined,
        audience: getFilteredUsers()
          .map((u) => u.username)
          .filter((u) => selectedUsers.includes(u)),
        picture: pictureUrl,
        pdf: pdfUrl,
        deepDives: deepDiveUrls,
        id: id || undefined,
      };

      const response = await fetch(`${API_URL}/admin/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        navigate("/news-letters");
      }
    } catch (err) {
      console.error("Error publishing newsletter:", err);
      toast.error("An error occurred while publishing.");
    } finally {
      setIsLoading(false); // stop loading
    }
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

          setPicture(data.picture || null);
          setPdfFile(data.pdf || null);

          setDeepDives(
            (data.deepDives || []).map((dd) => ({
              title: dd.title || "",
              description: dd.description || "",
              picture: dd.picture || null,
              pdfFile: dd.pdf || null,
            }))
          );

          if (Array.isArray(data.includedUsers)) {
            setSelectedUsers(data.includedUsers);
          }
        }
      } catch (error) {
        console.error("Error fetching newsletter:", error);
        toast.error("An error occurred while fetching the newsletter.");
      }
    };

    fetchNewsletter();
  }, [id]);

  // Deep Dive handlers
  const handleAddDeepDive = () => {
    if (deepDives.length >= 4) return;
    setDeepDives([
      ...deepDives,
      { title: "", description: "", picture: null, pdfFile: null },
    ]);
  };

  const handleDeepDiveChange = (index, values) => {
    setDeepDives((prev) =>
      prev.map((dd, i) => (i === index ? { ...dd, ...values } : dd))
    );
  };

  const handleRemoveDeepDive = (index) => {
    setDeepDives((prev) => prev.filter((_, i) => i !== index));
  };

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
          {picture && typeof picture === "string" ? (
            <a
              href={picture}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 mt-1 underline"
            >
              View current picture
            </a>
          ) : picture ? (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {picture.name}
            </p>
          ) : null}
        </div>

        {/* PDF */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-liblack">Newsletter PDF</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          />
          {pdfFile && typeof pdfFile === "string" ? (
            <a
              href={pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 mt-1 underline"
            >
              View current PDF
            </a>
          ) : pdfFile ? (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {pdfFile.name}
            </p>
          ) : null}
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

        {/* Deep Dive Content Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddDeepDive}
            disabled={deepDives.length >= 4}
            className={`text-sm font-medium p-2 rounded-md text-white ${
              deepDives.length >= 4
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Add Deep Dive Content{" "}
            {deepDives.length > 0 ? `(${deepDives.length}/4)` : ""}
          </button>
        </div>

        {/* Deep Dive Forms List */}
        <div className="flex flex-col gap-5">
          {deepDives.map((dd, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-md font-semibold text-liblack">
                  Deep Dive #{idx + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => handleRemoveDeepDive(idx)}
                  className="text-sm font-medium px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
              <DeepDiveForm
                initialValues={dd}
                onChange={(values) => handleDeepDiveChange(idx, values)}
              />
            </div>
          ))}
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
            disabled={isLoading} // disable while loading
            className={`text-sm font-medium p-2 rounded-md text-white flex items-center gap-2 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <FaCheck />
            )}
            {isLoading ? "Saving..." : "Save Newsletter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNewsLetter;
