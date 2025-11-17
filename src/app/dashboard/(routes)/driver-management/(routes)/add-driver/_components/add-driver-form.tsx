"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, Path, useForm } from "react-hook-form";
import { FieldConfig, FormGenerator, type FormSectionConfig} from "@/components/form-generator";

type DriverFormValues = {
  driverImage: File | null;
  inductionDate: string;
  driverFileId: string;
  pkCode: string;
  vehicleNo: string;
  driverName: string;
  fatherName: string;
  dateOfBirth: string;
  age: string;
  placeOfBirth: string;
  address: string;
  maritalStatus: string;
  bloodGroup: string;
  qualification: string;
  cellNo: string;
  drivingSince: string;
  boosterDoseDate: string;
  boosterStatus: string;
  boosterCertificate: File | null;
  cnicVerificationStatus: string;
  cnicNo: string;
  cnicIssueDate: string;
  cnicExpiryDate: string;
  cnicFrontImage: File | null;
  cnicBackImage: File | null;
  licenseNumber: string;
  licenseType: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  licenseStatus: string;
  licenseFrontImage: File | null;
  licenseBackImage: File | null;
  ddcResult: string;
  ddcIssueDate: string;
  ddcExpiryDate: string;
  ddcDocument: File | null;
  onlineVerification: string;
  policeVerification: string;
  policeVerificationImage: File | null;
  tpplPolicy: string;
  vaccineStatus: string;
  firstDoseDate: string;
  firstDoseExpiry: string;
  secondDoseDate: string;
  secondDoseExpiry: string;
  boosterDate: string;
  medicalStatus: string;
  medicalIssueDate: string;
  medicalExpiryDate: string;
  medicalDocument: File | null;
  randomDrugAlcoholDate: string;
  randomDrugAlcoholStatus: string;
  randomDrugAlcoholCount: string;
  previousJob: string;
  jobStatus: string;
  typeOfVehicle: string;
  experienceYears: string;
  experienceMonths: string;
  responsibilities: string;
  referenceName: string;
  referenceRelation: string;
  referencePhone: string;
  referenceAddress: string;
  languagePreference: string;
};

const defaultDriverFormValues: DriverFormValues = {
  driverImage: null,
  inductionDate: "",
  driverFileId: "",
  pkCode: "",
  vehicleNo: "none",
  driverName: "",
  fatherName: "",
  dateOfBirth: "",
  age: "",
  placeOfBirth: "",
  address: "",
  maritalStatus: "",
  bloodGroup: "",
  qualification: "",
  cellNo: "",
  drivingSince: "",
  boosterDoseDate: "",
  boosterStatus: "",
  boosterCertificate: null,
  cnicVerificationStatus: "",
  cnicNo: "",
  cnicIssueDate: "",
  cnicExpiryDate: "",
  cnicFrontImage: null,
  cnicBackImage: null,
  licenseNumber: "",
  licenseType: "",
  licenseIssueDate: "",
  licenseExpiryDate: "",
  licenseStatus: "",
  licenseFrontImage: null,
  licenseBackImage: null,
  ddcResult: "",
  ddcIssueDate: "",
  ddcExpiryDate: "",
  ddcDocument: null,
  onlineVerification: "",
  policeVerification: "",
  policeVerificationImage: null,
  tpplPolicy: "",
  vaccineStatus: "",
  firstDoseDate: "",
  firstDoseExpiry: "",
  secondDoseDate: "",
  secondDoseExpiry: "",
  boosterDate: "",
  medicalStatus: "",
  medicalIssueDate: "",
  medicalExpiryDate: "",
  medicalDocument: null,
  randomDrugAlcoholDate: "",
  randomDrugAlcoholStatus: "",
  randomDrugAlcoholCount: "",
  previousJob: "",
  jobStatus: "",
  typeOfVehicle: "",
  experienceYears: "",
  experienceMonths: "",
  responsibilities: "",
  referenceName: "",
  referenceRelation: "",
  referencePhone: "",
  referenceAddress: "",
  languagePreference: "",
};

const formatEnumLabel = (value: string) => value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
const buildOptions = (values: string[]) => values.map((value) => ({ value, label: formatEnumLabel(value) }));

const yesNoOptions = [ { value: "true", label: "Yes" }, { value: "false", label: "No" } ];
const maritalStatusOptions = buildOptions([ "SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER" ]);
const bloodGroupOptions = [ "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ].map((value) => ({ value, label: value }));
const qualificationOptions = buildOptions([ "NONE", "MATRIC", "INTERMEDIATE", "BACHELOR", "OTHER" ]);
const verificationStatusOptions = buildOptions([ "VERIFIED", "EXPIRED", "PENDING", "REJECTED" ]);
const licenseTypeOptions = buildOptions(["LTV", "HTV", "PSV"]);
const vaccineStatusOptions = buildOptions([ "FIRST_DOSE", "SECOND_DOSE", "BOOSTER", "OTHER" ]); 
const ddcResultOptions = buildOptions(["PASS", "FAIL", "PENDING"]);
const medicalStatusOptions = buildOptions(["FIT", "UNFIT", "PENDING"]);

const drugTestStatusOptions = buildOptions([ "NEGATIVE", "POSITIVE", "INCONCLUSIVE", "PENDING" ]);

const jobStatusOptions = ["Probation", "Active", "Inactive", "On Leave"].map(
  (status) => ({ value: status.toUpperCase().replace(" ", "_"), label: status })
);

const vehicleOptions = [
  { value: "none", label: "Unassigned" },
  { value: "fleet-porter", label: "Fleet Porter" },
  { value: "fleet-rig", label: "Fleet Rig" },
  { value: "fleet-van", label: "Fleet Van" },
];

const languageOptions = buildOptions([ "URDU", "PANJABI", "SINDHI", "PASHTO", "OTHER" ]);

const typeOfVehicleOptions = [
  { value: "HTV", label: "Heavy Truck (HTV)" },
  { value: "LTV", label: "Light Truck (LTV)" },
  { value: "PSV", label: "Passenger Service Vehicle" },
  { value: "TRAILER", label: "Trailer" },
];

export const AddDriverForm = () => {
  const form = useForm<DriverFormValues>({ defaultValues: defaultDriverFormValues, mode: "onBlur" });

  const sections = useMemo<FormSectionConfig<DriverFormValues>[]>(() => {
    const driverInformation: FieldConfig<DriverFormValues>[] = [
      {
        inputType: "input",
        name: "driverImage",
        label: "Driver Image",
        className: "col-span-full lg:col-span-2",
        render: (field) => <FileUploadControl field={field} placeholder="Upload a square driver portrait" />,
      },
      {
        inputType: "input",
        name: "inductionDate",
        label: "Induction Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "driverFileId",
        label: "Driver File / ID",
        placeholder: "e.g. DRV-0157",
      },
      {
        inputType: "input",
        name: "pkCode",
        label: "PK Code",
        placeholder: "Internal code",
      },
      {
        inputType: "select",
        name: "vehicleNo",
        label: "Vehicle No",
        placeholder: "Assign vehicle",
        options: vehicleOptions,
      },
      {
        inputType: "input",
        name: "driverName",
        label: "Driver Name",
        placeholder: "Enter full name",
      },
      {
        inputType: "input",
        name: "fatherName",
        label: "Father Name",
        placeholder: "Enter father name",
      },
      {
        inputType: "input",
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
      },
      {
        inputType: "input",
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "35",
      },
      {
        inputType: "input",
        name: "placeOfBirth",
        label: "Place of Birth",
        placeholder: "City / Province",
      },
      {
        inputType: "textarea",
        name: "address",
        label: "Address",
        placeholder: "Street, City, Province",
        className: "col-span-full",
        rows: 2,
      },
      {
        inputType: "select",
        name: "maritalStatus",
        label: "Marital Status",
        placeholder: "Select status",
        options: maritalStatusOptions,
      },
      {
        inputType: "select",
        name: "bloodGroup",
        label: "Blood Group",
        placeholder: "Select group",
        options: bloodGroupOptions,
      },
      {
        inputType: "select",
        name: "qualification",
        label: "Qualification",
        placeholder: "Education level",
        options: qualificationOptions,
      },
      {
        inputType: "input",
        name: "cellNo",
        label: "Cell Number",
        placeholder: "03xx-xxxxxxx",
      },
      {
        inputType: "input",
        name: "drivingSince",
        label: "Driving Since",
        type: "date",
      } as FieldConfig<DriverFormValues>,
      {
        inputType: "select",
        name: "policeVerification",
        label: "Police Verification",
        options: yesNoOptions,
        placeholder: "Select status",
      },
      {
        inputType: "select",
        name: "tpplPolicy",
        label: "TPPL Policy",
        options: yesNoOptions,
        placeholder: "Select status",
      },
    ];

    const identificationAndLicensing: FieldConfig<DriverFormValues>[] = [
      {
        inputType: "select",
        name: "cnicVerificationStatus",
        label: "CNIC Verified",
        placeholder: "Verification status",
        options: verificationStatusOptions,
      },
      {
        inputType: "input",
        name: "cnicNo",
        label: "CNIC Number",
        placeholder: "13-digit CNIC",
      },
      {
        inputType: "input",
        name: "cnicIssueDate",
        label: "CNIC Issue Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "cnicExpiryDate",
        label: "CNIC Expiry Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "cnicFrontImage",
        label: "CNIC Front Image",
        className: "col-span-full md:col-span-2",
        render: (field) => <FileUploadControl field={field} placeholder="Upload high-res CNIC front image" />,
      },
      {
        inputType: "input",
        name: "cnicBackImage",
        label: "CNIC Back Image",
        className: "col-span-full md:col-span-2",
        render: (field) => <FileUploadControl field={field} placeholder="Upload high-res CNIC back image" />,
      },
      {
        inputType: "input",
        name: "licenseNumber",
        label: "License Number",
        placeholder: "Enter license number",
      },
      {
        inputType: "select",
        name: "licenseType",
        label: "License Type",
        placeholder: "Select license type",
        options: licenseTypeOptions,
      },
      {
        inputType: "input",
        name: "licenseIssueDate",
        label: "License Issue Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "licenseExpiryDate",
        label: "License Expiry Date",
        type: "date",
      },
      {
        inputType: "select",
        name: "licenseStatus",
        label: "License Status",
        placeholder: "Verification status",
        options: verificationStatusOptions,
      },
      {
        inputType: "input",
        name: "licenseFrontImage",
        label: "License Front Image",
        className: "col-span-full md:col-span-2",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Upload front scan"
          />
        ),
      },
      {
        inputType: "input",
        name: "licenseBackImage",
        label: "License Back Image",
        className: "col-span-full md:col-span-2",
        render: (field) => (
          <FileUploadControl field={field} placeholder="Upload back scan" />
        ),
      },
      {
        inputType: "select",
        name: "onlineVerification",
        label: "Online License Verification",
        options: yesNoOptions,
        placeholder: "Select status",
      },
      {
        inputType: "select",
        name: "ddcResult",
        label: "DDC (NH&MP) Result",
        placeholder: "Select result",
        options: ddcResultOptions,
      },
      {
        inputType: "input",
        name: "ddcIssueDate",
        label: "DDC Issue Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "ddcExpiryDate",
        label: "DDC Expiry Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "ddcDocument",
        label: "DDC Certificate",
        className: "col-span-full",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Attach DDC certificate"
            accept="application/pdf,image/*"
          />
        ),
      },
    ];

    const healthAndCompliance: FieldConfig<DriverFormValues>[] = [
      {
        inputType: "select",
        name: "vaccineStatus",
        label: "COVID Vaccination Status",
        placeholder: "Select status",
        options: vaccineStatusOptions,
      },
      {
        inputType: "input",
        name: "firstDoseDate",
        label: "First Dose Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "firstDoseExpiry",
        label: "First Dose Expiry",
        type: "date",
      },
      {
        inputType: "input",
        name: "secondDoseDate",
        label: "Second Dose Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "secondDoseExpiry",
        label: "Second Dose Expiry",
        type: "date",
      },
      {
        inputType: "input",
        name: "boosterDoseDate",
        label: "Booster Dose Date",
        type: "date",
      },
      {
        inputType: "select",
        name: "boosterStatus",
        label: "Booster Status",
        options: verificationStatusOptions,
        placeholder: "Select status",
      },
      {
        inputType: "input",
        name: "boosterDate",
        label: "Booster Issue Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "boosterCertificate",
        label: "Booster Certificate",
        className: "col-span-full md:col-span-2",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Upload booster proof"
            accept="application/pdf,image/*"
          />
        ),
      },
      {
        inputType: "select",
        name: "medicalStatus",
        label: "Medical Status",
        placeholder: "Select status",
        options: medicalStatusOptions,
      },
      {
        inputType: "input",
        name: "medicalIssueDate",
        label: "Medical Issue Date",
        type: "date",
      },
      {
        inputType: "input",
        name: "medicalExpiryDate",
        label: "Medical Expiry Date",
        type: "date",
      },
      {
        inputType: "select",
        name: "randomDrugAlcoholStatus",
        label: "Random Drug/Alcohol Status",
        placeholder: "Select status",
        options: drugTestStatusOptions,
      },
      {
        inputType: "input",
        name: "randomDrugAlcoholDate",
        label: "Last Drug/Alcohol Test",
        type: "date",
      },
      {
        inputType: "input",
        name: "randomDrugAlcoholCount",
        label: "Tests Per Year",
        type: "number",
        placeholder: "0",
      },
      {
        inputType: "input",
        name: "medicalDocument",
        label: "Medical Document",
        className: "col-span-full",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Attach medical certificate"
            accept="application/pdf,image/*"
          />
        ),
      },
      {
        inputType: "input",
        name: "policeVerificationImage",
        label: "Police Verification Image",
        className: "col-span-full",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Attach police verification proof"
            accept="application/pdf,image/*"
          />
        ),
      },
    ];

    const experienceAndReferences: FieldConfig<DriverFormValues>[] = [
      {
        inputType: "select",
        name: "jobStatus",
        label: "Job Status",
        options: jobStatusOptions,
        placeholder: "Select status",
      },
      {
        inputType: "input",
        name: "previousJob",
        label: "Previous Employer",
        placeholder: "Company / Fleet name",
      },
      {
        inputType: "select",
        name: "typeOfVehicle",
        label: "Primary Vehicle Type",
        placeholder: "Select vehicle type",
        options: typeOfVehicleOptions,
      },
      {
        inputType: "input",
        name: "experienceYears",
        label: "Experience (Years)",
        type: "number",
        placeholder: "5",
      },
      {
        inputType: "input",
        name: "experienceMonths",
        label: "Experience (Months)",
        type: "number",
        placeholder: "6",
      },
      {
        inputType: "textarea",
        name: "responsibilities",
        label: "Key Responsibilities",
        placeholder: "Summarize key responsibilities or achievements",
        className: "col-span-full",
        rows: 3,
      },
      {
        inputType: "select",
        name: "languagePreference",
        label: "Primary Language",
        placeholder: "Select language",
        options: languageOptions,
      },
      {
        inputType: "input",
        name: "referenceName",
        label: "Reference Name",
        placeholder: "Fleet manager / Supervisor",
      },
      {
        inputType: "input",
        name: "referenceRelation",
        label: "Reference Relation",
        placeholder: "e.g. Fleet Supervisor",
      },
      {
        inputType: "input",
        name: "referencePhone",
        label: "Reference Phone",
        placeholder: "03xx-xxxxxxx",
      },
      {
        inputType: "textarea",
        name: "referenceAddress",
        label: "Reference Address",
        rows: 2,
        placeholder: "Office address",
        className: "col-span-full",
      },
    ];

    const buildSection = ( id: string, title: string, description: string, fields: FieldConfig<DriverFormValues>[] ): FormSectionConfig<DriverFormValues> => ({
      id,
      title,
      description,
      fields,
      layoutClassName: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    });

    return [
      buildSection("driver-information", "Driver Information", "Identity, assignment, and personal background collected per compliance requirements.", driverInformation),
      buildSection("identification-licensing", "Identification & Licensing", "CNIC, license, and DDC credentials with supporting documents.", identificationAndLicensing),
      buildSection("health-compliance", "Health & Compliance", "Vaccination, medical fitness, and substance screening checkpoints.", healthAndCompliance),
      buildSection("experience-references", "Experience & References", "Operational history, preferred languages, and verification contacts.", experienceAndReferences),
    ];
  }, []);

  const onSubmit = (values: DriverFormValues) => {
    // TODO: Replace with API integration
    console.table(values);
  };

  return (
    <FormGenerator
      form={form}
      sections={sections}
      onSubmit={onSubmit}
      submitLabel="Create Driver"
      submitButtonProps={{ className: "w-full sm:w-auto" }}
      actions={
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit">Create Driver</Button>
        </div>
      }
      className="space-y-8"
    />
  );
};

type FileUploadControlProps<TFieldValues extends DriverFormValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  placeholder: string;
  accept?: string;
};

const FileUploadControl = <TFieldValues extends DriverFormValues>({ field, placeholder, accept = "image/*" }: FileUploadControlProps<TFieldValues>) => {
  const fileName = field.value instanceof File ? field.value.name : field.value ? String(field.value) : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
        {fileName ?? placeholder}
      </div>
      <Input 
        type="file"
        accept={accept}
        onChange={(event) => field.onChange(event.target.files?.[0] ?? null)}
        className="cursor-pointer"
      />
    </div>
  );
};