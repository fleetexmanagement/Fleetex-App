import type { DriverMetrics } from "@/types/driverMetrics";
import { driverMetricsSchema } from "@/schema/driverMetrics";

// Placeholder data provider. Replace with real API integration.
export async function getDriverMetrics(): Promise<DriverMetrics> {
  // In a real setup, fetch from your backend:
  // const res = await fetch(API_URL, { cache: 'no-store' });
  // const json = await res.json();
  // return driverMetricsSchema.parse(json);

  const mock: DriverMetrics = {
    totalDrivers: 150,
    newJoinings: 3,
    totalIncidents: 12,
    onWarning: 5,
    onLeave: 2,
    onTermination: 1,
    onSuspension: 4,
  };

  return driverMetricsSchema.parse(mock);
}
