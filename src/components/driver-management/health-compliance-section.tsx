"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGenerator, type FormSectionConfig } from "@/components/global/form-generator";
import type { DriverFormValues } from "../../types/form-types";
import { FileUploadControl } from "./file-upload-control";
import {
  vaccineStatusOptions,
  verificationStatusOptions,
  medicalStatusOptions,
  drugTestStatusOptions,
} from "../../constants/form-constants";

/**
 * Step 03: Health & Compliance Section
 * Contains: Vaccination, medical fitness, and substance screening checkpoints
 */
type HealthComplianceSectionProps = {
  form: UseFormReturn<DriverFormValues>;
};

export const HealthComplianceSection = ({
  form,
}: HealthComplianceSectionProps) => {
  const section: FormSectionConfig<DriverFormValues> = {
    id: "health-compliance",
    title: "Health & Compliance",
    description: "Vaccination, medical fitness, and substance screening checkpoints.",
    fields: [
      {
        inputType: "select",
        name: "vaccineStatus",
        label: "COVID Vaccination Status",
        placeholder: "Select status",
        options: vaccineStatusOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "firstDoseDate",
        label: "First Dose Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "firstDoseExpiry",
        label: "First Dose Expiry",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "secondDoseDate",
        label: "Second Dose Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "secondDoseExpiry",
        label: "Second Dose Expiry",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "boosterDoseDate",
        label: "Booster Dose Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "boosterStatus",
        label: "Booster Status",
        options: verificationStatusOptions,
        placeholder: "Select status",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "boosterDate",
        label: "Booster Issue Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "boosterCertificate",
        label: "Upload Image",
        className: "col-span-full py-2",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Upload Image"
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
        className: "py-2",
      },
      {
        inputType: "input",
        name: "medicalIssueDate",
        label: "Medical Issue Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "medicalExpiryDate",
        label: "Medical Expiry Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "randomDrugAlcoholStatus",
        label: "Random Drug/Alcohol Status",
        placeholder: "Select status",
        options: drugTestStatusOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "randomDrugAlcoholDate",
        label: "Last Drug/Alcohol Test",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "randomDrugAlcoholCount",
        label: "Tests Per Year",
        type: "number",
        placeholder: "0",
        className: "py-2",
      },
    ],
    layoutClassName: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
  };

  return (
    <div className="space-y-6">
      <FormGenerator
        form={form}
        sections={[section]}
        onSubmit={() => {}} // No submit action - handled by parent
        submitLabel=""
        actions={<></>} // Hide submit button - handled by parent component
        className="space-y-6"
      />
    </div>
  );
};

