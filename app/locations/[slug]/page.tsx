import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { Section, DataGrid } from "@/components/EntityPage";
import { getLocation, getEntitiesByType } from "@/lib/content/loader";
import { VisitTracker } from "@/components/VisitTracker";

export async function generateStaticParams() {
  return getEntitiesByType("location").map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return { title: loc.title };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <>
      <VisitTracker entityId={loc.id} />
      <h1 className="text-4xl font-bold">{loc.title}</h1>
      {loc.summary && <p className="mt-3 text-lg text-muted">{loc.summary}</p>}

      <DataGrid
        items={[
          { label: "Coordinates", value: `${loc.lat}, ${loc.lng}` },
          { label: "Address", value: loc.address },
        ]}
      />

      {loc.history.length > 0 && (
        <Section title="History">
          <ul className="list-inside list-disc space-y-1">
            {loc.history.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Section>
      )}

      {loc.characterIds.length > 0 && (
        <Section title="Characters">
          {loc.characterIds.map((id) => (
            <EntityLinkById key={id} id={id} />
          ))}
        </Section>
      )}

      {loc.episodeIds.length > 0 && (
        <Section title="Episodes">
          {loc.episodeIds.map((id) => (
            <EntityLinkById key={id} id={id} />
          ))}
        </Section>
      )}
    </>
  );
}
