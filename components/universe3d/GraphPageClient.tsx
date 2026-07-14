"use client";

import Link from "next/link";
import { SceneConfigBridge } from "@/components/universe3d/SceneConfigBridge";
import type { Edge3D, Node3D } from "@/lib/graph/layout3d";

type GraphPageClientProps = {
  graph3d: { nodes: Node3D[]; edges: Edge3D[] };
};

export function GraphPageClient({ graph3d }: GraphPageClientProps) {
  return (
    <>
      <SceneConfigBridge
        config={{
          mode: "graph",
          graphNodes: graph3d.nodes,
          graphEdges: graph3d.edges,
          interactive: true,
        }}
      />

      <div className="pointer-events-none relative z-10">
        <p className="label-caps">Navigate the network · drag to orbit · scroll to zoom</p>
        <h1 className="font-display text-5xl tracking-wider text-heisenberg">UNIVERSE GRAPH</h1>
        <p className="text-readable mt-3 max-w-lg">
          {graph3d.nodes.length} nodes · {graph3d.edges.length} connections. Click any sphere to
          travel. The desert is the substrate — every story connects.
        </p>
        <Link
          href="/world"
          className="pointer-events-auto mt-4 inline-block rounded border border-accent bg-accent/10 px-4 py-2 font-display tracking-wider text-accent hover:bg-accent/20"
        >
          FULL 3D WORLD →
        </Link>
      </div>
    </>
  );
}
