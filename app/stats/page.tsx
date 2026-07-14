import { getAllEntities, getEntitiesByType } from "@/lib/content/loader";

export const metadata = { title: "Statistics" };

export default function StatsPage() {
  const all = getAllEntities();
  const characters = getEntitiesByType("character");
  const episodes = getEntitiesByType("episode");
  const deaths = getEntitiesByType("death");
  const orgs = getEntitiesByType("organization");
  const businesses = getEntitiesByType("business");

  const totalKills = characters.reduce((sum, c) => sum + (c.stats?.kills ?? 0), 0);

  const stats = [
    { label: "Characters", value: characters.length },
    { label: "Episodes", value: episodes.length },
    { label: "Deaths recorded", value: deaths.length },
    { label: "Total kills (est.)", value: totalKills },
    { label: "Organizations", value: orgs.length },
    { label: "Businesses", value: businesses.length },
    { label: "Quotes", value: getEntitiesByType("quote").length },
    { label: "Locations", value: getEntitiesByType("location").length },
    { label: "All entities", value: all.length },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
      <p className="mt-2 text-muted">Aggregates from the knowledge graph</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-6">
            <p className="text-3xl font-bold text-heisenberg">{s.value}</p>
            <p className="mt-1 text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Top characters by connections</h2>
        <ol className="mt-4 space-y-2">
          {[...characters]
            .sort((a, b) => b.relatedIds.length - a.relatedIds.length)
            .slice(0, 10)
            .map((c, i) => (
              <li key={c.id} className="flex justify-between rounded bg-card px-4 py-2">
                <span>{i + 1}. {c.name}</span>
                <span className="text-muted">{c.relatedIds.length} links</span>
              </li>
            ))}
        </ol>
      </section>
    </div>
  );
}
