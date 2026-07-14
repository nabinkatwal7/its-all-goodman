"use client";

import { usePathname } from "next/navigation";

export function DesertOverlays() {
  const pathname = usePathname();
  const immersive = pathname === "/" || pathname === "/graph" || pathname === "/world";

  return (
    <>
      <div
        className={immersive ? "desert-canvas-dim-light" : "desert-canvas-dim"}
        aria-hidden
      />
      <div
        className={immersive ? "content-scrim-light" : "content-scrim"}
        aria-hidden
      />
      <div className="desert-sun" aria-hidden />
      <div className="heat-shimmer" aria-hidden />
      <div className={immersive ? "desert-vignette-light" : "desert-vignette"} aria-hidden />
      <div className="desert-highway" aria-hidden />
      <div className="desert-dust-css" aria-hidden />
      <CoordsHud />
    </>
  );
}

function CoordsHud() {
  return (
    <div className="coords-hud font-mono text-[10px] tracking-widest" aria-hidden>
      34.5199° N · 105.8701° W · ELEV 5,312 FT · TOHAJIILEE
    </div>
  );
}
