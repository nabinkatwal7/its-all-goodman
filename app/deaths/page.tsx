import { getEntitiesByType } from "@/lib/content/loader";
import { DeathsDatabase } from "@/components/databases/DeathsDatabase";

export const metadata = { title: "Deaths" };

export default function DeathsPage() {
  const deaths = getEntitiesByType("death");
  return <DeathsDatabase deaths={deaths} />;
}
