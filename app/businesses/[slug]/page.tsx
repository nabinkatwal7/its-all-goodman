import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { Section } from "@/components/EntityPage";
import { getBusiness, getEntitiesByType } from "@/lib/content/loader";
import { VisitTracker } from "@/components/VisitTracker";

export async function generateStaticParams() {
  return getEntitiesByType("business").map((b) => ({ slug: b.slug }));
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const biz = getBusiness(slug);
  if (!biz) notFound();

  return (
    <>
      <VisitTracker entityId={biz.id} />
      <h1 className="text-4xl font-bold">{biz.title}</h1>
      {biz.summary && <p className="mt-3 text-muted">{biz.summary}</p>}

      {biz.ownerIds.length > 0 && (
        <Section title="Owners">
          {biz.ownerIds.map((id) => <EntityLinkById key={id} id={id} />)}
        </Section>
      )}

      {biz.employeeIds.length > 0 && (
        <Section title="Employees">
          {biz.employeeIds.map((id) => <EntityLinkById key={id} id={id} />)}
        </Section>
      )}

      {biz.locationId && (
        <Section title="Location">
          <EntityLinkById id={biz.locationId} />
        </Section>
      )}

      {biz.history.length > 0 && (
        <Section title="History">
          <ul className="list-inside list-disc">{biz.history.map((h) => <li key={h}>{h}</li>)}</ul>
        </Section>
      )}
    </>
  );
}
