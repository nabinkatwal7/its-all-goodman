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

export function buildFullGraph3D(limit?: number): { nodes: Node3D[]; edges: Edge3D[] } {
  const all = limit ? getAllEntities().slice(0, limit) : getAllEntities();
  const items = all.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    color: getTypeColor(e.type),
    href: entityHref(e),
  }));
  const radius = all.length > 100 ? 14 : all.length > 50 ? 11 : 9;
  return {
    nodes: layoutSphere(items, radius),
    edges: buildEdgesFromRelated(all),
  };
}

export function buildHomeGraph3D(limit = 45): { nodes: Node3D[]; edges: Edge3D[] } {
  return buildFullGraph3D(limit);
}
