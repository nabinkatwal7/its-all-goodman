import type { Entity } from "@/lib/schemas/entity";

export type Node3D = {
  id: string;
  title: string;
  type: Entity["type"];
  color: string;
  href: string;
  x: number;
  y: number;
  z: number;
};

export type Edge3D = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
};

/** Fibonacci sphere — even distribution for graph nodes */
export function layoutSphere(
  items: { id: string; title: string; type: Entity["type"]; color: string; href: string }[],
  radius = 8,
  centerId?: string,
): Node3D[] {
  const n = items.length;
  if (n === 0) return [];

  const golden = Math.PI * (3 - Math.sqrt(5));
  const centerIdx = centerId ? items.findIndex((i) => i.id === centerId) : -1;

  return items.map((item, i) => {
    if (i === centerIdx) {
      return { ...item, x: 0, y: 0, z: 0 };
    }
    const idx = centerIdx >= 0 && i > centerIdx ? i - 1 : i;
    const count = centerIdx >= 0 ? n - 1 : n;
    const y = 1 - (idx / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * idx;
    const scale = centerIdx >= 0 ? radius : radius;
    return {
      ...item,
      x: Math.cos(theta) * r * scale,
      y: y * scale * 0.6,
      z: Math.sin(theta) * r * scale,
    };
  });
}

/** Ring orbit for home character constellation */
export function layoutOrbit(
  items: { id: string; title: string; color: string; href: string }[],
  radius = 3.5,
  height = 1.2,
): Node3D[] {
  return items.map((item, i) => {
    const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...item,
      type: "character" as const,
      x: Math.cos(angle) * radius,
      y: height + Math.sin(i * 1.7) * 0.3,
      z: Math.sin(angle) * radius - 2,
    };
  });
}

export function buildEdgesFromRelated(
  entities: Pick<Entity, "id" | "relatedIds" | "type" | "relationships">[],
): Edge3D[] {
  const edges: Edge3D[] = [];
  const seen = new Set<string>();
  const ids = new Set(entities.map((e) => e.id));

  for (const entity of entities) {
    for (const rid of entity.relatedIds) {
      if (!ids.has(rid)) continue;
      const key = [entity.id, rid].sort().join("--");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ id: key, source: entity.id, target: rid });
    }
    if (entity.type === "character") {
      for (const rel of entity.relationships) {
        if (!ids.has(rel.targetId)) continue;
        const key = `rel-${entity.id}-${rel.targetId}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({ id: key, source: entity.id, target: rel.targetId, animated: true });
      }
    }
  }
  return edges;
}
