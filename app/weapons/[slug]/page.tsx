import { notFound } from "next/navigation";
import { Section } from "@/components/EntityPage";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("weapon").map((w) => ({ slug: w.slug }));
}

export default async function WeaponPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getEntitiesByType("weapon").find((x) => x.slug === slug);
  if (!w) notFound();
  return (
    <>
      <h1 className="text-4xl font-bold">{w.title}</h1>
      {w.usageHistory.length > 0 && (
        <Section title="Usage history">
          <ul className="list-inside list-disc">{w.usageHistory.map((h) => <li key={h}>{h}</li>)}</ul>
        </Section>
      )}
    </>
  );
}
