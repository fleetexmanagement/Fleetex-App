"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGenerator, type FormSectionConfig } from "@/components/global/form-generator";
import type { DriverFormValues } from "../../types/form-types";
import { FileUploadControl } from "./file-upload-control";
import {
  maritalStatusOptions,
  bloodGroupOptions,
  qualificationOptions,
  yesNoOptions,
  vehicleOptions,
  type FieldConfig,
} from "../../constants/form-constants";

/**
 * Step 01: Driver Information Section
 * Contains: Identity, assignment, and personal background fields
 */
type DriverInformationSectionProps = {
  form: UseFormReturn<DriverFormValues>;
};

export const DriverInformationSection = ({
  form,
}: DriverInformationSectionProps) => {
  const section: FormSectionConfig<DriverFormValues> = {
    id: "driver-information",
    title: "Driver Information",
    description: "Identity, assignment, and personal background collected per compliance requirements.",
    fields: [
      {
        inputType: "input",
        name: "driverImage",
        label: "Driver Image",
        className: "col-span-full lg:col-span-2 py-2",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Upload a square driver portrait"
          />
        ),
      },
      {
        inputType: "input",
        name: "inductionDate",
        label: "Induction Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "driverFileId",
        label: "Driver File / ID",
        placeholder: "e.g. DRV-0157",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "pkCode",
        label: "PK Code",
        placeholder: "Internal code",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "vehicleNo",
        label: "Vehicle No",
        placeholder: "Assign vehicle",
        options: vehicleOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "driverName",
        label: "Driver Name",
        placeholder: "Enter full name",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "fatherName",
        label: "Father Name",
        placeholder: "Enter father name",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "35",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "placeOfBirth",
        label: "Place of Birth",
        placeholder: "City / Province",
        className: "py-2",
      },
      {
        inputType: "textarea",
        name: "address",
        label: "Address",
        placeholder: "Street, City, Province",
        className: "col-span-full py-2",
        rows: 3,
        textareaProps: {
          className: "px-4 py-2 min-w-full",
        },
      },
      {
        inputType: "select",
        name: "maritalStatus",
        label: "Marital Status",
        placeholder: "Select status",
        options: maritalStatusOptions,
        className: "py-2",
      },
      {
        inputType: "select",
        name: "bloodGroup",
        label: "Blood Group",
        placeholder: "Select group",
        options: bloodGroupOptions,
        className: "py-2",
      },
      {
        inputType: "select",
        name: "qualification",
        label: "Qualification",
        placeholder: "Education level",
        options: qualificationOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "cellNo",
        label: "Cell Number",
        placeholder: "03xx-xxxxxxx",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "drivingSince",
        label: "Driving Since",
        type: "date",
        className: "py-2",
      } as FieldConfig<DriverFormValues>,
      {
        inputType: "select",
        name: "policeVerification",
        label: "Police Verification",
        options: yesNoOptions,
        placeholder: "Select status",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "tpplPolicy",
        label: "TPPL Policy",
        options: yesNoOptions,
        placeholder: "Select status",
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

