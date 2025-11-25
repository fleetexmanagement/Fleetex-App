"use client";

import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SimpleColumn<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: SimpleColumn<T>[];
  searchKeys?: (keyof T | string)[];
  searchPlaceholder?: string;
  pageSize?: number;
  className?: string;
  toolbarContent?: React.ReactNode;
  showAddButton?: boolean;
  addButtonHref?: string;
  statusKey?: keyof T | string;
  statusPlaceholder?: string;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKeys = [],
  searchPlaceholder = "Search...",
  pageSize = 10,
  className,
  toolbarContent,
  showAddButton = true,
  addButtonHref = "/dashboard/driver-management/add-driver",
  statusKey,
  statusPlaceholder = "Filter by status",
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = React.useState("all");

  const statusOptions = React.useMemo(() => {
    if (!statusKey) return [];
    const unique = new Set<string>();
    data.forEach((row) => {
      const raw = (row as Record<string, unknown>)[statusKey as string];
      if (raw === undefined || raw === null) return;
      const value = String(raw).trim();
      if (value) unique.add(value);
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [data, statusKey]);

  React.useEffect(() => {
    if (!statusKey) {
      setStatusFilter("all");
      return;
    }
    if (statusFilter !== "all" && !statusOptions.includes(statusFilter)) {
      setStatusFilter("all");
    }
  }, [statusKey, statusOptions, statusFilter]);

  const filteredByStatus = React.useMemo(() => {
    if (!statusKey || statusFilter === "all") return data;
    return data.filter(
      (row) => String((row as Record<string, unknown>)[statusKey as string] ?? "") === statusFilter
    );
  }, [data, statusFilter, statusKey]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return filteredByStatus;
    const q = query.toLowerCase();
    return filteredByStatus.filter((row) =>
      searchKeys.some((k) =>
        String(row[k as string] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [filteredByStatus, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const hasStatusFilter = Boolean(statusKey && statusOptions.length);
  const showToolbarRow = Boolean(toolbarContent || showAddButton || hasStatusFilter);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
        <Input
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-[360px]"
        />
        {showToolbarRow && (
          <div className="flex items-center gap-2">
            {toolbarContent}
            {hasStatusFilter && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={statusPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" >All Statuses</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {showAddButton && (
              <Link href={addButtonHref}>
                <Button className="hover:bg-primary/80">Add Driver</Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              {columns.map((c) => (
                <TableHead key={String(c.key)} className={c.className}>
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.map((row) => {
              const keyFromId = (row as unknown as { id?: unknown }).id;
              const derivedKey =
                keyFromId !== undefined
                  ? String(keyFromId)
                  : columns
                      .map((c) =>
                        String(
                          (row as Record<string, unknown>)[c.key as string] ??
                            ""
                        )
                      )
                      .join("|");
              return (
                <TableRow key={derivedKey}>
                  {columns.map((c) => (
                    <TableCell key={String(c.key)} className={c.className}>
                      {c.render
                        ? c.render(row)
                        : String(row[c.key as string] ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="text-xs text-muted-foreground mr-auto">
          Page {page} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
