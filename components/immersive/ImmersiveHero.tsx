"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlobalSearch } from "@/components/shell/GlobalSearch";
import { useUniverse } from "@/components/providers/UniverseProvider";
import type { SearchResult } from "@/lib/search/index";
import { SERIES_LABELS } from "@/lib/utils";

type HeroProps = {
  searchItems: SearchResult[];
};

export function ImmersiveHero({ searchItems }: HeroProps) {
  const { universe, setUniverse } = useUniverse();

  const series = [
    { id: "breaking-bad" as const, href: "/characters/walter-white", label: "Breaking Bad", symbol: "Br", num: "35" },
    { id: "better-call-saul" as const, href: "/characters/saul-goodman", label: "Better Call Saul", symbol: "Sa", num: "79" },
    { id: "el-camino" as const, href: "/episodes/el-camino/ec-el-camino", label: "El Camino", symbol: "Ec", num: "99" },
  ];

  return (
    <section className="relative -mx-4 -mt-6 mb-12 flex min-h-[88vh] flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-panel relative z-10 w-full max-w-3xl rounded-sm px-6 py-10 sm:px-10 sm:py-12"
      >
        <p className="label-caps text-center">Tohajiilee · New Mexico · 5,312 ft</p>

        <h1 className="text-hero font-display mt-6 text-center text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
          <span className="glitch text-heisenberg">BREAKING</span>
          <br />
          <span className="text-foreground">BAD</span>
          <span className="text-pollos"> · </span>
          <span className="text-pollos">UNIVERSE</span>
        </h1>

        <p className="text-readable mx-auto mt-6 max-w-md text-center text-base sm:text-lg">
          You are standing in the desert. Pick a path — every connection is a story waiting to break bad.
        </p>

        <div className="mx-auto mt-8 max-w-lg">
          <GlobalSearch items={searchItems} placeholder="Say my name..." />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {series.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setUniverse(s.id)}
              className={`element-badge flex h-[76px] w-[76px] flex-col items-center justify-center transition-all ${
                universe === s.id ? "scale-105 ring-2 ring-accent" : "opacity-80 hover:opacity-100"
              }`}
            >
              <span className="self-start pl-1.5 text-[9px] text-muted">{s.symbol}</span>
              <span className="text-2xl text-accent">{s.num}</span>
              <span className="text-[9px] text-muted">{s.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {series.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onMouseEnter={() => setUniverse(s.id)}
              className={`rounded-sm border px-5 py-2.5 font-display text-lg tracking-wider transition-all ${
                universe === s.id
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-surface-solid text-foreground-soft hover:border-pollos hover:text-pollos"
              }`}
            >
              {SERIES_LABELS[s.id]}
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.p
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="label-caps relative z-10 mt-10 opacity-70"
      >
        Scroll to explore
      </motion.p>
    </section>
  );
}
