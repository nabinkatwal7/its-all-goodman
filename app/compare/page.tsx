import { getEntitiesByType } from "@/lib/content/loader";
import { ComparePageClient } from "@/components/compare/ComparePageClient";

export const metadata = { title: "Compare Characters" };

export default function ComparePage() {
  const characters = getEntitiesByType("character")
    .filter((c) => c.stats)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      stats: c.stats,
    }));

  return <ComparePageClient characters={characters} />;
}
