import { notFound } from "next/navigation";
import Link from "next/link";
import { getCharacter } from "@/lib/content/loader";
import { getEntityById } from "@/lib/content/loader";
import { RelationshipNetwork } from "@/components/relationships/RelationshipNetwork";

export default async function RelationshipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const relsWithTargets = character.relationships.map((rel) => ({
    ...rel,
    targetTitle: getEntityById(rel.targetId)?.title ?? rel.targetId,
    targetSlug: getEntityById(rel.targetId)?.slug,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold">{character.name}&apos;s Network</h1>
      <p className="mt-2 text-muted">Interactive relationship network</p>
      <RelationshipNetwork characterName={character.name} relationships={relsWithTargets} />
      <Link href={`/characters/${character.slug}`} className="mt-8 inline-block text-accent hover:underline">
        ← Back to profile
      </Link>
    </div>
  );
}
