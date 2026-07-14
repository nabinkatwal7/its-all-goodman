import { GraphPageClient } from "@/components/universe3d/GraphPageClient";
import { buildFullGraph3D } from "@/lib/graph/buildGraph3d";

export const metadata = { title: "Universe Graph" };

export default function GraphPage() {
  const graph3d = buildFullGraph3D();

  return <GraphPageClient graph3d={graph3d} />;
}
