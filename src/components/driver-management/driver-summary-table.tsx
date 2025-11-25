import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

export function DriverSummaryTable({
  data,
  className,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  detailsLabel = "View Driver Details",
  getDetailsHref = (driver) => `/dashboard/driver-management/${driver.driver_id}?mode=view`,
}: DriverSummaryTableProps) {
  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <Table>
        <TableHeader className="bg-secondary/40">
          <TableRow>
            <TableHead className="min-w-[220px]">Driver</TableHead>
            <TableHead className="min-w-[160px]">CNIC</TableHead>
            <TableHead className="min-w-[140px]">License</TableHead>
            <TableHead className="min-w-[140px]">Vehicle No</TableHead>
            <TableHead className="text-right w-[160px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
          {data.map((driver) => {
            const href = getDetailsHref(driver);
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
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" className="hover:bg-primary/10">
                    <Link href={href}>{detailsLabel}</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

