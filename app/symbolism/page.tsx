import { getEntitiesByType } from "@/lib/content/loader";
import Link from "next/link";
import { entityHref } from "@/lib/schemas/entity";

export const metadata = { title: "Symbolism" };

export default function SymbolismPage() {
  const symbols = getEntitiesByType("symbol");

  return (
    <div>
      <h1 className="text-3xl font-bold">Symbolism Explorer</h1>
      <p className="mt-2 text-muted">Color symbolism tracked across the universe</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {symbols.map((s) => (
          <Link
            key={s.id}
            href={entityHref(s)}
            className="rounded-xl border border-border p-6 transition-colors hover:border-accent"
            style={{ borderLeftColor: s.color ?? undefined, borderLeftWidth: 4 }}
          >
            <h2 className="text-xl font-bold">{s.title}</h2>
            {s.appearances.length > 0 && (
              <ul className="mt-2 text-sm text-muted">
                {s.appearances.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
