"use client";

import { UniverseGraph } from "@/components/graph/UniverseGraph";
import { DesertPanel, DesertSection } from "@/components/desert/DesertHud";
import { entityHref } from "@/lib/schemas/entity";
import type { SearchResult } from "@/lib/search/index";
import type { Edge, Node } from "@xyflow/react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImmersiveHero = dynamic(
  () =>
    import("@/components/immersive/ImmersiveHero").then((m) => m.ImmersiveHero),
  { ssr: false },
);

const ExploreGrid = dynamic(
  () => import("@/components/immersive/ExploreGrid").then((m) => m.ExploreGrid),
  { ssr: false },
);

const FloatingCharacterOrbit = dynamic(
  () =>
    import("@/components/immersive/ExploreGrid").then(
      (m) => m.FloatingCharacterOrbit,
    ),
  { ssr: false },
);

const EXPLORE = [
  {
    href: "/characters/walter-white",
    label: "Characters",
    tag: "He",
    color: "#7cfc00",
  },
  { href: "/timeline", label: "Timeline", tag: "Ti", color: "#f5c518" },
  {
    href: "/episodes/breaking-bad/ozymandias",
    label: "Episodes",
    tag: "Ep",
    color: "#4fc3f7",
  },
  { href: "/graph", label: "Universe Graph", tag: "Gr", color: "#7cfc00" },
  { href: "/locations", label: "Albuquerque", tag: "Ab", color: "#c4854c" },
  {
    href: "/organizations/cartel",
    label: "Cartel",
    tag: "Ca",
    color: "#ef4444",
  },
  { href: "/drug-empire", label: "Drug Empire", tag: "Dm", color: "#4fc3f7" },
  { href: "/legal", label: "Legal World", tag: "Lw", color: "#f5c518" },
  { href: "/deaths", label: "Deaths", tag: "Dx", color: "#991b1b" },
  { href: "/quotes", label: "Quotes", tag: "Qu", color: "#e5e5e5" },
  {
    href: "/relationships/walter-white",
    label: "Connections",
    tag: "Cn",
    color: "#7cfc00",
  },
  {
    href: "/compare?a=walter-white&b=gustavo-fring",
    label: "Compare",
    tag: "Vs",
    color: "#f5c518",
  },
];

type HomeClientProps = {
  searchItems: SearchResult[];
  recent: {
    id: string;
    title: string;
    slug: string;
    type: string;
    series: string[];
  }[];
  featured: {
    title: string;
    code: string;
    synopsis?: string;
    imdbRating?: number;
    slug: string;
    series: string[];
  } | null;
  orbitChars: { slug: string; name: string; color: string }[];
  nodes: Node[];
  edges: Edge[];
};

export function HomePageClient({
  searchItems,
  recent,
  featured,
  orbitChars,
  nodes,
  edges,
}: HomeClientProps) {
  return (
    <div className="w-full">
      <ImmersiveHero searchItems={searchItems} />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 pb-24">
        <DesertPanel className="mx-auto max-w-2xl">
          <DesertSection title="WHO'S IN THE GAME" subtitle="Hover · click to enter">
            <FloatingCharacterOrbit characters={orbitChars} />
          </DesertSection>
        </DesertPanel>

        <DesertPanel>
          <DesertSection title="EXPLORE" subtitle="Every node leads somewhere">
            <ExploreGrid items={EXPLORE} />
          </DesertSection>
        </DesertPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="universe-card rounded-sm p-6">
            <h2 className="font-display text-2xl tracking-wider text-pollos">FEATURED</h2>
            {featured && (
              <Link
                href={`/episodes/${featured.series[0]}/${featured.slug}`}
                className="group mt-4 block"
              >
                <p className="font-display text-5xl leading-none text-foreground transition-colors group-hover:text-heisenberg">
                  {featured.title.toUpperCase()}
                </p>
                <p className="mt-1 text-sm text-muted">{featured.code}</p>
                <p className="text-readable mt-3 line-clamp-3 text-sm">{featured.synopsis}</p>
                {featured.imdbRating && (
                  <p className="mt-3 font-display text-xl text-pollos">
                    {featured.imdbRating}/10
                  </p>
                )}
              </Link>
            )}
          </div>

          <div className="universe-card rounded-sm p-6">
            <h2 className="font-display text-2xl tracking-wider text-foreground">
              RECENT DISCOVERIES
            </h2>
            <ul className="mt-4 space-y-1">
              {recent.map((e) => (
                <li key={e.id}>
                  <Link
                    href={entityHref(e as Parameters<typeof entityHref>[0])}
                    className="flex items-center justify-between border-b border-border py-2.5 text-sm text-foreground-soft hover:text-accent"
                  >
                    <span>{e.title}</span>
                    <span className="text-muted">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DesertPanel>
          <DesertSection title="THE GRAPH" subtitle="Drag · zoom · click">
            <div className="universe-card overflow-hidden rounded-sm">
              <UniverseGraph
                nodes={nodes.slice(0, 35)}
                edges={edges.slice(0, 45)}
                height={450}
              />
            </div>
            <Link
              href="/graph"
              className="mt-4 inline-block font-display text-lg tracking-wider text-accent hover:underline"
            >
              ENTER FULL UNIVERSE →
            </Link>
          </DesertSection>
        </DesertPanel>
      </div>
    </div>
  );
}
