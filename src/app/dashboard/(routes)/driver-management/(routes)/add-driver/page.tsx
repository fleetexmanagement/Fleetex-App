
import { SiteHeader } from "@/components/site-header";

import { AddDriverForm } from "./_components/add-driver-form";

export default function AddDriverPage() {
  return (
    <div className="space-y-6">
      <SiteHeader title="Add Driver" />
      <AddDriverForm />
    </div>
  );
}
