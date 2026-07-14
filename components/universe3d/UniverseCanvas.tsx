"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveSceneConfig } from "@/components/universe3d/SceneConfigProvider";
import { UniverseSceneContent } from "@/components/universe3d/UniverseScene";

export function UniverseCanvas() {
  const pathname = usePathname();
  const config = useActiveSceneConfig(pathname);
  const interactive = config.interactive || config.mode === "graph" || config.mode === "world";

  return (
    <div
      className={cn(
        "universe-canvas fixed inset-0 z-0",
        interactive ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!interactive}
    >
      <Canvas
        camera={{
          position: config.mode === "graph" || config.mode === "world" ? [0, 2, 14] : [0, 2.2, 6.5],
          fov: config.mode === "graph" ? 55 : 62,
          near: 0.1,
          far: 120,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ touchAction: interactive ? "none" : "auto" }}
      >
        <Suspense fallback={null}>
          <UniverseSceneContent
            mode={config.mode}
            orbitNodes={config.orbitNodes}
            graphNodes={config.graphNodes}
            graphEdges={config.graphEdges}
            interactive={interactive}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
