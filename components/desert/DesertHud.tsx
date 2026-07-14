"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type DesertHudProps = {
  children: ReactNode;
  className?: string;
  full?: boolean;
};

export function DesertHud({ children, className = "", full }: DesertHudProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`desert-hud ${full ? "desert-hud-full" : ""} ${className}`}
    >
      <div className="desert-hud-corner desert-hud-tl" aria-hidden />
      <div className="desert-hud-corner desert-hud-tr" aria-hidden />
      <div className="desert-hud-corner desert-hud-bl" aria-hidden />
      <div className="desert-hud-corner desert-hud-br" aria-hidden />
      {children}
    </motion.div>
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
      <div className="mb-4 flex items-end gap-3 border-b border-border/40 pb-2">
        <h2 className="font-display text-3xl tracking-[0.15em] text-accent">{title}</h2>
        {subtitle && <span className="pb-0.5 text-xs text-muted">{subtitle}</span>}
      </div>
      {children}
    </section>
  );
}
