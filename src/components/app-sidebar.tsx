"use client";

import {
  IconBuildingWarehouse,
  IconCar,
  IconDashboard,
  IconHelp,
  IconReportAnalytics,
  IconRouteAltLeft,
  IconSatellite,
  IconSettings,
  IconShieldCheck,
  IconTools,
  IconUserFilled,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import type * as React from "react";
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
import { NavRegistration } from "./nav-registration";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Admin Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
  ],
  registration: [
    {
      title: "Admin",
      url: "/dashboard/admin",
      icon: IconUserFilled,
      items: [
        {
          title: "Details",
          url: "/admin/details",
        },
        {
          title: "Add",
          url: "/admin/add",
        },
        {
          title: "Edit",
          url: "/admin/edit",
        },
        {
          title: "Delete",
          url: "/admin/delete",
        },
      ],
    },
    {
      title: "Driver Management",
      url: "/dashboard/driver-management",
      icon: IconUsersGroup, // 👤 multiple users for drivers
      items: [
        {
          title: "Driver List",
          url: "/dashboard/driver-management",
        },
        {
          title: "Add Driver",
          url: "/dashboard/driver-management/add",
        },
      ],
    },
    {
      title: "Vehicle Management",
      url: "/dashboard/vehicle-management",
      icon: IconCar, // 🚗 car icon for vehicles
      items: [
        {
          title: "Vehicle List",
          url: "/dashboard/vehicle-management/list",
        },
        {
          title: "Add Vehicle",
          url: "/dashboard/vehicle-management/add",
        },
      ],
    },
    {
      title: "Base Entry",
      url: "/dashboard/base-entry",
      icon: IconBuildingWarehouse, // 🏢 warehouse/building for base entry
      items: [
        {
          title: "Base List",
          url: "/dashboard/base-entry/list",
        },
        {
          title: "Add Base",
          url: "/dashboard/base-entry/add",
        },
      ],
    },
    {
      title: "Management System (HSE)",
      url: "/dashboard/hse-management-system",
      icon: IconShieldCheck, // 🛡️ shield for safety system
      items: [
        {
          title: "HSE Overview",
          url: "/dashboard/hse-management-system/overview",
        },
        {
          title: "Safety Reports",
          url: "/dashboard/hse-management-system/reports",
        },
      ],
    },
    {
      title: "Maintenance",
      url: "/dashboard/maintenance",
      icon: IconTools, // 🔧 tools icon for maintenance
      items: [
        {
          title: "Maintenance Schedule",
          url: "/dashboard/maintenance/schedule",
        },
        {
          title: "Add Maintenance Record",
          url: "/dashboard/maintenance/add",
        },
      ],
    },
    {
      title: "VTS",
      url: "/dashboard/vts",
      icon: IconSatellite, // 🛰️ satellite icon for tracking/VTS
      items: [
        {
          title: "Tracking Overview",
          url: "/dashboard/vts/overview",
        },
        {
          title: "Vehicle Logs",
          url: "/dashboard/vts/logs",
        },
      ],
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: IconReportAnalytics, // 📊 analytics icon for reports
      items: [
        {
          title: "Monthly Reports",
          url: "/dashboard/reports/monthly",
        },
        {
          title: "Custom Reports",
          url: "/dashboard/reports/custom",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#" className="flex items-center gap-2">
                <IconRouteAltLeft className="!size-5" />
                <span className="text-base font-semibold">Fleetex.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavRegistration items={data.registration} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
