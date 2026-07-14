"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { SearchResult } from "@/lib/search/index";
import { TYPE_LABELS } from "@/lib/utils";

type GlobalSearchProps = {
  items: SearchResult[];
  placeholder?: string;
  compact?: boolean;
};

export function GlobalSearch({ items, placeholder = "Search the universe...", compact }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "type", "summary"],
        threshold: 0.4,
      }),
    [items],
  );

  const results = query.trim()
    ? fuse.search(query, { limit: 10 }).map((r) => r.item)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={
          compact
            ? "w-full rounded-md border border-border bg-card px-3 py-1.5 text-sm outline-none focus:border-accent"
            : "w-full rounded-lg border border-border bg-card px-4 py-2.5 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        }
      />
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-lg border border-border bg-card shadow-xl">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center justify-between px-4 py-2 hover:bg-background"
              >
                <span>{r.title}</span>
                <span className="text-xs text-muted">{TYPE_LABELS[r.type]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
