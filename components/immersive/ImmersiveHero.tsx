"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlobalSearch } from "@/components/shell/GlobalSearch";
import { useUniverse } from "@/components/providers/UniverseProvider";
import type { SearchResult } from "@/lib/search/index";
import { SERIES_LABELS } from "@/lib/utils";

const UniverseScene = dynamic(
  () => import("@/components/immersive/UniverseScene").then((m) => m.UniverseScene),
  { ssr: false },
);

type HeroProps = {
  searchItems: SearchResult[];
};

export function ImmersiveHero({ searchItems }: HeroProps) {
  const { universe, setUniverse } = useUniverse();

  const series = [
    { id: "breaking-bad" as const, href: "/characters/walter-white", label: "Breaking Bad", symbol: "Br" },
    { id: "better-call-saul" as const, href: "/characters/saul-goodman", label: "Better Call Saul", symbol: "Sa" },
    { id: "el-camino" as const, href: "/episodes/el-camino/ec-el-camino", label: "El Camino", symbol: "Ec" },
  ];

  return (
    <section className="relative -mx-4 -mt-6 mb-16 overflow-hidden hero-mesh min-h-[85vh] flex flex-col items-center justify-center px-4">
      <UniverseScene />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-sm tracking-[0.3em] text-pollos uppercase"
        >
          Albuquerque · New Mexico
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="font-display mt-4 text-6xl leading-none sm:text-8xl md:text-9xl"
        >
          <span className="glitch text-heisenberg">BREAKING</span>
          <br />
          <span className="text-foreground">BAD</span>
          <span className="text-pollos"> · </span>
          <span className="text-pollos">UNIVERSE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-lg text-muted"
        >
          Enter the graph. Every character, episode, and connection —
          from the desert cook to Slippin&apos; Jimmy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-xl"
        >
          <GlobalSearch items={searchItems} placeholder="Say my name... search the universe" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {series.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setUniverse(s.id)}
              className={`element-badge flex h-16 w-16 flex-col items-center justify-center rounded-sm transition-all ${
                universe === s.id ? "scale-110 ring-2 ring-accent" : "opacity-70 hover:opacity-100"
              }`}
            >
              <span className="text-[10px] text-muted">{s.symbol}</span>
              <span className="text-lg text-accent">{s.symbol === "Br" ? "35" : s.symbol === "Sa" ? "79" : "99"}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {series.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onMouseEnter={() => setUniverse(s.id)}
              className={`rounded-sm border px-5 py-2 font-display text-lg tracking-wider transition-all ${
                universe === s.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-pollos hover:text-pollos"
              }`}
            >
              {SERIES_LABELS[s.id]}
            </Link>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-muted"
        >
          ↓ explore
        </motion.div>
      </div>
    </section>
  );
}
