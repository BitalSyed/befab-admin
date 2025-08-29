import { API_URL, getCookie } from "@/components/cookieUtils";
import HealthMetrics from "@/components/news-letter-engagement";
import { NewsletterHeader } from "@/components/news-letter-header";
import NewsLetterPerformance from "@/components/news-letter-performance";
import QuickActions from "@/components/news-letter-quick-actions";
import SupportTicket from "@/components/news-letter-recent";
import NewsletterTable from "@/components/news-letter-table";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NewsLetters = () => {
  const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [analytics, setAnalytics] = useState([]);
    useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = getCookie("skillrextech_auth");

      const response = await fetch(`${API_URL}/admin/newsletters?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setUsers(data);
        setData(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const fetchUsers1 = async () => {
    try {
      const token = getCookie("skillrextech_auth");

      const response = await fetch(`${API_URL}/admin/newsletters/analytics?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setAnalytics(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  fetchUsers();
  fetchUsers1();
}, []);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
      <NewsletterHeader data={users} setData={setData} />
      <NewsletterTable data={data} />
      <div>
        <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center lg:justify-between">
          <NewsLetterPerformance data={users} className="w-full lg:w-[65%]" />
          <HealthMetrics data={analytics.stats} title="" className="w-full lg:w-[35%]" />
        </div>
      </div>
    </div>
  );
};

export default NewsLetters;
