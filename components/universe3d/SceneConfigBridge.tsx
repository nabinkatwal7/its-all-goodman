"use client";

import { useEffect } from "react";
import { useSceneConfig, type SceneConfig } from "@/components/universe3d/SceneConfigProvider";

export function SceneConfigBridge({ config }: { config: SceneConfig }) {
  const { setSceneConfig } = useSceneConfig();

  useEffect(() => {
    setSceneConfig(config);
    return () => setSceneConfig(null);
  }, [config, setSceneConfig]);

  return null;
}
