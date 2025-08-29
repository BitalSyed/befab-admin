import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// From react-icons/bs
import { BsBarChartLine } from 'react-icons/bs';

// From react-icons/ri
import { RiTrophyLine, RiSurveyLine, RiGroupLine, RiAppleFill, RiHeartPulseFill } from 'react-icons/ri';

// From react-icons/fi
import {
  FiUsers,
  FiMail,
  FiCalendar,
  FiVideo,
  FiMessageSquare,
  FiTarget,
  FiActivity
} from 'react-icons/fi';

import { FaDumbbell } from 'react-icons/fa';



const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: FaDumbbell,
  },
  main: [
    {
      name: "Dashboard",
      url: "/",
      icon: BsBarChartLine,
    },
    {
      name: "Users",
      url: "/users",
      icon: FiUsers,
    },
    {
      name: "News Letters",
      url: "/news-letters",
      icon: FiMail,
    },
    {
      name: "Competitions",
      url: "/competitions",
      icon: RiTrophyLine,
    },
    {
      name: "Calendar",
      url: "/calender",
      icon: FiCalendar,
    },
    {
      name: "Videos",
      url: "/videos",
      icon: FiVideo,
    },
  ],
  community: [
    {
      name: "Messaging Management",
      url: "/messaging-management",
      icon: FiMessageSquare,
    },
    {
      name: "Groups",
      url: "/groups",
      icon: RiGroupLine,
    },
  ],
  progress: [
    {
      name: "Goals",
      url: "/goals",
      icon: FiTarget,
    },
    {
      name: "Surveys",
      url: "/surveys",
      icon: RiSurveyLine,
    },
    {
      name: "Nutrition",
      url: "/nutrition",
      icon: RiAppleFill,
    },
    {
      name: "Fitness",
      url: "/fitness",
      icon: RiHeartPulseFill,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
              <a href="#" className="flex justify-start items-center ml-2">
                <FaDumbbell className="!size-8 text-blue-500" />
                <span className="text-2xl text-white font-extrabold px-5 py-4">BeFAB</span>
              </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="border-muted-foreground mb-4" />
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavDocuments set={props.set} items={data.main} title={"MAIN"} />
        <NavDocuments set={props.set} items={data.community} title={"COMMUNITY"} />
        <NavDocuments set={props.set} items={data.progress} title={"PROGRESS"} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
    </Sidebar>)
  );
}
