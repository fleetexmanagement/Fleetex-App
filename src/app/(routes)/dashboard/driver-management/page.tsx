import { getDriverData } from "@/data/driver-data";
import { getDriverMetrics } from "@/data/driverMetrics";
import { SiteHeader } from "@/components/global/site-header";
import { columns } from "../../../../components/driver-management/columns";
import { DataTable } from "../../../../components/driver-management/data-table";
import { MetricCard } from "../../../../components/driver-management/MetricCard";
import { DriverSummaryTableDialog } from "@/components/driver-management/driver-summary-table-dialog";


type DriverLink = {
  title: string;
  iconName: "IconUsersGroup" | "IconUserPlus" | "IconAlertCircle" | "IconStopwatch";
  statusFilter?: string;
};

export default async function DriverManagementPage() {
  const metrics = await getDriverMetrics();

  const driversLink: DriverLink[] = [
    {
      title: "Old Drivers",
      iconName: "IconUsersGroup",
    },
    {
      title: "New Joining",
      iconName: "IconUserPlus",
      statusFilter: "New Joining",
    },
    {
      title: "On Leave",
      iconName: "IconUsersGroup",
      statusFilter: "On Leave",
    },
    {
      title: "On Termination",
      iconName: "IconUsersGroup",
      statusFilter: "Terminated",
    },
    {
      title: "On Suspension",
      iconName: "IconUsersGroup",
      statusFilter: "Suspended",
    },
    {
      title: "On Warning",
      iconName: "IconUsersGroup",
      statusFilter: "Warning",
    },
    {
      title: "Violation",
      iconName: "IconAlertCircle",
    },
    {
      title: "Stop Card",
      iconName: "IconStopwatch",
    },
    {
      title: "Incident Report",
      iconName: "IconAlertCircle",
    },
  ];

  return (
    <div className="@container/main flex flex-1 flex-col gap-5 md:gap-7 px-2 sm:px-0 space-y-4">
      <SiteHeader title="Driver Management" />

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-3 xl:grid-cols-6 px-2 sm:px-4 md:px-6 lg:px-8">
        <MetricCard title="Total Drivers" value={metrics.totalDrivers} rateLabel="+2.5%" trend="up" />
        <MetricCard title="New Joinings" value={metrics.newJoinings} rateLabel="+1.2%" trend="up" />
        <MetricCard title="Drivers on Leave" value={metrics.onLeave} rateLabel="+0.4%" trend="up" />
        <MetricCard title="Drivers on Termination" value={metrics.onTermination} rateLabel="0%" />
        <MetricCard title="Drivers on Suspension" value={metrics.onSuspension} rateLabel="-0.8%" trend="down" />
        <MetricCard title="Drivers on Warning" value={metrics.onWarning} rateLabel="-1.0%" trend="down" />
      </div>

      <div className="px-1 sm:px-4 md:px-6 lg:px-8 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6 sm:gap-4">
        {driversLink.map((link) => {
          const filteredData = link.statusFilter
            ? getDriverData.filter(
                (driver) => driver.status?.toLowerCase() === link.statusFilter?.toLowerCase()
              )
            : getDriverData;

          return (
            <DriverSummaryTableDialog
              key={link.title}
              title={link.title}
              iconName={link.iconName}
              data={filteredData}
            />
          );
        })}
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8 pt-10">
        <DataTable
          data={getDriverData}
          columns={columns}
          searchKeys={[ "driver_name", "cnic_no", "vehicle_no", "current_license", "cell_no"]}
          searchPlaceholder="Search by Name, CNIC, Vehicle No, License, Phone"
          pageSize={10}
          statusKey="status"
        />
      </div>
    </div>
  );
}
