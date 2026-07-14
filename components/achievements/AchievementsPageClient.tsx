"use client";

import { useUniverse } from "@/components/providers/UniverseProvider";

const BADGES = [
  { id: "watched-bb", label: "Watched Breaking Bad", desc: "Toggle when you've seen BB" },
  { id: "watched-bcs", label: "Watched Better Call Saul", desc: "Toggle when you've seen BCS" },
  { id: "found100", label: "Found 100 pages", desc: "Visit 100 unique entities" },
  { id: "timeline", label: "Completed Timeline", desc: "Scroll through the full timeline" },
  { id: "all-majors", label: "Visited every major character", desc: "Visit all main characters" },
];

const MAJOR_CHARS = [
  "walter-white",
  "jesse-pinkman",
  "saul-goodman",
  "gustavo-fring",
  "mike-ehrmantraut",
  "hank-schrader",
  "kim-wexler",
  "lalo-salamanca",
];

export function AchievementsPageClient() {
  const {
    achievements,
    visitedIds,
    watchedBB,
    watchedBCS,
    setWatchedBB,
    setWatchedBCS,
    unlockAchievement,
  } = useUniverse();

  const visitedMajor = MAJOR_CHARS.filter((id) => visitedIds.includes(id)).length;
  const allMajors = visitedMajor === MAJOR_CHARS.length;

  if (allMajors && !achievements.allMajors) {
    unlockAchievement("allMajors");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Achievements</h1>
      <p className="mt-2 text-muted">
        {visitedIds.length} pages visited · {Object.values(achievements).filter(Boolean).length} badges unlocked
      </p>

      <div className="mt-4 flex gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={watchedBB} onChange={(e) => setWatchedBB(e.target.checked)} />
          Watched BB
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={watchedBCS} onChange={(e) => setWatchedBCS(e.target.checked)} />
          Watched BCS
        </label>
        <button
          type="button"
          onClick={() => unlockAchievement("timeline")}
          className="text-sm text-accent hover:underline"
        >
          Mark timeline complete
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {BADGES.map((badge) => {
          const unlocked =
            achievements[badge.id] ||
            (badge.id === "watched-bb" && watchedBB) ||
            (badge.id === "watched-bcs" && watchedBCS) ||
            (badge.id === "found100" && visitedIds.length >= 100) ||
            (badge.id === "all-majors" && allMajors);

          return (
            <div
              key={badge.id}
              className={`rounded-xl border p-5 ${unlocked ? "border-pollos bg-pollos/10" : "border-border opacity-60"}`}
            >
              <p className="text-2xl">{unlocked ? "🏆" : "🔒"}</p>
              <h2 className="mt-2 font-bold">{badge.label}</h2>
              <p className="text-sm text-muted">{badge.desc}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted">
        Major characters visited: {visitedMajor}/{MAJOR_CHARS.length}
      </p>
    </div>
  );
}
