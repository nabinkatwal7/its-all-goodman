"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const DesertEnvironment = dynamic(
  () => import("@/components/desert/DesertEnvironment").then((m) => m.DesertEnvironment),
  { ssr: false },
);

export function DesertWorld() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reducedMotion) {
    return <div className="desert-fallback fixed inset-0 -z-10" aria-hidden />;
  }

  return <DesertEnvironment hero={isHome} />;
}
