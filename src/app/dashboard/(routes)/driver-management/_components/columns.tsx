"use client";

import { MoreHorizontal } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { SimpleColumn } from "./data-table";

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
  const [openSheet, setOpenSheet] = React.useState<null | "add" | "update">(
    null,
  );
  const [openDelete, setOpenDelete] = React.useState(false);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => setOpenSheet("add")}>
            Add Driver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSheet("update")}>
            Update Driver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Delete Driver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={!!openSheet} onOpenChange={(o) => !o && setOpenSheet(null)}>
        <SheetContent side="right" className="w-[420px] sm:w-[520px]">
          <SheetHeader>
            <SheetTitle>
              {openSheet === "add" ? "Add Driver" : "Update Driver"}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label>Driver Name</Label>
              <Input
                defaultValue={openSheet === "update" ? row.driver_name : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label>Father Name</Label>
              <Input
                defaultValue={openSheet === "update" ? row.father_name : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label>CNIC</Label>
              <Input defaultValue={openSheet === "update" ? row.cnic_no : ""} />
            </div>
            <div className="grid gap-2">
              <Label>License</Label>
              <Input
                defaultValue={openSheet === "update" ? row.current_license : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input defaultValue={openSheet === "update" ? row.cell_no : ""} />
            </div>
            <div className="grid gap-2">
              <Label>Vehicle No</Label>
              <Input
                defaultValue={openSheet === "update" ? row.vehicle_no : ""}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this driver?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
