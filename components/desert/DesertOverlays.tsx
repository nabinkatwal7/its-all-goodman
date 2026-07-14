"use client";

export function DesertOverlays() {
  return (
    <>
      <div className="desert-canvas-dim" aria-hidden />
      <div className="content-scrim" aria-hidden />
      <div className="desert-sun" aria-hidden />
      <div className="heat-shimmer" aria-hidden />
      <div className="desert-vignette" aria-hidden />
      <div className="desert-highway" aria-hidden />
      <div className="desert-dust-css" aria-hidden />
      <CoordsHud />
    </>
  );
}

function CoordsHud() {
  return (
    <div className="coords-hud font-mono text-[10px] tracking-widest" aria-hidden>
      34.5199° N · 105.8701° W · ELEV 5,312 FT
    </div>
  );
}
