'use client';

import React, { useState, useMemo } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { SearchForm } from "./search-form";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { Scale, Calculator, Briefcase, LifeBuoy, Send, Settings2, GalleryVerticalEnd, Command, AudioWaveform, AtSign, PenTool, CalendarClock, AlignHorizontalDistributeCenter, EarthLock, Frame, PieChart, MessageSquare } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Promotional Ground",
      url: "/in/dashboard/modules/promotional-ground",
      icon: AtSign,
      isActive: true,
      items: [],
    },
    {
      title: "Business Operations",
      url: "/in/dashboard/modules/business-operations",
      icon: Briefcase,
      items: [
        {
          title: "Google Reviews",
          url: "/in/dashboard/modules/business-operations/google-reviews",
        },
        {
          title: "SEO Blogs",
          url: "/in/dashboard/modules/business-operations/seo-blogs",
        },
        {
          title: "Social Media Posts",
          url: "/in/dashboard/modules/business-operations/social-media-posts",
        },
        {
          title: "Protocol",
          url: "/in/dashboard/modules/business-operations/protocol",
        },
      ],
    },
    {
      title: "The Chat",
      url: "/in/dashboard/modules/the-chat",
      icon: MessageSquare, // Updated icon for chat
      items: [],
    },
    {
      title: "Indian Judiciary System",
      url: "/in/dashboard/modules/consultations",
      icon: Scale,
      items: [],
    },
    {
      title: "Accountants",
      url: "/in/dashboard/modules/accountants",
      icon: Calculator,
      items: [],
    },
    {
      title: "Task Scheduler",
      url: "/in/dashboard/modules/task-scheduler",
      icon: CalendarClock,
      items: [],
    },
    {
      title: "Content Creator",
      url: "/in/dashboard/modules/writer",
      icon: PenTool,
      items: [],
    },
    {
      title: "The Planner",
      url: "/in/dashboard/modules/the-planner",
      icon: EarthLock,
      items: [],
    },
    {
      title: "Portfolio Manager",
      url: "/in/dashboard/modules/portfolio-manager",
      icon: AlignHorizontalDistributeCenter,
      items: [],
    },
  ],
  navSecondary: [
    { title: "Support", url: "/in/dashboard/support", icon: LifeBuoy },
    { title: "Feedback", url: "/in/dashboard/feedback", icon: Send },
    { title: "Settings", url: "/in/dashboard/settings", icon: Settings2 },
  ],
  teams: [
    {
      name: "The Great Company",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Middle Ground",
      logo: AudioWaveform,
      plan: "Enterprise",
    },
    {
      name: "AIDS",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Briefcase, // Updated if needed, or replace with an appropriate icon if available
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = { name: "Sidemen", email: "sidemen@gmail.com", avatar: "/sidemen logo.jpeg" };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNavMain = useMemo(() => {
    if (!searchQuery.trim()) {
      return data.navMain;
    }

    const query = searchQuery.toLowerCase();
    return data.navMain
      .map((module) => {
        const mainModuleMatches = module.title.toLowerCase().includes(query);
        const filteredSubItems = (module.items || []).filter((subItem) =>
          subItem.title.toLowerCase().includes(query)
        );

        if (mainModuleMatches || filteredSubItems.length > 0) {
          return { ...module, items: filteredSubItems };
        }
        return null;
      })
      .filter(Boolean) as typeof data.navMain;
  }, [searchQuery]);

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <SearchForm onSearchChange={(val) => setSearchQuery(val)} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
