"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EntityLinkById } from "@/components/EntityLink";
import { Portrait, CharacterPortrait } from "@/components/Portrait";
import { getNeighbors } from "@/lib/graph/getNeighbors";
import type { Character, Entity } from "@/lib/schemas/entity";
import { TYPE_LABELS } from "@/lib/utils";

type SidePanelProps = {
  href: string;
  onClose: () => void;
};

export function SidePanel({ href, onClose }: SidePanelProps) {
  const [entity, setEntity] = useState<Entity | null>(null);

  useEffect(() => {
    fetch(`/api/entity?path=${encodeURIComponent(href)}`)
      .then((r) => r.json())
      .then(setEntity)
      .catch(() => setEntity(null));
  }, [href]);

  const neighbors = entity ? getNeighbors(entity.id, 8) : [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close panel"
      />
      <aside className="relative h-full w-full max-w-md overflow-auto border-l border-border bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted">Side Panel</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 hover:bg-background"
          >
            ✕
          </button>
        </div>

        {!entity ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <>
            <div className="flex items-center gap-4">
              {entity.type === "character" ? (
                <CharacterPortrait character={entity as Character} size="lg" />
              ) : (
                <Portrait name={entity.title} size="lg" />
              )}
              <div>
                <h3 className="text-xl font-bold">{entity.title}</h3>
                <p className="text-sm text-muted">{TYPE_LABELS[entity.type]}</p>
              </div>
            </div>

            {entity.summary && (
              <p className="mt-4 text-sm leading-relaxed">{entity.summary}</p>
            )}

            <Link
              href={href}
              className="mt-4 inline-block rounded bg-heisenberg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Open full page →
            </Link>

            {neighbors.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-semibold">Connected to</h4>
                <div className="flex flex-wrap gap-2">
                  {neighbors.map((n) => (
                    <EntityLinkById key={n.id} id={n.id} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
