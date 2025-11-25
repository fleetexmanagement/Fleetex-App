export interface Driver {
  driver_image_path?: string;
  driver_name?: string;
  father_name?: string;
  cnic_no?: string;
  current_license?: string;
  cell_no?: string;
  status?: string;
  vehicle_no?: string;
  driver_id?: string | number;
  induction_date?: string;
  driver_image?: string;
  current_cnic?: string;
  [key: string]: unknown;
}

