"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGenerator, type FormSectionConfig } from "@/components/global/form-generator";
import type { DriverFormValues } from "../../types/form-types";
import { FileUploadControl } from "./file-upload-control";
import {
  verificationStatusOptions,
  licenseTypeOptions,
  yesNoOptions,
  ddcResultOptions,
} from "../../constants/form-constants";

/**
 * Step 02: Identification & Licensing Section
 * Contains: CNIC, license, and DDC credentials with supporting documents
 */
type IdentificationLicensingSectionProps = {
  form: UseFormReturn<DriverFormValues>;
};

export const IdentificationLicensingSection = ({
  form,
}: IdentificationLicensingSectionProps) => {
  const section: FormSectionConfig<DriverFormValues> = {
    id: "identification-licensing",
    title: "Identification & Licensing",
    description: "CNIC, license, and DDC credentials with supporting documents.",
    fields: [
      {
        inputType: "select",
        name: "cnicVerificationStatus",
        label: "CNIC Verified",
        placeholder: "Verification status",
        options: verificationStatusOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "cnicNo",
        label: "CNIC Number",
        placeholder: "13-digit CNIC",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "cnicIssueDate",
        label: "CNIC Issue Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "cnicExpiryDate",
        label: "CNIC Expiry Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "cnicFrontImage",
        label: "Upload Image",
        className: "col-span-full py-2",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Upload Image"
          />
        ),
      },
      {
        inputType: "input",
        name: "licenseNumber",
        label: "License Number",
        placeholder: "Enter license number",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "licenseType",
        label: "License Type",
        placeholder: "Select license type",
        options: licenseTypeOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "licenseIssueDate",
        label: "License Issue Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "licenseExpiryDate",
        label: "License Expiry Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "licenseStatus",
        label: "License Status",
        placeholder: "Verification status",
        options: verificationStatusOptions,
        className: "py-2",
      },
      {
        inputType: "select",
        name: "onlineVerification",
        label: "Online License Verification",
        options: yesNoOptions,
        placeholder: "Select status",
        className: "py-2",
      },
      {
        inputType: "select",
        name: "ddcResult",
        label: "DDC (NH&MP) Result",
        placeholder: "Select result",
        options: ddcResultOptions,
        className: "py-2",
      },
      {
        inputType: "input",
        name: "ddcIssueDate",
        label: "DDC Issue Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "ddcExpiryDate",
        label: "DDC Expiry Date",
        type: "date",
        className: "py-2",
      },
      {
        inputType: "input",
        name: "ddcDocument",
        label: "DDC Certificate",
        className: "col-span-full py-2",
        render: (field) => (
          <FileUploadControl
            field={field}
            placeholder="Attach DDC certificate"
            accept="application/pdf,image/*"
          />
        ),
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

