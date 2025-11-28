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
import type { Driver } from "@/types/driver";
import { Badge } from "@/components/ui/badge";

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

const statusStyles: Record<
  string,
  {
    className: string;
    label: string;
  }
> = {
  "new joining": {
    className: "border-emerald-200 bg-emerald-100 text-emerald-700",
    label: "New Joining",
  },
  active: {
    className: "border-sky-200 bg-sky-100 text-sky-700",
    label: "Active",
  },
  suspended: {
    className: "border-rose-200 bg-rose-100 text-rose-700",
    label: "Suspended",
  },
  "on leave": {
    className: "border-amber-200 bg-amber-100 text-amber-700",
    label: "On Leave",
  },
  warning: {
    className: "border-orange-200 bg-orange-100 text-orange-700",
    label: "Warning",
  },
  inactive: {
    className: "border-slate-200 bg-slate-100 text-slate-700",
    label: "Inactive",
  },
};

const defaultStatusStyle = {
  className: "border-muted bg-muted/40 text-foreground",
  label: "Unknown",
};

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
  { key: "driver_name", header: "Driver Name", className: "min-w-[160px]" },
  { key: "father_name", header: "Father Name", className: "min-w-[160px]" },
  { key: "cnic_no", header: "CNIC", className: "min-w-[160px]" },
  { key: "current_license", header: "License", className: "min-w-[140px]" },
  { key: "cell_no", header: "Phone", className: "min-w-[140px]" },
  {
    key: "status",
    header: "Status",
    className: "min-w-[120px]",
    render: (row) => {
      const rawStatus = row.status?.toString() ?? "";
      const normalized = rawStatus.trim().toLowerCase();
      const { className, label } = statusStyles[normalized] ?? {
        ...defaultStatusStyle,
        label: rawStatus || defaultStatusStyle.label,
      };

      return (
        <Badge variant="outline" className={`capitalize ${className}`}>
          {label}
        </Badge>
      );
    },
  },
  { key: "vehicle_no", header: "Vehicle No", className: "min-w-[120px]" },
  {
    key: "actions",
    header: "",
    className: "w-[80px] text-right",
    render: (row) => <RowActions row={row} />,
  },
];