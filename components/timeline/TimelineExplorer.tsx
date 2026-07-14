"use client";

import { useState } from "react";
import Link from "next/link";

type TimelineEvent = {
  year: number;
  label: string;
  href?: string;
  series?: string;
  entityId?: string;
};

type TimelineExplorerProps = {
  events: TimelineEvent[];
  characters: { id: string; title: string }[];
};

export function TimelineExplorer({ events, characters }: TimelineExplorerProps) {
  const [seriesFilter, setSeriesFilter] = useState("");
  const [charFilter, setCharFilter] = useState("");

  const filtered = events.filter((ev) => {
    if (seriesFilter && ev.series && ev.series !== seriesFilter) return false;
    if (charFilter && ev.entityId !== charFilter) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Timeline Explorer</h1>
      <p className="mt-2 text-muted">Horizontal scroll through the universe timeline</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={seriesFilter}
          onChange={(e) => setSeriesFilter(e.target.value)}
          className="rounded border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">All series</option>
          <option value="breaking-bad">Breaking Bad</option>
          <option value="better-call-saul">Better Call Saul</option>
          <option value="el-camino">El Camino</option>
        </select>
        <select
          value={charFilter}
          onChange={(e) => setCharFilter(e.target.value)}
          className="rounded border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">All characters</option>
          {characters.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 overflow-x-auto pb-8">
        <div className="flex min-w-max items-start gap-0 px-4">
          {filtered.map((ev, i) => (
            <div key={`${ev.year}-${ev.label}-${i}`} className="flex items-start">
              <div className="w-48 shrink-0 text-center">
                <p className="text-2xl font-bold text-pollos">{ev.year}</p>
                <p className="my-2 text-muted">↓</p>
                {ev.href ? (
                  <Link
                    href={ev.href}
                    className="block rounded-lg border border-border bg-card p-3 text-sm font-medium hover:border-accent"
                  >
                    {ev.label}
                  </Link>
                ) : (
                  <p className="text-sm">{ev.label}</p>
                )}
              </div>
              {i < filtered.length - 1 && (
                <div className="w-8 shrink-0 pt-16 text-center text-muted">—</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
