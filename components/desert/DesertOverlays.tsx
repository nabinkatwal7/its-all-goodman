"use client";

export function DesertOverlays() {
  return (
    <>
      <div className="desert-sun" aria-hidden />
      <div className="heat-shimmer" aria-hidden />
      <div className="desert-vignette" aria-hidden />
      <div className="desert-highway" aria-hidden />
      <div className="desert-dust-css" aria-hidden />
      <Tumbleweed />
      <CoordsHud />
    </>
  );
}

function Tumbleweed() {
  return (
    <div className="tumbleweed" aria-hidden>
      <svg viewBox="0 0 40 40" className="h-8 w-8 opacity-40">
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="26" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="8" x2="20" y2="32" stroke="currentColor" strokeWidth="0.8" />
        <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function CoordsHud() {
  return (
    <div className="coords-hud font-mono text-[10px] tracking-widest text-muted/60" aria-hidden>
      <span>34.5199° N · 105.8701° W · ELEV 5,312 FT · TOHAJIILEE SECTOR</span>
    </div>
  );
}
