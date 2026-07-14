import { WorldPageClient } from "@/components/universe3d/WorldPageClient";
import { buildFullGraph3D, buildOrbitNodes3D } from "@/lib/graph/buildGraph3d";

export const metadata = { title: "3D Universe World" };

export default function WorldPage() {
  const graph3d = buildFullGraph3D();
  const orbitNodes = buildOrbitNodes3D(12);

  return <WorldPageClient graph3d={graph3d} orbitNodes={orbitNodes} />;
}
