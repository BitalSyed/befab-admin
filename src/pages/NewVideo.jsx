import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, getCookie } from "@/components/cookieUtils";

const categories = ["BeFAB NCCU", "Mentor Meetup", "Students"];

const NewVideo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [durationSec, setDurationSec] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !videoFile) {
      toast.error("Title, Category, and Video file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("category", category);
    formData.append("video", videoFile);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    formData.append("durationSec", durationSec || 0);

    try {
      const res = await fetch(`${API_URL}/admin/videos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.error) toast.error(data.error);
      else {
        toast.success("Video uploaded successfully!");
        navigate("/videos");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while uploading the video.");
    }
  };

  return (
    <>
      <button
        onClick={() => navigate("/videos")}
        class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group ml-auto cursor-pointer shadow-lg mt-5 mr-5"
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
      <div className="w-[80%] m-5 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upload New Video</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col">
            <label className="font-medium">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md p-2 mt-1"
              required
            />
          </div>

          {/* Caption */}
          <div className="flex flex-col">
            <label className="font-medium">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border rounded-md p-2 mt-1"
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-medium">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md p-2 mt-1"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Video File */}
          <div className="flex flex-col">
            <label className="font-medium">Video File *</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="border rounded-md p-2 mt-1"
              required
            />
          </div>

          {/* Thumbnail File */}
          <div className="flex flex-col">
            <label className="font-medium">Thumbnail (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="border rounded-md p-2 mt-1"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label className="font-medium">Duration (seconds)</label>
            <input
              type="number"
              min={0}
              value={durationSec}
              onChange={(e) => setDurationSec(e.target.value)}
              className="border rounded-md p-2 mt-1"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 transition"
          >
            Upload Video
          </button>
        </form>
      </div>{" "}
    </>
  );
};

export default NewVideo;
