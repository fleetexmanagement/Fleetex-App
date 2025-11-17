import { SiteHeader } from "@/components/site-header";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { MetricCard } from "./_components/MetricCard";
import { getDriverData } from "./_data/driver-data";
import { getDriverMetrics } from "./_data/driverMetrics";

export default async function DriverManagementPage() {
  const metrics = await getDriverMetrics();

  return (
    <div className="@container/main flex flex-1 flex-col gap-5 md:gap-7 px-2 sm:px-0">
      <SiteHeader title="Driver Management" />

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-3 xl:grid-cols-6 px-2 sm:px-4 md:px-6 lg:px-8">
        <MetricCard title="Total Drivers" value={metrics.totalDrivers} rateLabel="+2.5%" trend="up" />
        <MetricCard title="New Joinings" value={metrics.newJoinings} rateLabel="+1.2%" trend="up" />
        <MetricCard title="Drivers on Leave" value={metrics.onLeave} rateLabel="+0.4%" trend="up" />
        <MetricCard title="Drivers on Termination" value={metrics.onTermination} rateLabel="0%" />
        <MetricCard title="Drivers on Suspension" value={metrics.onSuspension} rateLabel="-0.8%" trend="down" />
        <MetricCard title="Drivers on Warning" value={metrics.onWarning} rateLabel="-1.0%" trend="down" />
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8 pt-10">
        <DataTable
          data={getDriverData}
          columns={columns}
          searchKeys={[ "driver_name", "cnic_no", "vehicle_no", "current_license", "cell_no"]}
          searchPlaceholder="Search by Name, CNIC, Vehicle No, License, Phone"
          pageSize={10}
        />
      </div>
    </div>
  );
}
