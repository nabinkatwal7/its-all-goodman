import { getEntitiesByType } from "@/lib/content/loader";
import { DatabaseList } from "@/components/DatabaseList";

export const metadata = { title: "Drugs" };

export default function DrugsPage() {
  return (
    <DatabaseList
      title="Drug Database"
      description="Chemical explanations and usage in the universe"
      entities={getEntitiesByType("drug")}
    />
  );
}
