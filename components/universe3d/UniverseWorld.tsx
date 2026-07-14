"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UniverseCanvas = dynamic(
  () => import("@/components/universe3d/UniverseCanvas").then((m) => m.UniverseCanvas),
  { ssr: false },
);

export function UniverseWorld() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reducedMotion) {
    return <div className="desert-fallback fixed inset-0 z-0" aria-hidden />;
  }

  return <UniverseCanvas />;
}
