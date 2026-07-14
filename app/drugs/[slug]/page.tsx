import { notFound } from "next/navigation";
import { Section } from "@/components/EntityPage";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("drug").map((d) => ({ slug: d.slug }));
}

export default async function DrugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getEntitiesByType("drug").find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <h1 className="text-4xl font-bold">{d.title}</h1>
      {d.chemicalNotes && <Section title="Chemical notes"><p>{d.chemicalNotes}</p></Section>}
    </>
  );
}
