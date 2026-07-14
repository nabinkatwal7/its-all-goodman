import { HomePageClient } from "@/components/immersive/HomePageClient";
import { buildUniverseGraph } from "@/lib/graph/buildGraph";
import { buildHomeGraph3D, buildOrbitNodes3D } from "@/lib/graph/buildGraph3d";
import {
  getRecentEntities,
  getPopularCharacters,
  getFeaturedEpisode,
} from "@/lib/content/loader";
import { getAllSearchItems } from "@/lib/search/index";

export default function HomePage() {
  const searchItems = getAllSearchItems();
  const recent = getRecentEntities(6);
  const popular = getPopularCharacters(8);
  const featured = getFeaturedEpisode() ?? null;
  const { nodes, edges } = buildUniverseGraph();
  const orbitNodes = buildOrbitNodes3D(8);
  const graph3d = buildHomeGraph3D(50);

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
      orbitNodes={orbitNodes}
      graph3d={graph3d}
      nodes={nodes}
      edges={edges}
    />
  );
}
