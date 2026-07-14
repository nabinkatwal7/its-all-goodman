import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("case").map((c) => ({ slug: c.slug }));
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getEntitiesByType("case").find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <h1 className="text-4xl font-bold">{c.title}</h1>
      {c.outcome && <p className="mt-2 text-muted">Outcome: {c.outcome}</p>}
      {c.lawyerIds.length > 0 && (
        <div className="mt-4">Lawyers: {c.lawyerIds.map((id) => <EntityLinkById key={id} id={id} />)}</div>
      )}
    </>
  );
}
