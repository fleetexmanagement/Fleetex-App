import { SiteHeader } from "@/components/global/site-header";
import { DriverTabs } from "@/components/driver-management/driver-tabs";


export default function AddDriverPage() {
  return (
    <div className="space-y-6">
      <SiteHeader title="Add Driver" />
      <DriverTabs />
    </div>
  );
}
