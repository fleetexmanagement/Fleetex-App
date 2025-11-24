/**
 * Shared form constants and options for driver form sections
 * Used across all driver form section components
 */

import type { FieldConfig } from "@/components/global/form-generator";
import type { DriverFormValues } from "../types/form-types";

export type { FieldConfig };

export const formatEnumLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const buildOptions = (values: string[]) =>
  values.map((value) => ({ value, label: formatEnumLabel(value) }));

export const yesNoOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

export const maritalStatusOptions = buildOptions([
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
  "OTHER",
]);

export const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
  (value) => ({ value, label: value })
);

export const qualificationOptions = buildOptions([
  "NONE",
  "MATRIC",
  "INTERMEDIATE",
  "BACHELOR",
  "OTHER",
]);

export const verificationStatusOptions = buildOptions([
  "VERIFIED",
  "EXPIRED",
  "PENDING",
  "REJECTED",
]);

export const licenseTypeOptions = buildOptions(["LTV", "HTV", "PSV"]);

export const vaccineStatusOptions = buildOptions([
  "FIRST_DOSE",
  "SECOND_DOSE",
  "BOOSTER",
  "OTHER",
]);

export const ddcResultOptions = buildOptions(["PASS", "FAIL", "PENDING"]);

export const medicalStatusOptions = buildOptions(["FIT", "UNFIT", "PENDING"]);

export const drugTestStatusOptions = buildOptions([
  "NEGATIVE",
  "POSITIVE",
  "INCONCLUSIVE",
  "PENDING",
]);

export const jobStatusOptions = ["Probation", "Active", "Inactive", "On Leave"].map(
  (status) => ({ value: status.toUpperCase().replace(" ", "_"), label: status })
);

export const vehicleOptions = [
  { value: "none", label: "Unassigned" },
  { value: "fleet-porter", label: "Fleet Porter" },
  { value: "fleet-rig", label: "Fleet Rig" },
  { value: "fleet-van", label: "Fleet Van" },
];

export const languageOptions = buildOptions([
  "URDU",
  "PANJABI",
  "SINDHI",
  "PASHTO",
  "OTHER",
]);

export const typeOfVehicleOptions = [
  { value: "HTV", label: "Heavy Truck (HTV)" },
  { value: "LTV", label: "Light Truck (LTV)" },
  { value: "PSV", label: "Passenger Service Vehicle" },
  { value: "TRAILER", label: "Trailer" },
];

