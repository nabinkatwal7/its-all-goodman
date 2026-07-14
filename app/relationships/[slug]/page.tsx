"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { getCharacter } from "@/lib/content/loader";
import { getEntityById } from "@/lib/content/loader";
import type { RelationshipKind } from "@/lib/schemas/entity";

const KIND_GROUPS: { label: string; kinds: RelationshipKind[] }[] = [
  { label: "Friends", kinds: ["friend", "ally"] },
  { label: "Enemies", kinds: ["enemy", "rival"] },
  { label: "Business Partners", kinds: ["partner", "business"] },
  { label: "Family", kinds: ["family"] },
  { label: "Students", kinds: ["student"] },
  { label: "Victims", kinds: ["victim"] },
  { label: "Employers", kinds: ["employer", "employee"] },
];

export default function RelationshipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const character = getCharacter(slug);
  if (!character) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold">{character.name}&apos;s Network</h1>
      <p className="mt-2 text-muted">Interactive relationship network</p>

      <div className="mt-8 flex justify-center">
        <motion.div
          className="rounded-full bg-heisenberg/20 px-8 py-4 text-xl font-bold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {character.name}
        </motion.div>
      </div>

      {KIND_GROUPS.map(({ label, kinds }) => {
        const rels = character.relationships.filter((r) => kinds.includes(r.kind));
        if (rels.length === 0) return null;
        return (
          <section key={label} className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">{label}</h2>
            <div className="flex flex-wrap gap-3">
              {rels.map((rel) => {
                const target = getEntityById(rel.targetId);
                return (
                  <motion.div
                    key={rel.targetId + rel.kind}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Link
                      href={target ? `/characters/${target.slug}` : "#"}
                      className="block rounded-xl border-2 border-border bg-card px-5 py-3 hover:border-accent"
                    >
                      <p className="font-medium">{target?.title ?? rel.targetId}</p>
                      <p className="text-xs text-muted">{rel.label ?? rel.kind}</p>
                    </Link>
                    <motion.div
                      className="absolute -top-1 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-heisenberg"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}

      <Link
        href={`/characters/${character.slug}`}
        className="mt-8 inline-block text-accent hover:underline"
      >
        ← Back to profile
      </Link>
    </div>
  );
}
