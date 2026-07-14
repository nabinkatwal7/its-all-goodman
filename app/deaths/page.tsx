import { getEntitiesByType, getEntityById } from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";
import { DeathsDatabase } from "@/components/databases/DeathsDatabase";

export const metadata = { title: "Deaths" };

export default function DeathsPage() {
  const deaths = getEntitiesByType("death").map((d) => {
    const killer = d.killerId ? getEntityById(d.killerId) : undefined;
    const episode = getEntityById(d.episodeId);
    return {
      id: d.id,
      href: entityHref(d),
      title: d.title,
      method: d.method,
      killer: killer ? { title: killer.title, href: entityHref(killer) } : undefined,
      episode: {
        title: episode?.title ?? d.episodeId,
        href: episode ? entityHref(episode) : "#",
      },
    };
  });

  return <DeathsDatabase deaths={deaths} />;
}
