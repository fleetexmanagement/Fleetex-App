/**
 * Shared TypeScript types for driver form components
 */

export type DriverFormValues = {
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

export const defaultDriverFormValues: DriverFormValues = {
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

