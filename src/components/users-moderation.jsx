import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URL, getCookie } from "./cookieUtils";
import { toast } from "react-toastify";

export default function ModerationPanel({ data }) {
  const [flaggedVideos, setFlaggedVideos] = useState([]);
  const [pendingVideos, setPendingVideos] = useState([]);
  
  useEffect(() => {
    if (!data) return;
    
    const flagged = data.filter((video) => video.status === "flagged");
    const pending = data.filter((video) => video.status === "pending");
    
    setFlaggedVideos(flagged);
    setPendingVideos(pending);
  }, [data]);

  return (
    <div>
      {/* Flagged Content */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold -mb-2">
          Moderation & Compliance
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 lg:p-4">
        <Card className="p-4">
          <div className="flex justify-between items-center -mb-2">
            <h2 className="font-semibold text-lg">Flagged Content</h2>
            <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-md">
              {flaggedVideos.length} items
            </span>
          </div>

          {flaggedVideos.length > 0 ? (
            flaggedVideos.map((video, i) => (
              <FlaggedItem
                key={i}
                title={video.title}
                flaggedFor={video.caption}
                flaggedBy={video.uploader.username}
                image={
                  API_URL + video.thumbnailUrl || "https://placehold.co/600x400"
                }
                id={video._id}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-4">No flagged content</p>
          )}
        </Card>

        {/* Pending Videos */}
        <Card className="p-4">
          <div className="flex justify-between items-center -mb-2">
            <h2 className="font-semibold text-lg">Pending Approval</h2>
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
              {pendingVideos.length} items
            </span>
          </div>

          {pendingVideos.length > 0 ? (
            pendingVideos.map((video, i) => (
              <PendingVideoItem
                key={i}
                title={video.title}
                uploadedBy={video.uploader.username}
                date={new Date(video.createdAt).toLocaleDateString()}
                time={new Date(video.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                image={
                  API_URL + video.thumbnailUrl || "https://placehold.co/600x400"
                }
                id={video._id}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-4">No pending videos</p>
          )}
        </Card>
      </div>
    </div>
  );
}

function FlaggedItem({ title, flaggedFor, flaggedBy, image, id }) {
  function approve() {
    fetch(`${API_URL}/admin/videos/${id}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to approve video");
        return res.json();
      })
      .then((data) => {
        console.log("Approved successfully:", data);
        toast.success(data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error approving video:", err.message);
        toast.error("Failed to approve video");
      });
  }
  
  function reject() {
    fetch(`${API_URL}/admin/videos/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to reject video");
        return res.json();
      })
      .then((data) => {
        console.log("Rejected successfully:", data);
        toast.success(data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error rejecting video:", err.message);
        toast.error("Failed to reject video");
      });
  }
  
  return (
    <div className="flex items-start gap-4 py-8 -mb-5 border-t">
      <img src={image} alt="" className="h-14 rounded object-cover" />
      <div className="flex-1">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">Caption: {flaggedFor}</p>
        <p className="text-xs text-muted-foreground mt-2">
          User Name: {flaggedBy}
        </p>
      </div>
      <div className="flex gap-2 mt-auto">
        <Button onClick={() => reject()} variant="red" size="sm">
          Reject
        </Button>
        <Button
          onClick={() => approve()}
          variant="green"
          size="sm"
          className="text-green-600 border-green-400"
        >
          Approve
        </Button>
      </div>
    </div>
  );
}

function PendingVideoItem({ title, uploadedBy, date, time, image, id }) {
  function approve() {
    fetch(`${API_URL}/admin/videos/${id}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to approve video");
        return res.json();
      })
      .then((data) => {
        console.log("Approved successfully:", data);
        toast.success(data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error approving video:", err.message);
        toast.error("Failed to approve video");
      });
  }
  
  function reject() {
    fetch(`${API_URL}/admin/videos/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to reject video");
        return res.json();
      })
      .then((data) => {
        console.log("Rejected successfully:", data);
        toast.success(data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error rejecting video:", err.message);
        toast.error("Failed to reject video");
      });
  }

  return (
    <div className="flex items-start gap-4 py-4 border-t">
      <img src={image} alt="" className="h-14 rounded object-cover" />
      <div className="flex-1">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">by {uploadedBy}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {date} • {time}
        </p>
      </div>
      <div className="flex gap-2 mt-auto">
        <Button onClick={() => reject()} variant="red" size="sm">
          Reject
        </Button>
        <Button
          onClick={() => approve()}
          variant="green"
          size="sm"
          className="text-green-600 border-green-400"
        >
          Approve
        </Button>
      </div>
    </div>
  );
}