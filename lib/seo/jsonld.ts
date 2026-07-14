import type { Entity } from "@/lib/schemas/entity";

export function jsonLdForEntity(entity: Entity) {
  const base = {
    "@context": "https://schema.org",
    name: entity.title,
    description: entity.summary,
  };

  if (entity.type === "character") {
    return {
      ...base,
      "@type": "Person",
      alternateName: entity.nicknames,
    };
  }

  if (entity.type === "episode") {
    return {
      ...base,
      "@type": "TVEpisode",
      episodeNumber: entity.episodeNumber,
      partOfSeason: { "@type": "TVSeason", seasonNumber: entity.season },
    };
  }

  return { ...base, "@type": "Thing" };
}
