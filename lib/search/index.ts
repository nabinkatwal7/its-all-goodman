import Fuse from "fuse.js";
import { getAllEntities } from "@/lib/content/loader";
import type { Entity } from "@/lib/schemas/entity";
import { entityHref } from "@/lib/schemas/entity";

export type SearchResult = {
  id: string;
  title: string;
  type: Entity["type"];
  summary?: string;
  href: string;
  series?: string[];
};

function toSearchItem(entity: Entity): SearchResult {
  return {
    id: entity.id,
    title: entity.title,
    type: entity.type,
    summary: entity.summary,
    href: entityHref(entity),
    series: entity.series,
  };
}

let fuseInstance: Fuse<SearchResult> | null = null;

export function getSearchIndex(): Fuse<SearchResult> {
  if (fuseInstance) return fuseInstance;

  const items = getAllEntities().map(toSearchItem);
  fuseInstance = new Fuse(items, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "type", weight: 0.2 },
      { name: "summary", weight: 0.2 },
      { name: "series", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
  });

  return fuseInstance;
}

export function searchEntities(query: string, limit = 12): SearchResult[] {
  if (!query.trim()) return [];
  return getSearchIndex()
    .search(query, { limit })
    .map((r) => r.item);
}

export function getAllSearchItems(): SearchResult[] {
  return getAllEntities().map(toSearchItem);
}
