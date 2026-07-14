"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { entityHref, type Entity } from "@/lib/schemas/entity";
import { TYPE_LABELS } from "@/lib/utils";

type FilterableDatabaseProps = {
  title: string;
  entities: Entity[];
  filterFields?: { key: string; label: string; getValues: (e: Entity) => string[] }[];
  searchKeys?: (e: Entity) => string;
};

export function FilterableDatabase({
  title,
  entities,
  filterFields = [],
  searchKeys,
}: FilterableDatabaseProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filterOptions = useMemo(() => {
    const opts: Record<string, Set<string>> = {};
    for (const field of filterFields) {
      opts[field.key] = new Set();
      for (const e of entities) {
        for (const v of field.getValues(e)) opts[field.key].add(v);
      }
    }
    return opts;
  }, [entities, filterFields]);

  const filtered = useMemo(() => {
    return entities.filter((e) => {
      if (query && searchKeys) {
        if (!searchKeys(e).toLowerCase().includes(query.toLowerCase())) return false;
      }
      for (const field of filterFields) {
        const val = filters[field.key];
        if (val && !field.getValues(e).includes(val)) return false;
      }
      return true;
    });
  }, [entities, query, filters, filterFields, searchKeys]);

  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-sm text-muted">{filtered.length} of {entities.length}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {filterFields.map((field) => (
          <select
            key={field.key}
            value={filters[field.key] ?? ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, [field.key]: e.target.value }))
            }
            className="rounded border border-border bg-card px-3 py-2 text-sm"
          >
            <option value="">{field.label}</option>
            {[...(filterOptions[field.key] ?? [])].sort().map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-border">
        {filtered.map((e) => (
          <li key={e.id} className="py-4">
            <Link href={entityHref(e)} className="font-medium hover:text-accent">
              {e.title}
            </Link>
            {e.summary && <p className="mt-1 text-sm text-muted">{e.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
