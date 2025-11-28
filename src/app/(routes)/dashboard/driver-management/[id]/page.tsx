import { SiteHeader } from "@/components/global/site-header";
import { UpdateDriverForm } from "@/components/driver-management/update-driver-form";
import { ViewDriverDetails } from "@/components/driver-management/view-driver-details";

export default async function DriverDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ mode?: 'view' | 'edit' }> }) {
  const { id } = await params;
  const { mode = 'view' } = await searchParams;
  
  // Fetch driver data here (you'll need to implement this)
  // const driverData = await getDriverById(id);
  
  return (
    <div>
      <SiteHeader title={mode === 'view' ? 'View Driver' : 'Update Driver'} />
      {mode === 'view' ? (
        <ViewDriverDetails driverId={id} />
      ) : (
        <UpdateDriverForm driverId={id} />
      )}
    </div>
  );
}