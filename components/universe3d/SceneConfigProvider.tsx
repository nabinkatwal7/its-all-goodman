"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Edge3D, Node3D } from "@/lib/graph/layout3d";

export type SceneMode = "desert" | "home" | "graph" | "world";

export type SceneConfig = {
  mode: SceneMode;
  orbitNodes?: Node3D[];
  graphNodes?: Node3D[];
  graphEdges?: Edge3D[];
  centerId?: string;
  interactive?: boolean;
};

type SceneConfigContextValue = {
  sceneConfig: SceneConfig | null;
  setSceneConfig: (config: SceneConfig | null) => void;
};

const SceneConfigContext = createContext<SceneConfigContextValue | null>(null);

const DEFAULT: SceneConfig = { mode: "desert" };

export function SceneConfigProvider({ children }: { children: ReactNode }) {
  const [sceneConfig, setSceneConfigState] = useState<SceneConfig | null>(null);

  const setSceneConfig = useCallback((config: SceneConfig | null) => {
    setSceneConfigState(config);
  }, []);

  const value = useMemo(
    () => ({ sceneConfig, setSceneConfig }),
    [sceneConfig, setSceneConfig],
  );

  return (
    <SceneConfigContext.Provider value={value}>{children}</SceneConfigContext.Provider>
  );
}

export function useSceneConfig() {
  const ctx = useContext(SceneConfigContext);
  if (!ctx) throw new Error("useSceneConfig must be used within SceneConfigProvider");
  return ctx;
}

export function useActiveSceneConfig(pathname: string): SceneConfig {
  const { sceneConfig } = useSceneConfig();

  if (sceneConfig) return sceneConfig;
  if (pathname === "/graph" || pathname === "/world") {
    return { mode: pathname === "/world" ? "world" : "graph", interactive: true };
  }
  if (pathname === "/") return { mode: "home" };
  return DEFAULT;
}
