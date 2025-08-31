import { API_URL, getCookie } from "@/components/cookieUtils";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeatureUsage } from "@/components/users-analytics";
import ModerationPanel from "@/components/users-moderation";
import VideoFilterBar from "@/components/users-search";
import VideoTable from "@/components/users-table";
import React, { useEffect, useState } from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/videos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          toast.error(data.error);
        } else {
          setUsers(data); // assuming setUsers exists
          setData(data); // assuming setData exists
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchCompetitions();
  }, []);
  return (
    <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
      <div className=" grid grid-cols-1 gap-4  @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        <Card className="@container/card rounded-md justify-between">
          <CardHeader>
            <CardDescription className="mt-3">Total Videos</CardDescription>

            <CardAction>
              <svg
                width="33"
                height="41"
                viewBox="0 0 33 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.540039"
                  y="0.67041"
                  width="31.97"
                  height="39.96"
                  rx="8"
                  fill="#DBEAFE"
                />
                <path
                  d="M8.53003 15.1504C8.53003 14.0473 9.4269 13.1504 10.53 13.1504H22.53C23.6332 13.1504 24.53 14.0473 24.53 15.1504V25.1504C24.53 26.2535 23.6332 27.1504 22.53 27.1504H10.53C9.4269 27.1504 8.53003 26.2535 8.53003 25.1504V15.1504ZM10.03 23.6504V24.6504C10.03 24.9254 10.255 25.1504 10.53 25.1504H11.53C11.805 25.1504 12.03 24.9254 12.03 24.6504V23.6504C12.03 23.3754 11.805 23.1504 11.53 23.1504H10.53C10.255 23.1504 10.03 23.3754 10.03 23.6504ZM21.53 23.1504C21.255 23.1504 21.03 23.3754 21.03 23.6504V24.6504C21.03 24.9254 21.255 25.1504 21.53 25.1504H22.53C22.805 25.1504 23.03 24.9254 23.03 24.6504V23.6504C23.03 23.3754 22.805 23.1504 22.53 23.1504H21.53ZM10.03 19.6504V20.6504C10.03 20.9254 10.255 21.1504 10.53 21.1504H11.53C11.805 21.1504 12.03 20.9254 12.03 20.6504V19.6504C12.03 19.3754 11.805 19.1504 11.53 19.1504H10.53C10.255 19.1504 10.03 19.3754 10.03 19.6504ZM21.53 19.1504C21.255 19.1504 21.03 19.3754 21.03 19.6504V20.6504C21.03 20.9254 21.255 21.1504 21.53 21.1504H22.53C22.805 21.1504 23.03 20.9254 23.03 20.6504V19.6504C23.03 19.3754 22.805 19.1504 22.53 19.1504H21.53ZM10.03 15.6504V16.6504C10.03 16.9254 10.255 17.1504 10.53 17.1504H11.53C11.805 17.1504 12.03 16.9254 12.03 16.6504V15.6504C12.03 15.3754 11.805 15.1504 11.53 15.1504H10.53C10.255 15.1504 10.03 15.3754 10.03 15.6504ZM21.53 15.1504C21.255 15.1504 21.03 15.3754 21.03 15.6504V16.6504C21.03 16.9254 21.255 17.1504 21.53 17.1504H22.53C22.805 17.1504 23.03 16.9254 23.03 16.6504V15.6504C23.03 15.3754 22.805 15.1504 22.53 15.1504H21.53ZM13.53 16.1504V18.1504C13.53 18.7035 13.9769 19.1504 14.53 19.1504H18.53C19.0832 19.1504 19.53 18.7035 19.53 18.1504V16.1504C19.53 15.5973 19.0832 15.1504 18.53 15.1504H14.53C13.9769 15.1504 13.53 15.5973 13.53 16.1504ZM14.53 21.1504C13.9769 21.1504 13.53 21.5973 13.53 22.1504V24.1504C13.53 24.7035 13.9769 25.1504 14.53 25.1504H18.53C19.0832 25.1504 19.53 24.7035 19.53 24.1504V22.1504C19.53 21.5973 19.0832 21.1504 18.53 21.1504H14.53Z"
                  fill="#2563EB"
                />
              </svg>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
              {users.length}{" "}
            </CardTitle>
            <div className="text-muted-foreground">Total posted</div>
          </CardFooter>
        </Card>
        <Card className="@container/card rounded-md justify-between">
          <CardHeader>
            <CardDescription className="mt-3">
              pending Approvals
            </CardDescription>

            <CardAction>
              <svg
                width="33"
                height="41"
                viewBox="0 0 33 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.790039"
                  y="0.67041"
                  width="31.97"
                  height="39.96"
                  rx="8"
                  fill="#FEF9C3"
                />
                <path
                  d="M16.78 12.1504C18.9018 12.1504 20.9366 12.9932 22.4369 14.4935C23.9372 15.9938 24.78 18.0287 24.78 20.1504C24.78 22.2721 23.9372 24.307 22.4369 25.8072C20.9366 27.3075 18.9018 28.1504 16.78 28.1504C14.6583 28.1504 12.6235 27.3075 11.1232 25.8072C9.62288 24.307 8.78003 22.2721 8.78003 20.1504C8.78003 18.0287 9.62288 15.9938 11.1232 14.4935C12.6235 12.9932 14.6583 12.1504 16.78 12.1504ZM16.03 15.9004V20.1504C16.03 20.4004 16.155 20.6348 16.3644 20.7754L19.3644 22.7754C19.7082 23.0066 20.1738 22.9129 20.405 22.566C20.6363 22.2191 20.5425 21.7566 20.1957 21.5254L17.53 19.7504V15.9004C17.53 15.4848 17.1957 15.1504 16.78 15.1504C16.3644 15.1504 16.03 15.4848 16.03 15.9004Z"
                  fill="#CA8A04"
                />
              </svg>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
              {users.filter((video) => video.status === "pending").length+users.filter((video) => video.status === "flagged").length}{" "}
              <p className="text-xs text-gray-500 ml-2 flex items-center">
                All caught up!
              </p>
            </CardTitle>
            <div className="text-muted-foreground">Admin only category</div>
          </CardFooter>
        </Card>
        <Card className="@container/card rounded-md justify-between">
          <CardHeader>
            <CardDescription className="mt-3">Recent Uploads</CardDescription>

            <CardAction>
              <svg
                width="33"
                height="41"
                viewBox="0 0 33 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0600586"
                  y="0.67041"
                  width="31.97"
                  height="39.96"
                  rx="8"
                  fill="#DCFCE7"
                />
                <path
                  d="M17.05 15.5662V23.1506C17.05 23.7037 16.6032 24.1506 16.05 24.1506C15.4969 24.1506 15.05 23.7037 15.05 23.1506V15.5662L12.7563 17.86C12.3657 18.2506 11.7313 18.2506 11.3407 17.86C10.95 17.4693 10.95 16.835 11.3407 16.4443L15.3407 12.4443C15.7313 12.0537 16.3657 12.0537 16.7563 12.4443L20.7563 16.4443C21.1469 16.835 21.1469 17.4693 20.7563 17.86C20.3657 18.2506 19.7313 18.2506 19.3407 17.86L17.05 15.5662ZM10.05 23.1506H14.05C14.05 24.2537 14.9469 25.1506 16.05 25.1506C17.1532 25.1506 18.05 24.2537 18.05 23.1506H22.05C23.1532 23.1506 24.05 24.0475 24.05 25.1506V26.1506C24.05 27.2537 23.1532 28.1506 22.05 28.1506H10.05C8.94692 28.1506 8.05005 27.2537 8.05005 26.1506V25.1506C8.05005 24.0475 8.94692 23.1506 10.05 23.1506ZM21.55 26.4006C21.749 26.4006 21.9397 26.3216 22.0804 26.1809C22.221 26.0403 22.3 25.8495 22.3 25.6506C22.3 25.4517 22.221 25.2609 22.0804 25.1203C21.9397 24.9796 21.749 24.9006 21.55 24.9006C21.3511 24.9006 21.1604 24.9796 21.0197 25.1203C20.8791 25.2609 20.8 25.4517 20.8 25.6506C20.8 25.8495 20.8791 26.0403 21.0197 26.1809C21.1604 26.3216 21.3511 26.4006 21.55 26.4006Z"
                  fill="#16A34A"
                />
              </svg>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-end">
              {users.filter(v => v.status === "pending" && new Date(v.createdAt) >= new Date(Date.now() - 7*24*60*60*1000)).length}{" "}
            </CardTitle>
            <div className="text-muted-foreground">in the last 7 days</div>
          </CardFooter>
        </Card>
      </div>
      <VideoFilterBar users={users} setData={setData} />
      <VideoTable data={data} />
      <ModerationPanel data={users} />
      <CardHeader>
        <CardTitle className="text-xl font-semibold -mb-2">
          Video Engagement & Analytics
        </CardTitle>
      </CardHeader>
      <FeatureUsage className="lg:!mr-5 w-full" data={users} />
    </div>
  );
};

export default Videos;
