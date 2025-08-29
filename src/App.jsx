import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewsLetters from "./pages/NewsLetters";
import Competitions from "./pages/Competitions";
import Videos from "./pages/Videos";
import Users from "./pages/Users";
import Calender from "./pages/Calender";
import Groups from "./pages/Groups";
import Goals from "./pages/Goals";
import Surveys from "./pages/Surveys";
import Nutrition from "./pages/Nutrition";
import Fitness from "./pages/Fitness";
import Login from "./pages/Login";
import { API_URL, getCookie } from "./components/cookieUtils";
import { toast, ToastContainer } from "react-toastify";
import NewUser from "./pages/NewUser";
import NewNewsLetter from "./pages/NewNewsLetter";
import NewCompetition from "./pages/NewCompetition";
import NewEvent from "./pages/NewEvent";
import NewVideo from "./pages/NewVideo";
import NewGroup from "./pages/NewGroup";
import NewSurvey from "./pages/NewSurvey";

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState("Dashboard");
  const [data, setData] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!getCookie("skillrextech_auth")) {
        navigate("/login", { replace: true });
        toast.warning("You need to login first!");
      } else {
        try {
          const response = await fetch(`${API_URL}/admin/get`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getCookie("skillrextech_auth"),
            }),
          });

          const data = await response.json();

          if (data.error) {
            toast.error(data.error);
            return;
          } else {
            setData(data.u);
            setUserId(data.u._id);
            console.log(data);
          }
        } catch (error) {
          console.error("Error during login:", error);
          toast.error("An error occurred. Please try again.");
        }
      }
    };

    run();
  }, []);

  useEffect(() => {
    if (userId&&getCookie("skillrextech_auth")) {
      const interval = setInterval(() => {
        fetch(API_URL + "/ping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userId]);

  return (
    <>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={2000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AppSidebar variant="inset" set={setCount} />
        <SidebarInset>
          <SiteHeader title={count} data={data} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main bg-gray-100 flex flex-1 flex-col gap-2">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/new-user" element={<NewUser />} />
                <Route path="/news-letters" element={<NewsLetters />} />
                <Route path="/new-news" element={<NewNewsLetter />} />
                <Route path="/new-competition" element={<NewCompetition />} />
                <Route path="/new-event" element={<NewEvent />} />
                <Route path="/new-group" element={<NewGroup />} />
                <Route path="/new-survey" element={<NewSurvey />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/calender" element={<Calender />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/new-video" element={<NewVideo />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/fitness" element={<Fitness />} />
              </Routes>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
