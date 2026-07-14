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
    <section className="relative -mx-4 -mt-6 mb-16 flex min-h-[92vh] flex-col items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-sm tracking-[0.4em] text-pollos uppercase"
        >
          Tohajiilee · New Mexico · 5,312 ft
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="font-display mt-4 text-6xl leading-[0.9] sm:text-8xl md:text-[9rem]"
        >
          <span className="glitch text-heisenberg drop-shadow-[0_0_30px_var(--glow)]">BREAKING</span>
          <br />
          <span className="text-foreground">BAD</span>
          <span className="text-pollos"> · </span>
          <span className="text-pollos">UNIVERSE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-md text-muted"
        >
          You are standing in the desert. Every path leads deeper into the story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-xl"
        >
          <GlobalSearch items={searchItems} placeholder="Say my name..." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          {series.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setUniverse(s.id)}
              className={`element-badge flex h-[72px] w-[72px] flex-col items-center justify-center transition-all ${
                universe === s.id ? "scale-110 ring-2 ring-accent" : "opacity-60 hover:opacity-100"
              }`}
            >
              <span className="self-start pl-1 text-[9px] text-muted">{s.symbol}</span>
              <span className="text-2xl text-accent">{s.num}</span>
              <span className="text-[8px] text-muted">{s.label.split(" ")[0]}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {series.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onMouseEnter={() => setUniverse(s.id)}
              className={`rounded-sm border px-5 py-2 font-display text-lg tracking-wider transition-all ${
                universe === s.id
                  ? "border-accent bg-accent/10 text-accent shadow-[0_0_20px_var(--glow)]"
                  : "border-border/50 text-muted hover:border-pollos hover:text-pollos"
              }`}
            >
              {SERIES_LABELS[s.id]}
            </Link>
          ))}
        </motion.div>

        <motion.p
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="mt-16 font-display text-sm tracking-[0.3em] text-muted"
        >
          SCROLL INTO THE DESERT
        </motion.p>
      </div>
    </section>
  );
}
