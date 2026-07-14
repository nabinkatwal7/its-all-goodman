import { getAllEntities, getPopularCharacters } from "@/lib/content/loader";
import { getTypeColor } from "@/lib/graph/colors";
import { buildEdgesFromRelated, layoutOrbit, layoutSphere, type Edge3D, type Node3D } from "@/lib/graph/layout3d";
import { entityHref } from "@/lib/schemas/entity";

export function buildOrbitNodes3D(limit = 10): Node3D[] {
  const chars = getPopularCharacters(limit);
  return layoutOrbit(
    chars.map((c) => ({
      id: c.id,
      title: c.name,
      color: c.portraitColor,
      href: `/characters/${c.slug}`,
    })),
  );
}

export function buildGraphNodes3D(limit = 80, centerId?: string): { nodes: Node3D[]; edges: Edge3D[] } {
  const all = getAllEntities();
  const entities = centerId
    ? all.filter((e) => {
        const connected = new Set<string>([centerId]);
        for (const e of all) {
          if (e.relatedIds.includes(centerId) || (e.type === "character" && e.relationships.some((r) => r.targetId === centerId))) {
            connected.add(e.id);
          }
        }
        return connected.has(e.id);
      })
    : all.slice(0, limit);

  const slice = centerId ? entities : all.slice(0, limit);
  const items = slice.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    color: getTypeColor(e.type),
    href: entityHref(e),
  }));

  const nodes = layoutSphere(items, centerId ? 6 : 9, centerId);
  const edges = buildEdgesFromRelated(slice);
  return { nodes, edges };
}

export function buildFullGraph3D(): { nodes: Node3D[]; edges: Edge3D[] } {
  const all = getAllEntities();
  const items = all.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    color: getTypeColor(e.type),
    href: entityHref(e),
  }));
  const nodes = layoutSphere(items, 12);
  const edges = buildEdgesFromRelated(all);
  return { nodes, edges };
}
