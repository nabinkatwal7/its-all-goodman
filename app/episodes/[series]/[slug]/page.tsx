import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { Section, DataGrid } from "@/components/EntityPage";
import { getEpisode, getEntitiesByType } from "@/lib/content/loader";
import { SERIES_LABELS } from "@/lib/utils";
import { VisitTracker } from "@/components/VisitTracker";

export async function generateStaticParams() {
  return getEntitiesByType("episode").flatMap((e) =>
    e.series.map((s) => ({ series: s, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string; slug: string }>;
}) {
  const { series, slug } = await params;
  const episode = getEpisode(series, slug);
  if (!episode) return {};
  return { title: `${episode.code} ${episode.title}` };
}

function SceneTimeline({ beats }: { beats: { timestamp: string; label: string; description?: string }[] }) {
  if (beats.length === 0) return null;
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-0">
        {beats.map((beat, i) => (
          <div key={beat.timestamp} className="flex items-start">
            <div className="w-40 shrink-0 text-center">
              <p className="font-mono text-xs text-pollos">{beat.timestamp}</p>
              <p className="mt-1 text-sm font-medium">{beat.label}</p>
              {beat.description && (
                <p className="mt-1 text-xs text-muted">{beat.description}</p>
              )}
            </div>
            {i < beats.length - 1 && (
              <div className="flex flex-col items-center px-2 pt-4 text-muted">↓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ series: string; slug: string }>;
}) {
  const { series, slug } = await params;
  const episode = getEpisode(series, slug);
  if (!episode) notFound();

  return (
    <>
      <VisitTracker entityId={episode.id} />

      <header className="mb-8">
        <p className="text-sm text-muted">{SERIES_LABELS[series] ?? series}</p>
        <h1 className="text-4xl font-bold">
          {episode.code} · {episode.title}
        </h1>
        {episode.synopsis && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{episode.synopsis}</p>
        )}
      </header>

      <DataGrid
        items={[
          { label: "Runtime", value: episode.runtime ? `${episode.runtime} min` : null },
          { label: "Director", value: episode.director },
          { label: "Writer", value: episode.writer },
          { label: "IMDb rating", value: episode.imdbRating ? `${episode.imdbRating}/10` : null },
          { label: "Timeline", value: episode.timelineYear },
        ]}
      />

      {episode.sceneTimeline.length > 0 && (
        <Section title="Interactive Scene Timeline">
          <SceneTimeline beats={episode.sceneTimeline} />
        </Section>
      )}

      {episode.characterIds.length > 0 && (
        <Section title="Characters">
          <div className="flex flex-wrap gap-2">
            {episode.characterIds.map((id) => (
              <EntityLinkById key={id} id={id} />
            ))}
          </div>
        </Section>
      )}

      {episode.deathIds.length > 0 && (
        <Section title="Deaths">
          {episode.deathIds.map((id) => (
            <EntityLinkById key={id} id={id} />
          ))}
        </Section>
      )}

      {episode.locationIds.length > 0 && (
        <Section title="Locations">
          {episode.locationIds.map((id) => (
            <EntityLinkById key={id} id={id} />
          ))}
        </Section>
      )}

      {episode.quoteIds.length > 0 && (
        <Section title="Quotes">
          {episode.quoteIds.map((id) => (
            <div key={id} className="mb-2 rounded border border-border p-3">
              <EntityLinkById id={id} />
            </div>
          ))}
        </Section>
      )}

      {episode.objectIds.length > 0 && (
        <Section title="Important objects">
          {episode.objectIds.map((id) => (
            <EntityLinkById key={id} id={id} />
          ))}
        </Section>
      )}

      {[
        { title: "References", items: episode.references },
        { title: "Callbacks", items: episode.callbacks },
        { title: "Foreshadowing", items: episode.foreshadowing },
        { title: "Continuity", items: episode.continuity },
        { title: "Behind the scenes", items: episode.behindTheScenes },
        { title: "Best scenes", items: episode.bestScenes },
        { title: "Future consequences", items: episode.consequences },
      ].map(
        ({ title, items }) =>
          items.length > 0 && (
            <Section key={title} title={title}>
              <ul className="list-inside list-disc space-y-1">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          ),
      )}

      {(episode.references.length > 0 ||
        episode.callbacks.length > 0 ||
        episode.foreshadowing.length > 0 ||
        episode.consequences.length > 0) && (
        <Section title="Episode Connections">
          <div className="flex flex-wrap gap-4 text-sm">
            {episode.references.length > 0 && <span>References →</span>}
            {episode.callbacks.length > 0 && <span>Callbacks →</span>}
            {episode.foreshadowing.length > 0 && <span>Foreshadowing →</span>}
            {episode.consequences.length > 0 && <span>Future consequences</span>}
          </div>
        </Section>
      )}
    </>
  );
}
