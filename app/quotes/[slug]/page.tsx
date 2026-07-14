import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("quote").map((q) => ({ slug: q.slug }));
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quote = getEntitiesByType("quote").find((q) => q.slug === slug);
  if (!quote) notFound();

  return (
    <article>
      <blockquote className="text-3xl font-bold">&ldquo;{quote.text}&rdquo;</blockquote>
      <p className="mt-4 text-muted">
        <EntityLinkById id={quote.speakerId} /> · <EntityLinkById id={quote.episodeId} />
      </p>
      {quote.context && <p className="mt-4">{quote.context}</p>}
      <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-muted">
        Video clip placeholder
      </div>
    </article>
  );
}
