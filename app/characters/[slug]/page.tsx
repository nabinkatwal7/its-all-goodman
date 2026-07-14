import { notFound } from "next/navigation";
import Link from "next/link";
import { CharacterPortrait } from "@/components/Portrait";
import { EntityLinkById } from "@/components/EntityLink";
import { Section, DataGrid } from "@/components/EntityPage";
import {
  CharacterEvolutionSlider,
  StatsRadar,
  LifeTimeline,
  RelationshipMiniGraph,
  FavoriteButton,
} from "@/components/character/CharacterSections";
import { UniverseGraph } from "@/components/graph/UniverseGraph";
import { buildUniverseGraph } from "@/lib/graph/buildGraph";
import { getCharacter, getEntitiesByType } from "@/lib/content/loader";
import { getBiography } from "@/lib/content/biography";
import { SERIES_LABELS } from "@/lib/utils";
import { VisitTracker } from "@/components/VisitTracker";

export async function generateStaticParams() {
  return getEntitiesByType("character").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) return {};
  return { title: character.name };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const bio = getBiography(slug);
  const { nodes, edges } = buildUniverseGraph(character.id);

  return (
    <>
      <VisitTracker entityId={character.id} />

      <section className="mb-8 flex flex-wrap items-start gap-6">
        <CharacterPortrait character={character} size="xl" />
        <div className="flex-1">
          <p className="text-sm uppercase tracking-wider text-muted">Character</p>
          <h1 className="text-4xl font-bold">{character.name}</h1>
          {character.nicknames.length > 0 && (
            <p className="mt-1 text-muted">aka {character.nicknames.join(", ")}</p>
          )}
          <div className="mt-4">
            <FavoriteButton entityId={character.id} />
            <Link
              href={`/relationships/${character.slug}`}
              className="ml-2 rounded border border-border px-3 py-1 text-sm hover:bg-background"
            >
              View network →
            </Link>
          </div>
        </div>
      </section>

      <DataGrid
        items={[
          { label: "Status", value: <span className="capitalize">{character.status}</span> },
          { label: "Occupation", value: character.occupation },
          { label: "Appears in", value: character.appearsIn.map((s) => SERIES_LABELS[s]).join(", ") },
          { label: "First appearance", value: character.firstAppearance && <EntityLinkById id={character.firstAppearance} /> },
          { label: "Last appearance", value: character.lastAppearance && <EntityLinkById id={character.lastAppearance} /> },
          { label: "Age", value: character.age },
          { label: "Residence", value: character.residence },
        ]}
      />

      {bio && (
        <Section title="Biography">
          <div className="prose prose-invert max-w-none whitespace-pre-line leading-relaxed">
            {bio}
          </div>
        </Section>
      )}

      {character.lifeEvents.length > 0 && (
        <Section title="Timeline">
          <LifeTimeline events={character.lifeEvents} />
        </Section>
      )}

      {character.relationships.length > 0 && (
        <Section title="Relationships">
          <RelationshipMiniGraph character={character} />
          <UniverseGraph nodes={nodes} edges={edges} height={350} />
        </Section>
      )}

      {character.aliases.length > 0 && (
        <Section title="Known aliases">
          <div className="flex flex-wrap gap-2">
            {character.aliases.map((a) => (
              <span key={a} className="rounded-lg bg-card px-4 py-2 font-mono">{a}</span>
            ))}
          </div>
        </Section>
      )}

      {character.businessIds.length > 0 && (
        <Section title="Businesses">
          <ul className="list-inside list-disc space-y-1">
            {character.businessIds.map((id) => (
              <li key={id}><EntityLinkById id={id} /></li>
            ))}
          </ul>
        </Section>
      )}

      {character.organizationIds.length > 0 && (
        <Section title="Organizations">
          <ul className="list-inside list-disc space-y-1">
            {character.organizationIds.map((id) => (
              <li key={id}><EntityLinkById id={id} /></li>
            ))}
          </ul>
        </Section>
      )}

      {character.kills.length > 0 && (
        <Section title="Kills">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2">Victim</th>
                <th>Method</th>
                <th>Episode</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {character.kills.map((k) => (
                <tr key={k.victimId + k.episodeId} className="border-b border-border/50">
                  <td className="py-2"><EntityLinkById id={k.victimId} /></td>
                  <td>{k.method}</td>
                  <td><EntityLinkById id={k.episodeId} /></td>
                  <td>{k.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {character.crimes.length > 0 && (
        <Section title="Crimes">
          <div className="flex flex-wrap gap-2">
            {character.crimes.map((c) => (
              <span key={c} className="rounded bg-red-900/20 px-3 py-1 text-sm text-red-400">{c}</span>
            ))}
          </div>
        </Section>
      )}

      {character.quoteIds.length > 0 && (
        <Section title="Quotes">
          <ul className="space-y-3">
            {character.quoteIds.map((id) => (
              <li key={id} className="rounded-lg border border-border bg-card p-4">
                <EntityLinkById id={id} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {character.trivia.length > 0 && (
        <Section title="Trivia">
          <ul className="list-inside list-disc space-y-1 text-muted">
            {character.trivia.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      )}

      {character.episodeIds.length > 0 && (
        <Section title="Appearances">
          <ul className="grid gap-1 sm:grid-cols-2">
            {character.episodeIds.map((id) => (
              <li key={id}><EntityLinkById id={id} /></li>
            ))}
          </ul>
        </Section>
      )}

      {character.stats && (
        <Section title="Character Stats">
          <StatsRadar stats={character.stats} />
        </Section>
      )}

      {character.evolutionStages.length > 0 && (
        <Section title="Character Evolution">
          <CharacterEvolutionSlider character={character} />
        </Section>
      )}

      {character.familyIds.length > 0 && (
        <Section title="Family Tree">
          <div className="flex flex-wrap gap-3">
            {character.familyIds.map((id) => (
              <EntityLinkById key={id} id={id} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
