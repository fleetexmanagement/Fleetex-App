import { getDriverData } from "@/data/driver-data";
import { SiteHeader } from "@/components/global/site-header";
import { getDriverMetrics } from "@/data/driverMetrics";
import { columns } from "../../../../components/driver-management/columns";
import { DataTable } from "../../../../components/driver-management/data-table";
import { MetricCard } from "../../../../components/driver-management/MetricCard";


export default async function VehicleManagementPage() {
  const metrics = await getDriverMetrics();

  return (
    <div className="@container/main flex flex-1 flex-col gap-5 md:gap-7 px-2 sm:px-0">
      <SiteHeader title="Base Entry" />

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-3 xl:grid-cols-6 px-2 sm:px-4 md:px-6 lg:px-8">
        <MetricCard title="Total Drivers" value={metrics.totalDrivers} rateLabel="+2.5%" trend="up" />
        <MetricCard title="New Joinings" value={metrics.newJoinings} rateLabel="+1.2%" trend="up" />
        <MetricCard title="Drivers on Leave" value={metrics.onLeave} rateLabel="+0.4%" trend="up" />
        <MetricCard title="Drivers on Termination" value={metrics.onTermination} rateLabel="0%" />
        <MetricCard title="Drivers on Suspension" value={metrics.onSuspension} rateLabel="-0.8%" trend="down" />
        <MetricCard title="Drivers on Warning" value={metrics.onWarning} rateLabel="-1.0%" trend="down" />
      </div>
    </div>
  );
}
