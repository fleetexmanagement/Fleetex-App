import { z } from "zod";

export const driverMetricsSchema = z.object({
  totalDrivers: z.number().nonnegative(),
  newJoinings: z.number().nonnegative(),
  totalIncidents: z.number().nonnegative(),
  onWarning: z.number().nonnegative(),
  onLeave: z.number().nonnegative(),
  onTermination: z.number().nonnegative(),
  onSuspension: z.number().nonnegative(),
});

export type DriverMetricsSchema = z.infer<typeof driverMetricsSchema>;
