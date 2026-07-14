import { NextRequest, NextResponse } from "next/server";
import { getAllEntities } from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";
import { getNeighbors } from "@/lib/graph/getNeighbors";

export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const entity = getAllEntities().find((e) => entityHref(e) === path);
  if (!entity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const neighbors = getNeighbors(entity.id, 8).map((n) => ({
    id: n.id,
    title: n.title,
    href: entityHref(n),
  }));

  return NextResponse.json({ entity, neighbors });
}
