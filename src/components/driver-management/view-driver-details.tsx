// src/components/driver-management/view-driver-details.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DriverViewModel = {
  driverImageUrl?: string;
  driverName?: string;
  fatherName?: string;
  driverFileId?: string;
  pkCode?: string;
  vehicleNo?: string;
  status?: string;
  inductionDate?: string;
  cellNo?: string;
  address?: string;
  dateOfBirth?: string;
  age?: string;
  placeOfBirth?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  qualification?: string;
  drivingSince?: string;
  policeVerification?: string;
  tpplPolicy?: string;
  cnicVerificationStatus?: string;
  cnicNo?: string;
  cnicIssueDate?: string;
  cnicExpiryDate?: string;
  cnicFrontImage?: string;
  cnicBackImage?: string;
  licenseNumber?: string;
  licenseType?: string;
  licenseIssueDate?: string;
  licenseExpiryDate?: string;
  licenseStatus?: string;
  licenseFrontImage?: string;
  licenseBackImage?: string;
  onlineVerification?: string;
  ddcResult?: string;
  ddcIssueDate?: string;
  ddcExpiryDate?: string;
  ddcDocument?: string;
  vaccineStatus?: string;
  firstDoseDate?: string;
  firstDoseExpiry?: string;
  secondDoseDate?: string;
  secondDoseExpiry?: string;
  boosterStatus?: string;
  boosterDoseDate?: string;
  boosterDate?: string;
  medicalStatus?: string;
  medicalIssueDate?: string;
  medicalExpiryDate?: string;
  randomDrugAlcoholStatus?: string;
  randomDrugAlcoholDate?: string;
  randomDrugAlcoholCount?: string;
  jobStatus?: string;
  previousJob?: string;
  typeOfVehicle?: string;
  experienceYears?: string;
  experienceMonths?: string;
  responsibilities?: string;
  referenceName?: string;
  referenceRelation?: string;
  referencePhone?: string;
  referenceAddress?: string;
  languagePreference?: string;
};

type ViewDriverDetailsProps = {
  driverId: string;
  driverData?: Partial<DriverViewModel>;
  isLoading?: boolean;
};

const defaultDriverSnapshot: DriverViewModel = {
  driverImageUrl: "/images/driver-placeholder.png",
  driverName: "Muhammad Faisal",
  fatherName: "Shahid Akhtar",
  driverFileId: "DRV-0157",
  pkCode: "PK-90812",
  vehicleNo: "FXL-245",
  status: "Active",
  inductionDate: "2023-06-14",
  cellNo: "+92 300 1234567",
  address: "House 27, Street 11, DHA Phase 5, Lahore",
  dateOfBirth: "1987-03-22",
  age: "38",
  placeOfBirth: "Lahore, Punjab",
  maritalStatus: "Married",
  bloodGroup: "O+",
  qualification: "Intermediate",
  drivingSince: "2010-08-01",
  policeVerification: "Cleared",
  tpplPolicy: "Yes",
  cnicVerificationStatus: "Verified",
  cnicNo: "35202-1234567-1",
  cnicIssueDate: "2015-02-10",
  cnicExpiryDate: "2030-02-10",
  licenseNumber: "LHE-908123",
  licenseType: "HTV",
  licenseIssueDate: "2018-09-05",
  licenseExpiryDate: "2026-09-05",
  licenseStatus: "Valid",
  onlineVerification: "Cleared",
  ddcResult: "Pass",
  ddcIssueDate: "2022-01-15",
  ddcExpiryDate: "2025-01-15",
  vaccineStatus: "Fully Vaccinated",
  firstDoseDate: "2021-06-01",
  firstDoseExpiry: "2022-06-01",
  secondDoseDate: "2021-07-01",
  secondDoseExpiry: "2022-07-01",
  boosterStatus: "Completed",
  boosterDoseDate: "2022-02-10",
  boosterDate: "2022-02-10",
  medicalStatus: "Fit",
  medicalIssueDate: "2024-01-05",
  medicalExpiryDate: "2025-01-05",
  randomDrugAlcoholStatus: "Negative",
  randomDrugAlcoholDate: "2024-10-11",
  randomDrugAlcoholCount: "03",
  jobStatus: "On Assignment",
  previousJob: "Faisal Movers (2016-2019)",
  typeOfVehicle: "Oil Tanker",
  experienceYears: "12",
  experienceMonths: "4",
  responsibilities: "Cross-country fuel haul, vehicle upkeep, trip reporting",
  referenceName: "Ahmed Raza",
  referenceRelation: "Fleet Manager",
  referencePhone: "+92 321 4455667",
  referenceAddress: "Plot 11, Industrial Estate, Lahore",
  languagePreference: "Urdu, Punjabi, English",
};

const SectionField = ({ label, value }: { label: string; value?: string }) => (
  <div className="space-y-0.5 rounded-md border border-border/60 bg-muted/30 p-3 text-sm shadow-sm">
    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="font-semibold text-foreground">
      {value?.trim() ? value : "—"}
    </p>
  </div>
);

export const ViewDriverDetails = ({
  driverId,
  driverData,
  isLoading,
}: ViewDriverDetailsProps) => {
  const router = useRouter();
  const driver = { ...defaultDriverSnapshot, ...driverData };

  const detailSections = [
    {
      id: "driver-information",
      title: "Driver Information",
      description:
        "Identity, assignment, and personal background collected per compliance requirements.",
      fields: [
        { label: "Driver Name", value: driver.driverName },
        { label: "Father Name", value: driver.fatherName },
        { label: "Driver File / ID", value: driver.driverFileId },
        { label: "PK Code", value: driver.pkCode },
        { label: "Vehicle No", value: driver.vehicleNo },
        { label: "Induction Date", value: driver.inductionDate },
        { label: "Cell Number", value: driver.cellNo },
        { label: "Address", value: driver.address },
        { label: "Date of Birth", value: driver.dateOfBirth },
        { label: "Age", value: driver.age },
        { label: "Place of Birth", value: driver.placeOfBirth },
        { label: "Marital Status", value: driver.maritalStatus },
        { label: "Blood Group", value: driver.bloodGroup },
        { label: "Qualification", value: driver.qualification },
        { label: "Driving Since", value: driver.drivingSince },
        { label: "Police Verification", value: driver.policeVerification },
        { label: "TPPL Policy", value: driver.tpplPolicy },
      ],
    },
    {
      id: "identification-licensing",
      title: "Identification & Licensing",
      description: "CNIC, license, and DDC credentials with supporting documents.",
      fields: [
        { label: "CNIC Status", value: driver.cnicVerificationStatus },
        { label: "CNIC Number", value: driver.cnicNo },
        { label: "CNIC Issue Date", value: driver.cnicIssueDate },
        { label: "CNIC Expiry Date", value: driver.cnicExpiryDate },
        { label: "License Number", value: driver.licenseNumber },
        { label: "License Type", value: driver.licenseType },
        { label: "License Issue Date", value: driver.licenseIssueDate },
        { label: "License Expiry Date", value: driver.licenseExpiryDate },
        { label: "License Status", value: driver.licenseStatus },
        { label: "Online Verification", value: driver.onlineVerification },
        { label: "DDC Result", value: driver.ddcResult },
        { label: "DDC Issue Date", value: driver.ddcIssueDate },
        { label: "DDC Expiry Date", value: driver.ddcExpiryDate },
      ],
    },
    {
      id: "health-compliance",
      title: "Health & Compliance",
      description: "Vaccination, medical fitness, and substance screening checkpoints.",
      fields: [
        { label: "Vaccine Status", value: driver.vaccineStatus },
        { label: "First Dose", value: driver.firstDoseDate },
        { label: "First Dose Expiry", value: driver.firstDoseExpiry },
        { label: "Second Dose", value: driver.secondDoseDate },
        { label: "Second Dose Expiry", value: driver.secondDoseExpiry },
        { label: "Booster Status", value: driver.boosterStatus },
        { label: "Booster Dose Date", value: driver.boosterDoseDate },
        { label: "Medical Status", value: driver.medicalStatus },
        { label: "Medical Issue Date", value: driver.medicalIssueDate },
        { label: "Medical Expiry Date", value: driver.medicalExpiryDate },
        {
          label: "Random Drug & Alcohol Status",
          value: driver.randomDrugAlcoholStatus,
        },
        {
          label: "Random Drug & Alcohol Date",
          value: driver.randomDrugAlcoholDate,
        },
        {
          label: "Random Test Count",
          value: driver.randomDrugAlcoholCount,
        },
      ],
    },
    {
      id: "experience-references",
      title: "Experience & References",
      description:
        "Operational history, preferred languages, and verification contacts.",
      fields: [
        { label: "Current Job Status", value: driver.jobStatus },
        { label: "Previous Job", value: driver.previousJob },
        { label: "Vehicle Type", value: driver.typeOfVehicle },
        { label: "Experience (Years)", value: driver.experienceYears },
        { label: "Experience (Months)", value: driver.experienceMonths },
        { label: "Responsibilities", value: driver.responsibilities },
        { label: "Language Preference", value: driver.languagePreference },
        { label: "Reference Name", value: driver.referenceName },
        { label: "Reference Relation", value: driver.referenceRelation },
        { label: "Reference Phone", value: driver.referencePhone },
        { label: "Reference Address", value: driver.referenceAddress },
      ],
    },
  ];

  return (
    <div className="space-y-4 px-4 pb-8 pt-2 lg:px-6">
      <div className="flex flex-col gap-3 rounded-2xl p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Avatar className="h-16 w-16 border-2 border-background shadow">
            <AvatarImage src={driver.driverImageUrl} alt={driver.driverName} />
            <AvatarFallback className="text-base uppercase">
              {driver.driverName?.[0] ?? "D"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Driver ID #{driverId}
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {driver.driverName}
            </h1>
            <p className="text-xs text-muted-foreground">
              Assigned Vehicle • {driver.vehicleNo ?? "Not assigned"}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              <Badge variant="default">{driver.status ?? "Active"}</Badge>
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
          <Button asChild className="w-full md:w-auto">
            <Link href={`/dashboard/driver-management/${driverId}?mode=edit`}>
              Update driver
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Snapshot</CardTitle>
            <CardDescription>Key signals monitored across the fleet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Compliance Score
              </p>
              <p className="text-3xl font-bold text-foreground">92%</p>
              <p className="text-xs text-muted-foreground">Updated this week</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Medical</span>
                <Badge variant="outline">{driver.medicalStatus ?? "Pending"}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">DDC</span>
                <Badge variant="outline">{driver.ddcResult ?? "Pending"}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Vaccination</span>
                <Badge variant="outline">
                  {driver.vaccineStatus ?? "Not recorded"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Operational Timeline</CardTitle>
            <CardDescription>
              Quick view of recent lifecycle checkpoints for this driver.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="flex-1 space-y-1 rounded-md border border-border/70 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-foreground">
                      Random drug & alcohol screen
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {driver.randomDrugAlcoholDate ?? "—"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Result: {driver.randomDrugAlcoholStatus ?? "Pending"} • Tests YTD:{" "}
                    {driver.randomDrugAlcoholCount ?? "—"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="flex-1 space-y-1 rounded-md border border-border/70 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-foreground">
                      Medical certificate renewed
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {driver.medicalIssueDate ?? "—"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valid through {driver.medicalExpiryDate ?? "—"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="flex-1 space-y-1 rounded-md border border-border/70 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-foreground">
                      Booster dose recorded
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {driver.boosterDoseDate ?? "—"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Status: {driver.boosterStatus ?? "Pending"}
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        {detailSections.map((section) => (
          <Card
            key={section.id}
            className="shadow-sm"
          >
            <CardHeader>
              <CardTitle className="text-base font-semibold">{section.title}</CardTitle>
              <CardDescription className="text-sm">{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-5">
                {section.fields.map((field) => (
                  <SectionField key={field.label} label={field.label} value={field.value} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};