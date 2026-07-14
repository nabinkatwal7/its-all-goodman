import { UniverseGraph } from "@/components/graph/UniverseGraph";
import { buildUniverseGraph } from "@/lib/graph/buildGraph";

export const metadata = { title: "Universe Graph" };

export default function GraphPage() {
  const { nodes, edges } = buildUniverseGraph();

  return (
    <div>
      <h1 className="text-3xl font-bold">Universe Graph</h1>
      <p className="mt-2 text-muted">
        Obsidian-style knowledge graph. Click nodes to navigate. Zoom and pan freely.
      </p>
      <div className="mt-6">
        <UniverseGraph nodes={nodes} edges={edges} height={700} />
      </div>
    </div>
  );
}
