"use client";

import "@uploadcare/react-uploader/core.css";
import { ControllerRenderProps, Path } from "react-hook-form";
import type { DriverFormValues } from "../../types/form-types";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";


type FileUploadControlProps<TFieldValues extends DriverFormValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  placeholder: string;
  accept?: string;
};

export const FileUploadControl = <TFieldValues extends DriverFormValues>({ field, placeholder, accept = "image/*" }: FileUploadControlProps<TFieldValues>) => {

  return (
    <div className="w-full">
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        filesViewMode="grid"
        classNameUploader="uc-light uc-turquoise"
        pubkey="ed558515601679015683"
        onCommonUploadSuccess={(e: any) => {
          const uploadedUrls = (e.detail?.successEntries || e.successEntries || []).map((entry: any) => entry.cdnUrl);
          // Store the first uploaded URL in the field
          if (uploadedUrls.length > 0) {
            field.onChange(uploadedUrls[0] as string);
          }
          console.log("Uploaded files URL list", uploadedUrls);
        }}
      />
    </div>
  );
};

