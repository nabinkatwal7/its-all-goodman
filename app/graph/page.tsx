import { UniverseGraph } from "@/components/graph/UniverseGraph";
import { buildUniverseGraph } from "@/lib/graph/buildGraph";

export const metadata = { title: "Universe Graph" };

export default function GraphPage() {
  const { nodes, edges } = buildUniverseGraph();

  return (
    <div>
      <p className="font-display text-xs tracking-[0.4em] text-muted">NAVIGATE THE NETWORK</p>
      <h1 className="font-display text-5xl tracking-wider text-heisenberg">UNIVERSE GRAPH</h1>
      <p className="mt-3 max-w-lg text-muted">
        Every node is a person, place, or moment. Click to travel. The desert connects them all.
      </p>
      <div className="mt-8 overflow-hidden rounded-sm border border-border/40">
        <UniverseGraph nodes={nodes} edges={edges} height={700} />
      </div>
    </div>
  );
}
