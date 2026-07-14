"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type DesertHudProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function DesertHud({ children, className = "", label = "UNIVERSE DOSSIER" }: DesertHudProps) {
  const pathname = usePathname();
  const fileId = pathname.replace(/\//g, "-").slice(1) || "home";

  return (
    <div className={`desert-hud ${className}`}>
      <div className="desert-hud-corner desert-hud-tl" aria-hidden />
      <div className="desert-hud-corner desert-hud-tr" aria-hidden />
      <div className="desert-hud-corner desert-hud-bl" aria-hidden />
      <div className="desert-hud-corner desert-hud-br" aria-hidden />

      <div className="desert-hud-header">
        <span>{label} · FILE {fileId.toUpperCase().slice(0, 24)}</span>
        <span className="desert-hud-stamp">CONFIDENTIAL</span>
      </div>

      <div className="desert-hud-body">{children}</div>
    </div>
  );
}

export function DesertSection({
  title,
  children,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-wrap items-end gap-3 border-b border-border pb-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">{title}</h2>
        {subtitle && <span className="label-caps pb-0.5 opacity-80">{subtitle}</span>}
      </div>
      {children}
    </section>
  );
}

/** Lighter panel for home page sections over desert */
export function DesertPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`desert-hud ${className}`}>
      <div className="desert-hud-corner desert-hud-tl" aria-hidden />
      <div className="desert-hud-corner desert-hud-tr" aria-hidden />
      <div className="desert-hud-corner desert-hud-bl" aria-hidden />
      <div className="desert-hud-corner desert-hud-br" aria-hidden />
      <div className="desert-hud-body">{children}</div>
    </div>
  );
}
