import { notFound } from "next/navigation";
import { EntityLinkById } from "@/components/EntityLinkById";
import { getEntitiesByType } from "@/lib/content/loader";

export async function generateStaticParams() {
  return getEntitiesByType("death").map((d) => ({ slug: d.slug }));
}

export default async function DeathDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const death = getEntitiesByType("death").find((d) => d.slug === slug);
  if (!death) notFound();

  return (
    <article>
      <h1 className="text-4xl font-bold">{death.title}</h1>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div><dt className="text-xs text-muted">Victim</dt><dd><EntityLinkById id={death.victimId} /></dd></div>
        <div><dt className="text-xs text-muted">Killer</dt><dd>{death.killerId ? <EntityLinkById id={death.killerId} /> : "Unknown"}</dd></div>
        <div><dt className="text-xs text-muted">Method</dt><dd>{death.method}</dd></div>
        <div><dt className="text-xs text-muted">Episode</dt><dd><EntityLinkById id={death.episodeId} /></dd></div>
        {death.reason && <div><dt className="text-xs text-muted">Reason</dt><dd>{death.reason}</dd></div>}
      </dl>
    </article>
  );
}
