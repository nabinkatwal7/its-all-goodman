export type SpoilerLevel =
  | "bb-s1"
  | "bb-s2"
  | "bb-s3"
  | "bb-s4"
  | "bb-s5"
  | "bcs-s1"
  | "bcs-s2"
  | "bcs-s3"
  | "bcs-s4"
  | "bcs-s5"
  | "bcs-s6"
  | "everything";

export const SPOILER_LEVELS: { value: SpoilerLevel; label: string }[] = [
  { value: "bb-s1", label: "Breaking Bad S1" },
  { value: "bb-s2", label: "Breaking Bad S2" },
  { value: "bb-s3", label: "Breaking Bad S3" },
  { value: "bb-s4", label: "Breaking Bad S4" },
  { value: "bb-s5", label: "Breaking Bad S5" },
  { value: "bcs-s1", label: "Better Call Saul S1" },
  { value: "bcs-s2", label: "Better Call Saul S2" },
  { value: "bcs-s3", label: "Better Call Saul S3" },
  { value: "bcs-s4", label: "Better Call Saul S4" },
  { value: "bcs-s5", label: "Better Call Saul S5" },
  { value: "bcs-s6", label: "Better Call Saul S6" },
  { value: "everything", label: "Everything" },
];

export function spoilerLevelIndex(level: SpoilerLevel): number {
  return SPOILER_LEVELS.findIndex((l) => l.value === level);
}

export function isEntitySpoiled(
  entity: { spoilerMaxSeason?: Record<string, number>; type?: string; season?: number; series?: string[] },
  level: SpoilerLevel,
): boolean {
  if (level === "everything") return false;

  const idx = spoilerLevelIndex(level);
  const levelEntry = SPOILER_LEVELS[idx];
  if (!levelEntry) return false;

  const match = levelEntry.label.match(/^(Breaking Bad|Better Call Saul) S(\d+)$/);
  if (!match) return false;

  const seriesKey =
    match[1] === "Breaking Bad" ? "breaking-bad" : "better-call-saul";
  const maxSeason = parseInt(match[2], 10);

  if (entity.type === "episode" && entity.series?.includes(seriesKey as "breaking-bad")) {
    if (entity.series.includes(seriesKey as "breaking-bad") && entity.season !== undefined) {
      const epSeries = entity.series[0];
      if (epSeries === seriesKey && entity.season > maxSeason) return true;
    }
  }

  if (entity.spoilerMaxSeason?.[seriesKey] !== undefined) {
    return entity.spoilerMaxSeason[seriesKey] > maxSeason;
  }

  return false;
}
