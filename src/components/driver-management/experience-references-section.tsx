"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGenerator, type FormSectionConfig } from "@/components/global/form-generator";
import type { DriverFormValues } from "../../types/form-types";
import {
  jobStatusOptions,
  typeOfVehicleOptions,
  languageOptions,
} from "../../constants/form-constants";

/**
 * Step 04: Experience & References Section
 * Contains: Operational history, preferred languages, and verification contacts
 */
type ExperienceReferencesSectionProps = {
  form: UseFormReturn<DriverFormValues>;
};

export const ExperienceReferencesSection = ({
  form,
}: ExperienceReferencesSectionProps) => {
  const section: FormSectionConfig<DriverFormValues> = {
    id: "experience-references",
    title: "Experience & References",
    description: "Operational history, preferred languages, and verification contacts.",
    fields: [
      {
        inputType: "select",
        name: "jobStatus",
        label: "Job Status",
        options: jobStatusOptions,
        placeholder: "Select status",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "previousJob",
        label: "Previous Employer",
        placeholder: "Company / Fleet name",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "typeOfVehicle",
        label: "Primary Vehicle Type",
        placeholder: "Select vehicle type",
        options: typeOfVehicleOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "experienceYears",
        label: "Experience (Years)",
        type: "number",
        placeholder: "5",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "experienceMonths",
        label: "Experience (Months)",
        type: "number",
        placeholder: "6",
        className: "py-2",
      },
      {
        inputType: "textarea",
        name: "responsibilities",
        label: "Key Responsibilities",
        placeholder: "Summarize key responsibilities or achievements",
        className: "col-span-full py-2",
        rows: 2,
        textareaProps: {
          className: "px-4 py-2 min-w-full",
        },
      },
      {
        inputType: "select",
        name: "languagePreference",
        label: "Primary Language",
        placeholder: "Select language",
        options: languageOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "referenceName",
        label: "Reference Name",
        placeholder: "Fleet manager / Supervisor",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "referenceRelation",
        label: "Reference Relation",
        placeholder: "e.g. Fleet Supervisor",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "referencePhone",
        label: "Reference Phone",
        placeholder: "03xx-xxxxxxx",
        className: "py-2",
      },
      {
        inputType: "textarea",
        name: "referenceAddress",
        label: "Reference Address",
        rows: 2,
        placeholder: "Office address",
        className: "col-span-full py-2",
        textareaProps: {
          className: "px-4 py-2 min-w-full",
        },
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

