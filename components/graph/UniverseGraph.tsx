"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { getTypeColor } from "@/lib/graph/colors";

type UniverseGraphProps = {
  nodes: Node[];
  edges: Edge[];
  height?: number;
  interactive?: boolean;
};

function EntityNode({ data }: { data: { label: string; entityType: string; slug: string; color: string } }) {
  return (
    <div
      className="rounded-sm border px-3 py-2 text-xs font-medium shadow-[0_0_12px_var(--glow)] backdrop-blur-sm cursor-pointer"
      style={{ borderColor: data.color, background: `${data.color}33`, color: "#f5e6c8" }}
    >
      <div className="font-display text-[10px] uppercase tracking-wider opacity-70">{data.entityType}</div>
      <div className="font-medium">{data.label}</div>
    </div>
  );
}

const nodeTypes = { entity: EntityNode };

export function UniverseGraph({
  nodes: initialNodes,
  edges: initialEdges,
  height = 500,
  interactive = true,
}: UniverseGraphProps) {
  const router = useRouter();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (!interactive) return;
      const type = node.data.entityType as string;
      const slug = node.data.slug as string;
      const routes: Record<string, string> = {
        character: `/characters/${slug}`,
        episode: `/episodes/breaking-bad/${slug}`,
        location: `/locations/${slug}`,
        organization: `/organizations/${slug}`,
        business: `/businesses/${slug}`,
        quote: `/quotes/${slug}`,
        death: `/deaths/${slug}`,
        vehicle: `/vehicles/${slug}`,
        weapon: `/weapons/${slug}`,
        drug: `/drugs/${slug}`,
        object: `/objects/${slug}`,
        symbol: `/symbolism/${slug}`,
        event: `/events/${slug}`,
        case: `/legal/${slug}`,
      };
      const href = routes[type];
      if (href) router.push(href);
    },
    [router, interactive],
  );

  const nodeColor = useMemo(
    () => (node: Node) => getTypeColor(node.data.entityType as string),
    [],
  );

  return (
    <div style={{ height }} className="overflow-hidden bg-black/40">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} />
        {interactive && <Controls />}
        {interactive && <MiniMap nodeColor={nodeColor} />}
      </ReactFlow>
    </div>
  );
}
