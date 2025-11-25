import { getDriverData } from "@/data/driver-data";
import { SiteHeader } from "@/components/global/site-header";
import { getDriverMetrics } from "@/data/driverMetrics";
import { columns } from "../../../components/driver-management/columns";
import { DataTable } from "../../../components/driver-management/data-table";
import { MetricCard } from "../../../components/driver-management/MetricCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { IconAlertCircle, IconStopwatch, IconUserPlus, IconUsersGroup } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTitle, SheetContent, SheetDescription, SheetHeader } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet";
import { DriverSummaryTable } from "@/components/driver-management/driver-summary-table";


type DriverLink = {
  title: string;
  href: string;
  icon: typeof IconUsersGroup;
  statusFilter?: string;
};

export default async function DriverManagementPage() {
  const metrics = await getDriverMetrics();

  const driversLink: DriverLink[] = [
    {
      title: "Old Drivers",
      href: "/dashboard/driver-management/old-driver",
      icon: IconUsersGroup,
    },
    {
      title: "New Joining",
      href: "/dashboard/driver-management/new-joining",
      icon: IconUserPlus,
      statusFilter: "New Joining",
    },
    {
      title: "On Leave",
      href: "/dashboard/driver-management/drivers-on-leave",
      icon: IconUsersGroup,
      statusFilter: "On Leave",
    },
    {
      title: "On Termination",
      href: "/dashboard/driver-management/drivers-on-termination",
      icon: IconUsersGroup,
      statusFilter: "Terminated",
    },
    {
      title: "On Suspension",
      href: "/dashboard/driver-management/drivers-on-suspension",
      icon: IconUsersGroup,
      statusFilter: "Suspended",
    },
    {
      title: "On Warning",
      href: "/dashboard/driver-management/drivers-on-warning",  
      icon: IconUsersGroup,
      statusFilter: "Warning",
    },
    {
      title: "Violation",
      href: "/dashboard/driver-management/violation",
      icon: IconAlertCircle,
    },
    {
      title: "Stop Card",
      href: "/dashboard/driver-management/stop-card",
      icon: IconStopwatch,
    },
    {
      title: "Incident Report",
      href: "/dashboard/driver-management/incident-report",
      icon: IconAlertCircle,
    },
  ];

  return (
    <div className="@container/main flex flex-1 flex-col gap-5 md:gap-7 px-2 sm:px-0 space-y-4">
      <SiteHeader title="Driver Management" />

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-3 xl:grid-cols-6 px-2 sm:px-4 md:px-6 lg:px-8">
        <MetricCard title="Total Drivers" value={metrics.totalDrivers} rateLabel="+2.5%" trend="up" />
        <MetricCard title="New Joinings" value={metrics.newJoinings} rateLabel="+1.2%" trend="up" />
        <MetricCard title="Drivers on Leave" value={metrics.onLeave} rateLabel="+0.4%" trend="up" />
        <MetricCard title="Drivers on Termination" value={metrics.onTermination} rateLabel="0%" />
        <MetricCard title="Drivers on Suspension" value={metrics.onSuspension} rateLabel="-0.8%" trend="down" />
        <MetricCard title="Drivers on Warning" value={metrics.onWarning} rateLabel="-1.0%" trend="down" />
      </div>

      <div className="px-1 sm:px-4 md:px-6 lg:px-8 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6 sm:gap-4">
        {driversLink.map((link) => {
          const filteredData = link.statusFilter
            ? getDriverData.filter(
                (driver) => driver.status?.toLowerCase() === link.statusFilter?.toLowerCase()
              )
            : getDriverData;

          return (
            <Card
              key={link.title}
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground py-3 sm:py-4"
            >
              {/* When someone click on the card, it use sheet component and when someone click on it the sheet open in the bottom of the screen*/}
              <Sheet>
                <SheetTrigger asChild>
                  <CardHeader className="flex items-center gap-2 sm:gap-3 py-0">
                    <Button variant="outline" size="icon" className="h-7 w-7 sm:h-9 sm:w-9">
                      <link.icon className="size-4" />
                    </Button>
                    <CardTitle className="text-sm sm:text-base"> {link.title} </CardTitle>
                  </CardHeader>
                </SheetTrigger>
                <SheetContent side="right" className="px-4">
                  <SheetHeader>
                    <SheetTitle> {link.title} </SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <DriverSummaryTable data={filteredData} />
                  </div>
                </SheetContent>
              </Sheet>
            </Card>
          );
        })}
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8 pt-10">
        <DataTable
          data={getDriverData}
          columns={columns}
          searchKeys={[ "driver_name", "cnic_no", "vehicle_no", "current_license", "cell_no"]}
          searchPlaceholder="Search by Name, CNIC, Vehicle No, License, Phone"
          pageSize={10}
          statusKey="status"
        />
      </div>
    </div>
  );
}
