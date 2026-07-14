"use client";

import { useState } from "react";
import type { Character } from "@/lib/schemas/entity";

const OUTFIT_COLORS = ["#94a3b8", "#64748b", "#2d5016", "#14532d", "#1f2937"];

export function OutfitGallery({ character }: { character: Character }) {
  const seasons = [1, 2, 3, 4, 5];
  const [season, setSeason] = useState(1);

  return (
    <div>
      <div className="flex gap-2">
        {seasons.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSeason(s)}
            className={`rounded px-3 py-1 text-sm ${season === s ? "bg-heisenberg text-white" : "border border-border"}`}
          >
            S{s}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[1, 2, 3].map((ep) => (
          <div
            key={ep}
            className="flex aspect-[3/4] flex-col items-center justify-center rounded-lg border border-border"
            style={{
              background: `linear-gradient(180deg, ${OUTFIT_COLORS[season % OUTFIT_COLORS.length]}44, ${character.portraitColor}22)`,
            }}
          >
            <div
              className="mb-2 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
              style={{ background: character.portraitColor }}
            >
              {character.name[0]}
            </div>
            <p className="text-xs text-muted">S{season}E{ep}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
