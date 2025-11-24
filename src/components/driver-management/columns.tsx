"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SimpleColumn } from "./data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    // TODO: add actual delete call here
    console.log(`Delete driver ${driverId}`);
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}?mode=view`}>View Driver</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${baseUrl}${driverId}?mode=update`}>Update Driver</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowConfirm(true)}>
            Delete Driver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete driver?</AlertDialogTitle>
            <AlertDialogDescription>
              This action permanently removes the driver record. You can’t undo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export const columns: SimpleColumn<Driver>[] = [
  {
    key: "driver_image_path",
    header: "Driver Image",
    className: "w-[100px]",
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