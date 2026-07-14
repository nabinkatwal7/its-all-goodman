import Link from "next/link";
import { UniverseGraph } from "@/components/graph/UniverseGraph";
import { CharacterPortrait } from "@/components/Portrait";
import { GlobalSearch } from "@/components/shell/GlobalSearch";
import { buildUniverseGraph } from "@/lib/graph/buildGraph";
import {
  getRecentEntities,
  getPopularCharacters,
  getFeaturedEpisode,
} from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";
import { getAllSearchItems } from "@/lib/search/index";
import { SERIES_LABELS } from "@/lib/utils";

const EXPLORE = [
  { href: "/characters/walter-white", label: "Characters", icon: "👤" },
  { href: "/timeline", label: "Timeline", icon: "📅" },
  { href: "/episodes/breaking-bad/ozymandias", label: "Episode Guide", icon: "📺" },
  { href: "/organizations/cartel", label: "Organizations", icon: "🏛" },
  { href: "/businesses/los-pollos-hermanos", label: "Businesses", icon: "🏢" },
  { href: "/locations", label: "Locations", icon: "📍" },
  { href: "/deaths", label: "Deaths", icon: "💀" },
  { href: "/relationships/walter-white", label: "Relationships", icon: "🔗" },
  { href: "/drug-empire", label: "Drug Empire", icon: "⚗" },
  { href: "/legal", label: "Legal World", icon: "⚖" },
  { href: "/cartel", label: "Cartel", icon: "🌵" },
  { href: "/graph", label: "Universe Graph", icon: "🕸" },
];

export default function HomePage() {
  const searchItems = getAllSearchItems();
  const recent = getRecentEntities(6);
  const popular = getPopularCharacters(6);
  const featured = getFeaturedEpisode();
  const { nodes, edges } = buildUniverseGraph();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="text-heisenberg">Breaking Bad</span> Universe
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          A living knowledge graph — characters, episodes, timelines, locations,
          and every connection in between.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
          <GlobalSearch items={searchItems} placeholder="Search Characters..." />
          <GlobalSearch items={searchItems.filter((i) => i.type === "episode")} placeholder="Search Episodes..." />
          <GlobalSearch items={searchItems.filter((i) => i.type === "quote")} placeholder="Search Quotes..." />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {(["breaking-bad", "better-call-saul", "el-camino"] as const).map((s) => (
            <Link
              key={s}
              href={s === "breaking-bad" ? "/characters/walter-white" : s === "better-call-saul" ? "/characters/saul-goodman" : "/episodes/el-camino/ec-el-camino"}
              className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium transition-colors hover:border-heisenberg hover:text-heisenberg"
            >
              {SERIES_LABELS[s]}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Explore</h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {EXPLORE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-md"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-bold">Recent Discoveries</h2>
          <ul className="space-y-2">
            {recent.map((e) => (
              <li key={e.id}>
                <Link href={entityHref(e)} className="text-accent hover:underline">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-bold">Popular Characters</h2>
          <ul className="space-y-3">
            {popular.map((c) => (
              <li key={c.id}>
                <Link href={`/characters/${c.slug}`} className="flex items-center gap-3">
                  <CharacterPortrait character={c} size="sm" />
                  <span className="font-medium hover:text-accent">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-bold">Featured Episode</h2>
          {featured && (
            <Link href={entityHref(featured)} className="block">
              <p className="text-2xl font-bold">{featured.title}</p>
              <p className="text-sm text-muted">{featured.code}</p>
              <p className="mt-2 line-clamp-3 text-sm">{featured.synopsis}</p>
              {featured.imdbRating && (
                <p className="mt-2 text-sm text-pollos">IMDb {featured.imdbRating}/10</p>
              )}
            </Link>
          )}
        </section>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Interactive Universe Map</h2>
        <UniverseGraph nodes={nodes.slice(0, 30)} edges={edges.slice(0, 40)} height={400} />
        <Link href="/graph" className="mt-3 inline-block text-sm text-accent hover:underline">
          Open full universe graph →
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Latest Added Content</h2>
        <div className="flex flex-wrap gap-2">
          {recent.map((e) => (
            <Link
              key={e.id}
              href={entityHref(e)}
              className="rounded-full border border-border px-3 py-1 text-sm hover:border-accent"
            >
              {e.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
