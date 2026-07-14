import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { Section } from "@/components/EntityPage";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("object").map((o) => ({ slug: o.slug }));
}

export default async function ObjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = getEntitiesByType("object").find((x) => x.slug === slug);
  if (!o) notFound();
  return (
    <>
      <h1 className="text-4xl font-bold">{o.title}</h1>
      {o.meaning && <Section title="Meaning"><p>{o.meaning}</p></Section>}
      {o.symbolism && <Section title="Symbolism"><p>{o.symbolism}</p></Section>}
      {o.episodeIds.length > 0 && (
        <Section title="Appears in">{o.episodeIds.map((id) => <EntityLinkById key={id} id={id} />)}</Section>
      )}
    </>
  );
}
