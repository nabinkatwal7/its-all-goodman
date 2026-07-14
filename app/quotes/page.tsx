import { getEntitiesByType, getEntityById } from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";
import { QuotesDatabase } from "@/components/databases/QuotesDatabase";

export const metadata = { title: "Quotes" };

export default function QuotesPage() {
  const quotes = getEntitiesByType("quote").map((q) => ({
    id: q.id,
    href: entityHref(q),
    text: q.text,
    context: q.context,
    tags: q.tags,
    speaker: {
      title: getEntityById(q.speakerId)?.title ?? q.speakerId,
      href: getEntityById(q.speakerId) ? entityHref(getEntityById(q.speakerId)!) : "#",
    },
    episode: {
      title: getEntityById(q.episodeId)?.title ?? q.episodeId,
      href: getEntityById(q.episodeId) ? entityHref(getEntityById(q.episodeId)!) : "#",
    },
  }));

  return <QuotesDatabase quotes={quotes} />;
}
