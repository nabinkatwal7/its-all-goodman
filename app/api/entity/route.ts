import { NextRequest, NextResponse } from "next/server";
import { getAllEntities } from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";

export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const entity = getAllEntities().find((e) => entityHref(e) === path);
  if (!entity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(entity);
}
