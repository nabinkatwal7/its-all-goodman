"use client";

import { useEffect } from "react";
import { useUniverse } from "@/components/providers/UniverseProvider";

export function VisitTracker({ entityId }: { entityId: string }) {
  const { markVisited } = useUniverse();

  useEffect(() => {
    markVisited(entityId);
  }, [entityId, markVisited]);

  return null;
}
