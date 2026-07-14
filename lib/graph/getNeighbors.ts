import { getAllEntities, getEntityById } from "@/lib/content/loader";
import type { Entity } from "@/lib/schemas/entity";

export function getNeighbors(entityId: string, limit = 12): Entity[] {
  const entity = getEntityById(entityId);
  if (!entity) return [];

  const ids = new Set<string>(entity.relatedIds);

  if (entity.type === "character") {
    for (const rel of entity.relationships) ids.add(rel.targetId);
    for (const id of entity.organizationIds) ids.add(id);
    for (const id of entity.businessIds) ids.add(id);
    for (const id of entity.episodeIds) ids.add(id);
  }

  if (entity.type === "episode") {
    for (const id of entity.characterIds) ids.add(id);
    for (const id of entity.locationIds) ids.add(id);
  }

  if (entity.type === "location") {
    for (const id of entity.characterIds) ids.add(id);
    for (const id of entity.episodeIds) ids.add(id);
  }

  if (entity.type === "organization") {
    for (const id of entity.memberIds) ids.add(id);
  }

  if (entity.type === "business") {
    for (const id of entity.ownerIds) ids.add(id);
    for (const id of entity.employeeIds) ids.add(id);
  }

  ids.delete(entityId);

  return [...ids]
    .map((id) => getEntityById(id))
    .filter((e): e is Entity => !!e)
    .slice(0, limit);
}

export function getRelatedByType(entityId: string, type: Entity["type"]): Entity[] {
  return getNeighbors(entityId, 50).filter((e) => e.type === type);
}

export function getAllConnections(): { source: string; target: string; label?: string }[] {
  const connections: { source: string; target: string; label?: string }[] = [];
  const seen = new Set<string>();

  for (const entity of getAllEntities()) {
    for (const rid of entity.relatedIds) {
      const key = [entity.id, rid].sort().join("--");
      if (!seen.has(key)) {
        seen.add(key);
        connections.push({ source: entity.id, target: rid });
      }
    }
    if (entity.type === "character") {
      for (const rel of entity.relationships) {
        const key = `rel-${entity.id}-${rel.targetId}`;
        if (!seen.has(key)) {
          seen.add(key);
          connections.push({
            source: entity.id,
            target: rel.targetId,
            label: rel.label ?? rel.kind,
          });
        }
      }
    }
  }

  return connections;
}
