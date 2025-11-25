"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DriverSegmentCardProps = {
  label: string;
  className?: string;
};

export const DriverSegmentCard = React.forwardRef<HTMLDivElement, DriverSegmentCardProps>(
  ({ label, className }, ref) => {
    return (
      <Card
        ref={ref}
        tabIndex={0}
        className={cn(
          "cursor-pointer select-none rounded-lg border bg-card px-3 py-2 text-sm font-medium ring-offset-background transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          className
        )}
      >
        {label}
      </Card>
    );
  }
);

DriverSegmentCard.displayName = "DriverSegmentCard";

