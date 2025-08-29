"use client";

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function NavDocuments({ items, title, set }) {
  const { isMobile } = useSidebar();
  const location = useLocation();
  useEffect(() => {
    items.map((item) => {
      location.pathname == item.url ? set(item.name) : "";
    });
  }, [location.pathname]);
  useEffect(() => {
    items.map((item) => {
      location.pathname == item.url ? set(item.name) : "";
    });
  }, []);
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden !text-[#9CA3AF]">
      <SidebarGroupLabel className="!text-[#9CA3AF] px-4">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link
                to={item.url}
                className={`px-5 !py-4 ${
                  location.pathname == item.url
                    ? "bg-[#1F2937] hover:!bg-[#1F2937] hover:!text-[#9CA3AF]"
                    : ""
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
