"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DataTable, type SimpleColumn } from "../driver-management/data-table";
import type { Driver } from "@/types/driver";

type DriverSegmentSheetProps = {
  title: string;
  description?: string;
  drivers: Driver[];
  columns: SimpleColumn<Driver>[];
  children: React.ReactNode;
};

export function DriverSegmentSheet({
  title,
  description,
  drivers,
  columns,
  children,
}: DriverSegmentSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-4">
          <DataTable
            data={drivers}
            columns={columns}
            pageSize={5}
            searchPlaceholder="Search drivers"
            searchKeys={[
              "driver_name",
              "cnic_no",
              "current_license",
              "status",
              "vehicle_no",
            ]}
            showAddButton={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

