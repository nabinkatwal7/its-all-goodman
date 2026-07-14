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
        className={`input-field ${compact ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"}`}
      />
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-sm border border-border bg-[#120c06] shadow-2xl">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center justify-between px-4 py-2.5 text-foreground hover:bg-surface"
              >
                <span className="font-medium">{r.title}</span>
                <span className="text-xs text-muted">{TYPE_LABELS[r.type]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
