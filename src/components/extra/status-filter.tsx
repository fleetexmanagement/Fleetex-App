"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusFilterProps = {
  statuses: string[];
  value: string;
  onChange: (value: string) => void;
};

export function StatusFilter({ statuses, value, onChange }: StatusFilterProps) {
  const options = React.useMemo(
    () => Array.from(new Set(statuses.filter(Boolean))),
    [statuses]
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="All statuses" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        {options.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

