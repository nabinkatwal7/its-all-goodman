import { getEntitiesByType } from "@/lib/content/loader";
import { DatabaseList } from "@/components/DatabaseList";

export const metadata = { title: "Vehicles" };

export default function VehiclesPage() {
  return <DatabaseList title="Vehicle Database" entities={getEntitiesByType("vehicle")} />;
}
