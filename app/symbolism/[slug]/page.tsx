import { notFound } from "next/navigation";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("symbol").map((s) => ({ slug: s.slug }));
}

export default async function SymbolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getEntitiesByType("symbol").find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <h1 className="text-4xl font-bold" style={{ color: s.color }}>{s.title}</h1>
      <ul className="mt-4 space-y-2">
        {s.appearances.map((a) => (
          <li key={a} className="rounded bg-card p-3">{a}</li>
        ))}
      </ul>
    </>
  );
}
