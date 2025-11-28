"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Driver } from "@/types/driver";

type DriverSummaryTableProps = {
  data: Driver[];
  className?: string;
  emptyMessage?: string;
  detailsLabel?: string;
  getDetailsHref?: (driver: Driver) => string;
};

const DEFAULT_EMPTY_MESSAGE = "No drivers match the selected criteria.";

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
  terminated: {
    className: "border-slate-200 bg-slate-100 text-slate-700",
    label: "Terminated",
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

export function DriverSummaryTable({
  data,
  className,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  detailsLabel = "View Driver",
  getDetailsHref = (driver) => `/dashboard/driver-management/${driver.driver_id}?mode=view`,
}: DriverSummaryTableProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);

  const handleViewReason = (driver: Driver) => {
    setSelectedDriver(driver);
    setReasonDialogOpen(true);
  };

  const reasonTitle =
    (selectedDriver?.reasonTitle as string) ||
    (selectedDriver?.reason_title as string) ||
    "No reason recorded";
  const reasonDescription =
    (selectedDriver?.reasonDescription as string) ||
    (selectedDriver?.reason_description as string) ||
    "This driver does not have a recorded reason yet.";

  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <Table>
        <TableHeader className="bg-secondary/40">
          <TableRow>
            <TableHead className="min-w-[220px]">Driver</TableHead>
            <TableHead className="min-w-[160px]">CNIC</TableHead>
            <TableHead className="min-w-[140px]">License</TableHead>
            <TableHead className="min-w-[140px]">Vehicle No</TableHead>
            <TableHead className="min-w-[120px]">Status</TableHead>
            <TableHead className="text-right w-[240px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
          {data.map((driver) => {
            const href = getDetailsHref(driver);
            const rawStatus = driver.status?.toString() ?? "";
            const normalized = rawStatus.trim().toLowerCase();
            const { className, label } = statusStyles[normalized] ?? {
              ...defaultStatusStyle,
              label: rawStatus || defaultStatusStyle.label,
            };

            return (
              <TableRow key={driver.driver_id ?? driver.driver_name}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={driver.driver_image_path} alt={driver.driver_name} />
                      <AvatarFallback>{driver.driver_name?.[0] ?? "D"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{driver.driver_name ?? "Unnamed Driver"}</div>
                      <div className="text-xs text-muted-foreground">{driver.vehicle_no ?? "No vehicle"}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{driver.cnic_no ?? "—"}</TableCell>
                <TableCell>{driver.current_license ?? "—"}</TableCell>
                <TableCell>{driver.vehicle_no ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize ${className}`}>
                    {label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm" className="hover:bg-primary/10">
                      <Link href={href}>{detailsLabel}</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/10"
                      onClick={() => handleViewReason(driver)}
                    >
                      View Reason
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={reasonDialogOpen} onOpenChange={setReasonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reason Details</DialogTitle>
            <DialogDescription>
              {selectedDriver
                ? `Status notes for ${selectedDriver.driver_name ?? "this driver"}.`
                : "Status notes"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1 rounded-md border border-border/60 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Reason Title</p>
              <p className="font-semibold text-foreground">{reasonTitle}</p>
            </div>
            <div className="space-y-1 rounded-md border border-border/60 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Reason Description</p>
              <p className="text-sm text-muted-foreground">{reasonDescription}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReasonDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

