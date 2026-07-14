import { HomePageClient } from "@/components/immersive/HomePageClient";
import { buildUniverseGraph } from "@/lib/graph/buildGraph";
import {
  getRecentEntities,
  getPopularCharacters,
  getFeaturedEpisode,
} from "@/lib/content/loader";
import { getAllSearchItems } from "@/lib/search/index";

export default function HomePage() {
  const searchItems = getAllSearchItems();
  const recent = getRecentEntities(6);
  const popular = getPopularCharacters(6);
  const featured = getFeaturedEpisode() ?? null;
  const { nodes, edges } = buildUniverseGraph();

  const orbitChars = popular.slice(0, 6).map((c) => ({
    slug: c.slug,
    name: c.name,
    color: c.portraitColor,
  }));

  return (
    <HomePageClient
      searchItems={searchItems}
      recent={recent}
      featured={
        featured
          ? {
              title: featured.title,
              code: featured.code,
              synopsis: featured.synopsis,
              imdbRating: featured.imdbRating,
              slug: featured.slug,
              series: featured.series,
            }
          : null
      }
      orbitChars={orbitChars}
      nodes={nodes}
      edges={edges}
    />
  );
}
