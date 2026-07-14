"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

type Rel = {
  targetId: string;
  kind: RelationshipKind;
  label?: string;
  targetTitle: string;
  targetSlug?: string;
};

export function RelationshipNetwork({
  characterName,
  relationships,
}: {
  characterName: string;
  relationships: Rel[];
}) {
  return (
    <>
      <div className="mt-8 flex justify-center">
        <motion.div
          className="rounded-full bg-heisenberg/20 px-8 py-4 text-xl font-bold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {characterName}
        </motion.div>
      </div>

      {KIND_GROUPS.map(({ label, kinds }) => {
        const rels = relationships.filter((r) => kinds.includes(r.kind));
        if (rels.length === 0) return null;
        return (
          <section key={label} className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">{label}</h2>
            <div className="flex flex-wrap gap-3">
              {rels.map((rel) => (
                <motion.div key={rel.targetId + rel.kind} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={rel.targetSlug ? `/characters/${rel.targetSlug}` : "#"}
                    className="block rounded-xl border-2 border-border bg-card px-5 py-3 hover:border-accent"
                  >
                    <p className="font-medium">{rel.targetTitle}</p>
                    <p className="text-xs text-muted">{rel.label ?? rel.kind}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
