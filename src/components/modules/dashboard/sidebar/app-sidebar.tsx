"use client";

import * as React from "react";
import {
  BadgeDollarSign,
  Bot,
  Frame,
  House,
  LifeBuoy,
  Map,
  NotebookTabs,
  PieChart,
  Send,
  Settings,
  ShoppingBag,
  SquareTerminal,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Track Purchases",
      url: "/user/dashboard/purchase-history",
      icon: ShoppingBag,
    },
    {
      title: "Manage Listings",
      url: "/user/dashboard/listing",
      icon: NotebookTabs,
    },
    {
      title: "Track Sales",
      url: "/user/dashboard/sales-history",
      icon: BadgeDollarSign,
    },
    {
      title: "Message",
      url: "/user/dashboard/message",
      icon: BadgeDollarSign,
    },
    {
      title: "Profile",
      url: "/user/dashboard/profile",
      icon: User,
    },
    {
      title: "Home",
      url: "/",
      icon: House,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
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
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <Image src='https://ecommerceni.co.uk/wp-content/uploads/sites/4/2022/11/ECNI-logo-3-removebg-preview.png' alt='logo' width={50} height={50} className='object-cover rounded-full' />
                <div className="flex flex-col leading-tight">
                  <h2 className="text-xl font-bold tracking-wide">SecondHand</h2>
                  <p className="text-sm font-medium text-gray-700">Mart</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}