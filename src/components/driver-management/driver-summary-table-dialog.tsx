"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DriverSummaryTable } from "./driver-summary-table";
import type { Driver } from "@/types/driver";
import { IconAlertCircle, IconStopwatch, IconUserPlus, IconUsersGroup } from "@tabler/icons-react";

type DriverSummaryTableDialogProps = {
  title: string;
  iconName: "IconUsersGroup" | "IconUserPlus" | "IconAlertCircle" | "IconStopwatch";
  data: Driver[];
};

const iconMap = {
  IconUsersGroup,
  IconUserPlus,
  IconAlertCircle,
  IconStopwatch,
};

export function DriverSummaryTableDialog({
  title,
  iconName,
  data,
}: DriverSummaryTableDialogProps) {
  const Icon = iconMap[iconName];
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer hover:bg-accent hover:text-accent-foreground py-3 sm:py-4"
        onClick={() => setOpen(true)}
      >
        <CardHeader className="flex items-center gap-2 sm:gap-3 py-0">
          <Button variant="outline" size="icon" className="h-7 w-7 sm:h-9 sm:w-9">
            <Icon className="size-4" />
          </Button>
          <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
        </CardHeader>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="!left-[50%] !top-[50%] !-translate-x-1/2 !-translate-y-1/2 max-w-[90vw] w-[90vw] h-[85vh] max-h-screen p-6 flex flex-col"
          showCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 overflow-auto flex-1 min-h-0">
            <DriverSummaryTable data={data} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
