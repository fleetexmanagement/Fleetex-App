"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SimpleColumn } from "./data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Driver {
  driver_image_path?: string;
  driver_name?: string;
  father_name?: string;
  cnic_no?: string;
  current_license?: string;
  cell_no?: string;
  status?: string;
  vehicle_no?: string;
  driver_id?: string | number;
  [key: string]: unknown;
}

function RowActions({ row }: { row: Driver }) {
  const baseUrl = `/dashboard/driver-management/`;
  const driverId = row.driver_id ? row.driver_id : "";

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#viewDriver`}>
              View Driver
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#updateCnic`}>
              Update CNIC
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#updateLicense`}>
              Update License
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#updateDdc`}>
              Update DDC
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#updateCovidVaccine`}>
              Update Covid Vaccine
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#updateMedicalRecord`}>
              Update Medical Record
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}#deleteDriver`}>
              Delete Driver
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const columns: SimpleColumn<Driver>[] = [
  {
    key: "driver_image_path", header: "Driver Image", className: "w-[100px]",
    render: (row) => (
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src={row.driver_image_path} alt={row.driver_name} />
          <AvatarFallback>{row.driver_name?.[0] ?? "D"}</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  { key: "driver_id", header: "Driver ID", className: "w-[220px]" },
  { key: "driver_name", header: "Driver Name", className: "min-w-[160px]" },
  { key: "father_name", header: "Father Name", className: "min-w-[160px]" },
  { key: "cnic_no", header: "CNIC", className: "min-w-[160px]" },
  { key: "current_license", header: "License", className: "min-w-[140px]" },
  { key: "cell_no", header: "Phone", className: "min-w-[140px]" },
  { key: "status", header: "Status", className: "min-w-[120px]" },
  { key: "vehicle_no", header: "Vehicle No", className: "min-w-[120px]" },
  {
    key: "actions",
    header: "",
    className: "w-[80px] text-right",
    render: (row) => <RowActions row={row} />,
  },
];
