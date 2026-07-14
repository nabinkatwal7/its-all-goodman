import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { Section } from "@/components/EntityPage";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("vehicle").map((v) => ({ slug: v.slug }));
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getEntitiesByType("vehicle").find((x) => x.slug === slug);
  if (!v) notFound();
  return (
    <>
      <h1 className="text-4xl font-bold">{v.title}</h1>
      {v.ownerId && <Section title="Owner"><EntityLinkById id={v.ownerId} /></Section>}
      {v.history.length > 0 && <Section title="History"><ul>{v.history.map((h) => <li key={h}>{h}</li>)}</ul></Section>}
      {v.episodeIds.length > 0 && <Section title="Episodes">{v.episodeIds.map((id) => <EntityLinkById key={id} id={id} />)}</Section>}
    </>
  );
}
