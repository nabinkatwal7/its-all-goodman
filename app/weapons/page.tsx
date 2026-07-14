import { getEntitiesByType } from "@/lib/content/loader";
import { DatabaseList } from "@/components/DatabaseList";

export const metadata = { title: "Weapons" };

export default function WeaponsPage() {
  return <DatabaseList title="Weapon Database" entities={getEntitiesByType("weapon")} />;
}
