import { SiteHeader } from "@/components/site-header";
import { UpdateDriverForm } from "../_components/update-driver-form";


export default async function UpdateDriverPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  return (
    <div>
      <SiteHeader title="Update Driver" />
      <UpdateDriverForm driverId={id} driverData={[]} />
    </div>
  );
}
