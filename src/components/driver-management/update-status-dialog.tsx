"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { driverStatusOptions } from "@/constants/form-constants";
import type { Driver } from "@/types/driver";

type UpdateStatusFormValues = {
  status: string;
  reasonTitle: string;
  reasonDescription: string;
};

type UpdateStatusDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver;
  currentStatus?: string;
};

export function UpdateStatusDialog({
  open,
  onOpenChange,
  driver,
  currentStatus,
}: UpdateStatusDialogProps) {
  const form = useForm<UpdateStatusFormValues>({
    defaultValues: {
      status: currentStatus || "",
      reasonTitle: "",
      reasonDescription: "",
    },
    mode: "onBlur",
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        status: currentStatus || "",
        reasonTitle: "",
        reasonDescription: "",
      });
    }
  }, [open, currentStatus, form]);

  const onSubmit = (values: UpdateStatusFormValues) => {
    // Validate required fields
    if (!values.status || !values.reasonTitle || !values.reasonDescription) {
      return;
    }

    // TODO: Implement status update API call
    console.log("Updating driver status:", {
      driverId: driver.driver_id,
      driverName: driver.driver_name,
      newStatus: values.status,
      reasonTitle: values.reasonTitle,
      reasonDescription: values.reasonDescription,
    });
    onOpenChange(false);
    form.reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Driver Status</DialogTitle>
          <DialogDescription>
            Update the status for {driver.driver_name || "this driver"} and provide a reason for the change.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {driverStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the new status for this driver</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reasonTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reason title" required {...field} />
                  </FormControl>
                  <FormDescription>Brief title for the status change reason</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reasonDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed reason description"
                      className="min-h-[100px]"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Detailed explanation for the status change</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

