import { SiteHeader } from "@/components/site-header";

export default async function UpdateDriverPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  return (
    <div>
      <SiteHeader title="Update Driver" />
      <h1>Driver ID: {id}</h1>
    </div>
  );
}
