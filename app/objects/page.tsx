import { getEntitiesByType } from "@/lib/content/loader";
import { DatabaseList } from "@/components/DatabaseList";

export const metadata = { title: "Objects" };

export default function ObjectsPage() {
  return <DatabaseList title="Object Database" entities={getEntitiesByType("object")} />;
}
