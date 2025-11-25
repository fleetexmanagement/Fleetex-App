"use client";

import * as React from "react";
import { SiteHeader } from "@/components/global/site-header";
import { MetricCard } from "@/components/driver-management/MetricCard";
import { DataTable, type SimpleColumn } from "../driver-management/data-table";
import { DriverSegmentCard } from "./driver-segment-card";
import { DriverSegmentSheet } from "./driver-segment-sheet";
import { columns } from "../driver-management/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Driver } from "@/types/driver";
import type { DriverMetrics } from "@/types/driverMetrics";

type DriverManagementContentProps = {
  metrics: DriverMetrics;
  drivers: Driver[];
};

type SegmentDefinition = {
  id: string;
  title: string;
  description?: string;
  filter: (driver: Driver) => boolean;
};

const driverSegmentColumns: SimpleColumn<Driver>[] = [
  {
    key: "driver_image_path",
    header: "Driver",
    className: "min-w-[220px]",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.driver_image_path} alt={row.driver_name} />
          <AvatarFallback>{row.driver_name?.[0] ?? "D"}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium leading-tight">{row.driver_name}</div>
          <div className="text-xs text-muted-foreground">{row.cnic_no}</div>
        </div>
      </div>
    ),
  },
  {
    key: "cnic_no",
    header: "CNIC",
    className: "min-w-[160px]",
  },
  {
    key: "current_license",
    header: "License",
    className: "min-w-[150px]",
  },
  {
    key: "status",
    header: "Status",
    className: "min-w-[120px]",
  },
  {
    key: "vehicle_no",
    header: "Vehicle No",
    className: "min-w-[140px]",
  },
];

const quickViewDefinitions: SegmentDefinition[] = [
  {
    id: "old",
    title: "Old Drivers",
    description: "Drivers inducted before 2022",
    filter: (driver) => {
      if (!driver.induction_date) return false;
      const joined = new Date(driver.induction_date);
      if (Number.isNaN(joined.getTime())) return false;
      const cutoff = new Date("2022-01-01");
      return joined < cutoff;
    },
  },
  {
    id: "suspended",
    title: "Suspended Drivers",
    description: "Currently suspended drivers",
    filter: (driver) => driver.status === "Suspended",
  },
  {
    id: "on-leave",
    title: "Drivers on Leave",
    description: "Approved leaves in progress",
    filter: (driver) => driver.status === "On Leave",
  },
  {
    id: "warnings",
    title: "Warning Drivers",
    description: "Drivers with active warnings",
    filter: (driver) => driver.status === "Warning",
  },
];

export function DriverManagementContent({ metrics, drivers }: DriverManagementContentProps) {
  const quickViews = React.useMemo(
    () =>
      quickViewDefinitions.map((definition) => ({
        ...definition,
        data: drivers.filter(definition.filter),
      })),
    [drivers]
  );

  return (
    <div className="@container/main flex flex-1 flex-col gap-5 px-2 sm:px-0 md:gap-7">
      <SiteHeader title="Driver Management" />

      <div className="grid grid-cols-2 gap-4 px-2 sm:grid-cols-3 xl:grid-cols-6 sm:px-4 md:px-6 lg:px-8">
        <MetricCard title="Total Drivers" value={metrics.totalDrivers} rateLabel="+2.5%" trend="up" />
        <MetricCard title="New Joinings" value={metrics.newJoinings} rateLabel="+1.2%" trend="up" />
        <MetricCard title="Drivers on Leave" value={metrics.onLeave} rateLabel="+0.4%" trend="up" />
        <MetricCard title="Drivers on Termination" value={metrics.onTermination} rateLabel="0%" />
        <MetricCard title="Drivers on Suspension" value={metrics.onSuspension} rateLabel="-0.8%" trend="down" />
        <MetricCard title="Drivers on Warning" value={metrics.onWarning} rateLabel="-1.0%" trend="down" />
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick Views</p>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-3 lg:grid-cols-4">
          {quickViews.map((segment) => (
            <DriverSegmentSheet
              key={segment.id}
              title={segment.title}
              description={segment.description}
              drivers={segment.data}
              columns={driverSegmentColumns}
            >
              <DriverSegmentCard label={segment.title} />
            </DriverSegmentSheet>
          ))}
        </div>
      </div>

      <div className="px-2 pt-6 sm:px-4 md:px-6 lg:px-8">
        <DataTable
          data={drivers}
          columns={columns}
          searchKeys={["driver_name", "cnic_no", "vehicle_no", "current_license", "cell_no", "status"]}
          searchPlaceholder="Search by Name, CNIC, Vehicle No, License, Phone"
          pageSize={10}
          statusKey="status"
        />
      </div>
    </div>
  );
}

