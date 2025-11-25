import { getDriverData } from "@/data/driver-data";
import { SiteHeader } from "@/components/global/site-header";
import { getDriverMetrics } from "@/data/driverMetrics";
import { MetricCard } from "@/components/driver-management/MetricCard";


export default async function VehicleManagementPage() {
  const metrics = await getDriverMetrics();

  return (
    <div className="@container/main flex flex-1 flex-col gap-5 md:gap-7 px-2 sm:px-0">
      <SiteHeader title="Settings" />
    </div>
  );
}
