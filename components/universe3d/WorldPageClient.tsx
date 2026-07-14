"use client";

import Link from "next/link";
import { SceneConfigBridge } from "@/components/universe3d/SceneConfigBridge";
import { useUniverse } from "@/components/providers/UniverseProvider";
import type { Edge3D, Node3D } from "@/lib/graph/layout3d";
import { SERIES_LABELS } from "@/lib/utils";

type WorldPageClientProps = {
  graph3d: { nodes: Node3D[]; edges: Edge3D[] };
  orbitNodes: Node3D[];
};

export function WorldPageClient({ graph3d, orbitNodes }: WorldPageClientProps) {
  const { universe, setUniverse } = useUniverse();

  return (
    <>
      <SceneConfigBridge
        config={{
          mode: "world",
          orbitNodes,
          graphNodes: graph3d.nodes,
          graphEdges: graph3d.edges,
          interactive: true,
        }}
      />

      <div className="world-hud pointer-events-none fixed inset-x-0 top-20 z-20 px-4">
        <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-4">
          <div className="hero-panel pointer-events-auto max-w-md rounded-sm px-5 py-4">
            <p className="label-caps">Universe Simulator</p>
            <h1 className="font-display text-4xl tracking-wider text-heisenberg">THE DESERT</h1>
            <p className="text-readable mt-2 text-sm">
              Drag to orbit · scroll to zoom · click spheres to enter dossiers.{" "}
              {graph3d.nodes.length} entities rendered in 3D.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["breaking-bad", "better-call-saul", "el-camino"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setUniverse(s)}
                  className={`rounded-sm border px-3 py-1 font-display text-sm tracking-wider ${
                    universe === s
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border text-foreground-soft hover:border-pollos"
                  }`}
                >
                  {SERIES_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          <div className="pointer-events-auto flex flex-col gap-2">
            <Link
              href="/graph"
              className="rounded-sm border border-border bg-surface-solid/90 px-4 py-2 font-display text-sm tracking-wider hover:border-accent"
            >
              2D GRAPH
            </Link>
            <Link
              href="/"
              className="rounded-sm border border-border bg-surface-solid/90 px-4 py-2 font-display text-sm tracking-wider hover:border-accent"
            >
              HOME
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-24 left-4 z-20 max-w-xs">
        <div className="desert-hud-stamp inline-block">LIVE SIMULATION</div>
        <p className="text-readable mt-2 text-xs">
          RV · money barrels · Pollos sign · crystal · Albuquerque skyline · character orbit · full
          knowledge graph
        </p>
      </div>
    </>
  );
}
