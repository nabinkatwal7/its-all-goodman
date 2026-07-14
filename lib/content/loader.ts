import "server-only";
import fs from "fs";
import path from "path";
import { entitySchema, type Entity, type Character, type Episode } from "@/lib/schemas/entity";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const ENTITY_DIRS = [
  "characters",
  "episodes",
  "locations",
  "organizations",
  "businesses",
  "events",
  "deaths",
  "quotes",
  "vehicles",
  "weapons",
  "drugs",
  "objects",
  "symbols",
  "cases",
  "easter-eggs",
] as const;

function readJsonDir(dirName: string): Entity[] {
  const dir = path.join(CONTENT_ROOT, dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      return entitySchema.parse(raw);
    });
}

let cache: Entity[] | null = null;

export function getAllEntities(): Entity[] {
  if (cache) return cache;
  cache = ENTITY_DIRS.flatMap(readJsonDir);
  return cache;
}

export function getEntityById(id: string): Entity | undefined {
  return getAllEntities().find((e) => e.id === id);
}

export function getEntityBySlug(slug: string): Entity | undefined {
  return getAllEntities().find((e) => e.slug === slug);
}

export function getEntitiesByType<T extends Entity["type"]>(
  type: T,
): Extract<Entity, { type: T }>[] {
  return getAllEntities().filter((e) => e.type === type) as Extract<
    Entity,
    { type: T }
  >[];
}

export function getCharacter(slug: string) {
  return getEntitiesByType("character").find((c) => c.slug === slug);
}

export function getEpisode(series: string, slug: string) {
  return getEntitiesByType("episode").find(
    (e) => e.slug === slug && e.series.includes(series as Entity["series"][number]),
  );
}

export function getLocation(slug: string) {
  return getEntitiesByType("location").find((l) => l.slug === slug);
}

export function getOrganization(slug: string) {
  return getEntitiesByType("organization").find((o) => o.slug === slug);
}

export function getBusiness(slug: string) {
  return getEntitiesByType("business").find((b) => b.slug === slug);
}

export function getRecentEntities(limit = 6): Entity[] {
  return [...getAllEntities()]
    .sort((a, b) => (b.addedAt ?? "").localeCompare(a.addedAt ?? ""))
    .slice(0, limit);
}

export function getPopularCharacters(limit = 6): Character[] {
  const chars = getEntitiesByType("character");
  return [...chars]
    .sort((a, b) => b.relatedIds.length - a.relatedIds.length)
    .slice(0, limit);
}

export function getFeaturedEpisode(): Episode | undefined {
  return getEntitiesByType("episode").find((e) => e.slug === "ozymandias");
}

export function getRandomEntity(): Entity {
  const all = getAllEntities();
  return all[Math.floor(Math.random() * all.length)];
}
