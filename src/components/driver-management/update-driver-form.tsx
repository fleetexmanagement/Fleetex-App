"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { DriverInformationSection } from "./driver-information-section";
import { IdentificationLicensingSection } from "./identification-licensing-section";
import { HealthComplianceSection } from "./health-compliance-section";
import { ExperienceReferencesSection } from "./experience-references-section";
import type { DriverFormValues } from "@/types/form-types";
import { defaultDriverFormValues } from "@/types/form-types";

type DriverSnapshot = {
  status?: string;
  driverImageUrl?: string;
  complianceScore?: number;
};

interface UpdateDriverFormProps {
  driverId: string;
  driverData?: Partial<DriverFormValues> & DriverSnapshot;
}

const fallbackSnapshot: Required<DriverSnapshot> = {
  status: "Active",
  driverImageUrl: "/images/driver-placeholder.png",
  complianceScore: 92,
};

export const UpdateDriverForm = ({ driverId, driverData }: UpdateDriverFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = useMemo<DriverFormValues>(
    () => ({
      ...defaultDriverFormValues,
      ...(driverData ?? {}),
      driverImage: null,
      cnicFrontImage: null,
      cnicBackImage: null,
      licenseFrontImage: null,
      licenseBackImage: null,
      ddcDocument: null,
      boosterCertificate: null,
      medicalDocument: null,
      policeVerificationImage: null,
    }),
    [driverData],
  );

  const form = useForm<DriverFormValues>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const driverName = form.watch("driverName");
  const vehicleNo = form.watch("vehicleNo");
  const medicalStatus = form.watch("medicalStatus");
  const ddcResult = form.watch("ddcResult");
  const vaccineStatus = form.watch("vaccineStatus");
  const randomDrugAlcoholStatus = form.watch("randomDrugAlcoholStatus");
  const randomDrugAlcoholDate = form.watch("randomDrugAlcoholDate");
  const randomDrugAlcoholCount = form.watch("randomDrugAlcoholCount");
  const medicalIssueDate = form.watch("medicalIssueDate");
  const medicalExpiryDate = form.watch("medicalExpiryDate");
  const boosterDoseDate = form.watch("boosterDoseDate");
  const boosterStatus = form.watch("boosterStatus");

  const snapshot = {
    status: driverData?.status ?? fallbackSnapshot.status,
    driverImageUrl: driverData?.driverImageUrl ?? fallbackSnapshot.driverImageUrl,
    complianceScore: driverData?.complianceScore ?? fallbackSnapshot.complianceScore,
  };

  const handleSave: SubmitHandler<DriverFormValues> = async (values) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with update driver mutation
      console.table(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => form.reset(initialValues);

  const saveForm = () => form.handleSubmit(handleSave)();

  return (
    <div className="space-y-6 px-4 pb-24 pt-2 lg:px-6">
      <div className="flex flex-col gap-3 rounded-2xl p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Avatar className="h-16 w-16 border-2 border-background shadow">
            <AvatarImage src={snapshot.driverImageUrl} alt={driverName ?? "Driver avatar"} />
            <AvatarFallback className="text-base uppercase">
              {driverName?.[0] ?? "D"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Driver ID #{driverId}</p>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {driverName?.trim() ? driverName : "Unnamed driver"}
            </h1>
            <p className="text-xs text-muted-foreground">
              Assigned Vehicle • {vehicleNo?.trim() ? vehicleNo : "Not assigned"}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              <Badge variant="default">{snapshot.status}</Badge>
              <Badge variant="outline">HTV Certified</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => router.push("/dashboard/driver-management")}
          >
            Back to directory
          </Button>
          <Button variant="secondary" asChild className="w-full md:w-auto">
            <Link href={`/dashboard/driver-management/${driverId}?mode=view`}>Cancel</Link>
          </Button>
          <Button className="w-full md:w-auto" disabled={isSubmitting} onClick={saveForm}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Snapshot</CardTitle>
            <CardDescription>Key compliance signals for this driver.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Compliance Score</p>
              <p className="text-3xl font-bold text-foreground">{snapshot.complianceScore}%</p>
              <p className="text-xs text-muted-foreground">Auto-calculated every week</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Medical</span>
                <Badge variant="outline">{medicalStatus?.trim() ? medicalStatus : "Pending"}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">DDC</span>
                <Badge variant="outline">{ddcResult?.trim() ? ddcResult : "Pending"}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Vaccination</span>
                <Badge variant="outline">
                  {vaccineStatus?.trim() ? vaccineStatus : "Not recorded"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Operational Timeline</CardTitle>
            <CardDescription>Latest lifecycle checkpoints linked to this driver record.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="flex-1 space-y-1 rounded-md border border-border/70 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-foreground">Random drug & alcohol screen</p>
                    <span className="text-xs text-muted-foreground">
                      {randomDrugAlcoholDate?.trim() ? randomDrugAlcoholDate : "—"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Result: {randomDrugAlcoholStatus?.trim() ? randomDrugAlcoholStatus : "Pending"} • Tests YTD:{" "}
                    {randomDrugAlcoholCount?.trim() ? randomDrugAlcoholCount : "—"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="flex-1 space-y-1 rounded-md border border-border/70 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-foreground">Medical certificate renewed</p>
                    <span className="text-xs text-muted-foreground">
                      {medicalIssueDate?.trim() ? medicalIssueDate : "—"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valid through {medicalExpiryDate?.trim() ? medicalExpiryDate : "—"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="flex-1 space-y-1 rounded-md border border-border/70 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-foreground">Booster dose recorded</p>
                    <span className="text-xs text-muted-foreground">
                      {boosterDoseDate?.trim() ? boosterDoseDate : "—"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Status: {boosterStatus?.trim() ? boosterStatus : "Pending"}
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <DriverInformationSection form={form} />
        <IdentificationLicensingSection form={form} />
        <HealthComplianceSection form={form} />
        <ExperienceReferencesSection form={form} />
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-10 -mx-4 border-t border-border/70 bg-background/90 px-4 py-4 backdrop-blur lg:-mx-6 lg:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Button variant="ghost" className="w-full md:w-auto" onClick={handleReset}>
            Reset to last saved
          </Button>
          <div className="flex flex-col gap-2 md:flex-row">
            <Button variant="outline" asChild className="w-full md:w-auto">
              <Link href={`/dashboard/driver-management/${driverId}?mode=view`}>Discard & view</Link>
            </Button>
            <Button className="w-full md:w-auto" disabled={isSubmitting} onClick={saveForm}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};