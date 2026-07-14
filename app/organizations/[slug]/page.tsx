import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { Section } from "@/components/EntityPage";
import { getOrganization, getEntitiesByType } from "@/lib/content/loader";
import { VisitTracker } from "@/components/VisitTracker";

export async function generateStaticParams() {
  return getEntitiesByType("organization").map((o) => ({ slug: o.slug }));
}

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const org = getOrganization(slug);
  if (!org) notFound();

  return (
    <>
      <VisitTracker entityId={org.id} />
      <h1 className="text-4xl font-bold">{org.title}</h1>
      {org.summary && <p className="mt-3 text-muted">{org.summary}</p>}

      {org.history.length > 0 && (
        <Section title="History">
          <ul className="list-inside list-disc">{org.history.map((h) => <li key={h}>{h}</li>)}</ul>
        </Section>
      )}

      {org.memberIds.length > 0 && (
        <Section title="Members">
          <div className="flex flex-wrap gap-2">
            {org.memberIds.map((id) => <EntityLinkById key={id} id={id} />)}
          </div>
        </Section>
      )}

      {org.locationIds.length > 0 && (
        <Section title="Locations">
          {org.locationIds.map((id) => <EntityLinkById key={id} id={id} />)}
        </Section>
      )}

      {org.businessIds.length > 0 && (
        <Section title="Businesses">
          {org.businessIds.map((id) => <EntityLinkById key={id} id={id} />)}
        </Section>
      )}

      {org.timelineEvents.length > 0 && (
        <Section title="Timeline">
          {org.timelineEvents.map((ev) => (
            <p key={ev.label}>{ev.year}: {ev.label}</p>
          ))}
        </Section>
      )}
    </>
  );
}
