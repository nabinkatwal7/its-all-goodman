"use client";

import Link from "next/link";
import { entityHref, type Quote } from "@/lib/schemas/entity";
import { EntityLinkById } from "@/components/EntityLink";
import { useMemo, useState } from "react";

export function QuotesDatabase({ quotes }: { quotes: Quote[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  const tags = useMemo(() => {
    const t = new Set<string>();
    quotes.forEach((q) => q.tags.forEach((x) => t.add(x)));
    return [...t].sort();
  }, [quotes]);

  const filtered = quotes.filter((q) => {
    if (query && !q.text.toLowerCase().includes(query.toLowerCase())) return false;
    if (tag && !q.tags.includes(tag)) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Quote Explorer</h1>
      <div className="mt-4 flex gap-3">
        <input
          type="search"
          placeholder='Search "Say my name"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded border border-border bg-card px-3 py-2 text-sm"
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded border border-border bg-card px-3 py-2 text-sm">
          <option value="">All tags</option>
          {tags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <ul className="mt-8 space-y-4">
        {filtered.map((q) => (
          <li key={q.id} className="rounded-xl border border-border bg-card p-5">
            <blockquote className="text-lg font-medium">&ldquo;{q.text}&rdquo;</blockquote>
            <p className="mt-2 text-sm text-muted">
              <EntityLinkById id={q.speakerId} /> · <EntityLinkById id={q.episodeId} />
            </p>
            {q.context && <p className="mt-2 text-sm">{q.context}</p>}
            <div className="mt-2 flex gap-2">
              {q.tags.map((t) => (
                <span key={t} className="rounded bg-background px-2 py-0.5 text-xs">{t}</span>
              ))}
            </div>
            <Link href={entityHref(q)} className="mt-2 inline-block text-xs text-accent">Detail →</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
