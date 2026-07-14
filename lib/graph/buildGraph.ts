import type { Edge, Node } from "@xyflow/react";
import type { Entity } from "@/lib/schemas/entity";
import { getAllEntities } from "@/lib/content/loader";
import { getTypeColor } from "@/lib/graph/colors";

export { getTypeColor };

export function buildGraphNodes(
  entities: Entity[],
  centerId?: string,
): Node[] {
  const positions = layoutNodes(entities, centerId);
  return entities.map((entity, i) => ({
    id: entity.id,
    type: "entity",
    position: positions[i] ?? { x: (i % 5) * 180, y: Math.floor(i / 5) * 120 },
    data: {
      label: entity.title,
      entityType: entity.type,
      slug: entity.slug,
      color: getTypeColor(entity.type),
    },
  }));
}

export function buildGraphEdges(entities: Entity[]): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();

  for (const entity of entities) {
    for (const relatedId of entity.relatedIds) {
      const key = [entity.id, relatedId].sort().join("--");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({
        id: key,
        source: entity.id,
        target: relatedId,
        animated: false,
        style: { stroke: "#64748b", strokeWidth: 1.5 },
      });
    }

    if (entity.type === "character") {
      for (const rel of entity.relationships) {
        const key = `rel-${entity.id}-${rel.targetId}-${rel.kind}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({
          id: key,
          source: entity.id,
          target: rel.targetId,
          label: rel.label ?? rel.kind,
          animated: true,
          style: { stroke: "#2d5016", strokeWidth: 2 },
        });
      }
    }
  }

  return edges;
}

function layoutNodes(entities: Entity[], centerId?: string): { x: number; y: number }[] {
  if (centerId) {
    const centerIdx = entities.findIndex((e) => e.id === centerId);
    if (centerIdx >= 0) {
      const positions: { x: number; y: number }[] = [];
      const center = { x: 400, y: 300 };
      positions[centerIdx] = center;
      let ring = 1;
      let idx = 0;
      for (let i = 0; i < entities.length; i++) {
        if (i === centerIdx) continue;
        const angle = (idx / (entities.length - 1)) * 2 * Math.PI;
        positions[i] = {
          x: center.x + Math.cos(angle) * 180 * ring,
          y: center.y + Math.sin(angle) * 180 * ring,
        };
        idx++;
      }
      return positions;
    }
  }

  return entities.map((_, i) => ({
    x: (i % 6) * 160 + 40,
    y: Math.floor(i / 6) * 140 + 40,
  }));
}

export function buildUniverseGraph(centerId?: string) {
  const entities = getAllEntities();
  const entityIds = new Set(entities.map((e) => e.id));

  const connected = centerId
    ? getConnectedSubgraph(centerId, entities)
    : entities;

  const filtered = connected.filter((e) => entityIds.has(e.id));
  return {
    nodes: buildGraphNodes(filtered, centerId),
    edges: buildGraphEdges(filtered),
  };
}

function getConnectedSubgraph(centerId: string, entities: Entity[], depth = 2): Entity[] {
  const byId = new Map(entities.map((e) => [e.id, e]));
  const visited = new Set<string>([centerId]);
  let frontier = [centerId];

  for (let d = 0; d < depth; d++) {
    const next: string[] = [];
    for (const id of frontier) {
      const entity = byId.get(id);
      if (!entity) continue;
      for (const rid of entity.relatedIds) {
        if (!visited.has(rid)) {
          visited.add(rid);
          next.push(rid);
        }
      }
      if (entity.type === "character") {
        for (const rel of entity.relationships) {
          if (!visited.has(rel.targetId)) {
            visited.add(rel.targetId);
            next.push(rel.targetId);
          }
        }
      }
    }
    frontier = next;
  }

  return [...visited].map((id) => byId.get(id)).filter(Boolean) as Entity[];
}
