"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Character } from "@/lib/schemas/entity";

export function CharacterEvolutionSlider({ character }: { character: Character }) {
  const stages = character.evolutionStages;
  if (stages.length === 0) return null;

  const [idx, setIdx] = useState(0);
  const stage = stages[idx];

  return (
    <div>
      <input
        type="range"
        min={0}
        max={stages.length - 1}
        value={idx}
        onChange={(e) => setIdx(parseInt(e.target.value, 10))}
        className="w-full accent-heisenberg"
      />
      <motion.div
        key={stage.label}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 flex items-center gap-4"
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
          style={{ background: stage.color ?? character.portraitColor }}
        >
          {stage.label[0]}
        </div>
        <div>
          <p className="text-lg font-bold">{stage.label}</p>
          {stage.description && (
            <p className="text-sm text-muted">{stage.description}</p>
          )}
        </div>
      </motion.div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        {stages.map((s, i) => (
          <span key={s.label} className={i === idx ? "text-accent font-bold" : ""}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsRadar({ stats }: { stats: NonNullable<Character["stats"]> }) {
  const fields = [
    { key: "intelligence", label: "Intelligence" },
    { key: "manipulation", label: "Manipulation" },
    { key: "chemistry", label: "Chemistry" },
    { key: "combat", label: "Combat" },
    { key: "leadership", label: "Leadership" },
  ] as const;

  return (
    <div className="space-y-3">
      {fields.map(({ key, label }) => {
        const val = stats[key] ?? 0;
        return (
          <div key={key}>
            <div className="flex justify-between text-sm">
              <span>{label}</span>
              <span className="text-muted">{val}/10</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-background">
              <div
                className="h-2 rounded-full bg-heisenberg transition-all"
                style={{ width: `${val * 10}%` }}
              />
            </div>
          </div>
        );
      })}
      {stats.kills !== undefined && (
        <p className="text-sm"><strong>Kills:</strong> {stats.kills}+</p>
      )}
      {stats.netWorth !== undefined && (
        <p className="text-sm"><strong>Net worth estimate:</strong> ${(stats.netWorth / 1e6).toFixed(0)}M</p>
      )}
    </div>
  );
}

export function LifeTimeline({ events }: { events: Character["lifeEvents"] }) {
  if (events.length === 0) return null;

  return (
    <div className="relative ml-4 border-l-2 border-heisenberg pl-6">
      {events.map((ev, i) => (
        <div key={`${ev.year}-${ev.label}`} className="relative mb-6 last:mb-0">
          <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-heisenberg" />
          <p className="text-xs font-bold text-pollos">{ev.year}</p>
          <p className="font-medium">{ev.label}</p>
          {i < events.length - 1 && (
            <p className="my-1 text-muted">↓</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function RelationshipMiniGraph({ character }: { character: Character }) {
  const rels = character.relationships;
  if (rels.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      <span className="rounded-lg bg-heisenberg/20 px-3 py-2 font-bold">{character.name.split(" ")[0]}</span>
      {rels.map((rel) => (
        <div key={rel.targetId} className="flex items-center gap-2">
          <span className="text-muted">↔</span>
          <a
            href={`/characters/${rel.targetId}`}
            className="rounded-lg border border-border px-3 py-2 text-sm hover:border-accent"
            title={rel.label}
          >
            {rel.label ?? rel.kind}
          </a>
        </div>
      ))}
    </div>
  );
}

import { useUniverse } from "@/components/providers/UniverseProvider";

export function FavoriteButton({ entityId }: { entityId: string }) {
  const { favorites, toggleFavorite } = useUniverse();
  const isFav = favorites.includes(entityId);
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(entityId)}
      className="rounded border border-border px-3 py-1 text-sm hover:bg-background"
    >
      {isFav ? "★ Saved" : "☆ Save"}
    </button>
  );
}
