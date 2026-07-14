"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Character } from "@/lib/schemas/entity";

type CompareCharacter = {
  id: string;
  slug: string;
  name: string;
  stats?: Character["stats"];
};

function CompareContent({ characters }: { characters: CompareCharacter[] }) {
  const params = useSearchParams();
  const aSlug = params.get("a") ?? "walter-white";
  const bSlug = params.get("b") ?? "gustavo-fring";

  const a = characters.find((c) => c.slug === aSlug) ?? characters[0];
  const b = characters.find((c) => c.slug === bSlug) ?? characters[1];

  const fields = [
    { key: "intelligence", label: "IQ / Intelligence" },
    { key: "kills", label: "Kills" },
    { key: "netWorth", label: "Money / Net Worth" },
    { key: "chemistry", label: "Chemistry" },
    { key: "leadership", label: "Leadership" },
    { key: "manipulation", label: "Manipulation" },
  ] as const;

  if (!a || !b) return <p>Select two characters to compare.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Compare Characters</h1>
      <div className="mt-4 flex flex-wrap gap-4">
        <select
          defaultValue={a.slug}
          onChange={(e) => {
            window.location.href = `/compare?a=${e.target.value}&b=${b.slug}`;
          }}
          className="rounded border border-border bg-card px-3 py-2"
        >
          {characters.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <span className="self-center text-muted">vs</span>
        <select
          defaultValue={b.slug}
          onChange={(e) => {
            window.location.href = `/compare?a=${a.slug}&b=${e.target.value}`;
          }}
          className="rounded border border-border bg-card px-3 py-2"
        >
          {characters.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[a, b].map((char) => (
          <div key={char.slug} className="rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold">{char.name}</h2>
            {fields.map(({ key, label }) => {
              const val = char.stats?.[key as keyof NonNullable<Character["stats"]>];
              const display = key === "netWorth" && val ? `$${(val / 1e6).toFixed(0)}M` : val ?? "—";
              return (
                <div key={key} className="mt-3">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span>{display}</span>
                  </div>
                  {typeof val === "number" && key !== "kills" && key !== "netWorth" && (
                    <div className="mt-1 h-2 rounded-full bg-background">
                      <div className="h-2 rounded-full bg-heisenberg" style={{ width: `${Math.min(val * 10, 100)}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparePageClient({ characters }: { characters: CompareCharacter[] }) {
  return (
    <Suspense>
      <CompareContent characters={characters} />
    </Suspense>
  );
}
