"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Trend = "up" | "down";

type MetricCardProps = {
  title: string;
  value: number | string;
  rateLabel?: string; // e.g. +2.5%
  trend?: Trend;
  className?: string;
};

export function MetricCard({
  title,
  value,
  rateLabel,
  trend,
  className,
}: MetricCardProps) {
  const isUp = trend === "up";
  const badgeClasses = cn(
    "h-5 px-1.5 text-[10px] md:text-xs",
    isUp
      ? "text-emerald-500 border-emerald-500/30"
      : "text-rose-500 border-rose-500/30",
  );

  return (
    <Card className={cn("@container/card", className)}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        {rateLabel ? (
          <CardAction>
            <Badge variant="outline" className={badgeClasses}>
              {isUp ? (
                <IconTrendingUp className="mr-1 size-4" />
              ) : (
                <IconTrendingDown className="mr-1 size-4" />
              )}
              {rateLabel}
            </Badge>
          </CardAction>
        ) : null}
      </CardHeader>
    </Card>
  );
}
