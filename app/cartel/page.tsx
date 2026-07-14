import Link from "next/link";
import { getEntitiesByType } from "@/lib/content/loader";

export const metadata = { title: "Cartel Hierarchy" };

const HIERARCHY = [
  "don-eladio",
  "bolsa-salamanca",
  "hector-salamanca",
  "tuco-salamanca",
  "lalo-salamanca",
  "the-twins",
];

export default function CartelPage() {
  const chars = getEntitiesByType("character");
  const cartel = getEntitiesByType("organization").find(
    (o) => o.slug === "cartel",
  );

  return (
    <div>
      <h1 className="text-3xl font-bold">Cartel Hierarchy</h1>
      {cartel?.summary && <p className="mt-2 text-muted">{cartel.summary}</p>}

      <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-2">
        {HIERARCHY.map((id, i) => {
          const c = chars.find((ch) => ch.id === id);
          if (!c) return null;
          return (
            <div key={id} className="flex flex-col items-center">
              <Link
                href={`/characters/${c.slug}`}
                className="rounded-xl border-2 border-red-800 bg-red-950/30 px-8 py-3 font-medium hover:border-red-500"
              >
                {c.title}
              </Link>
              {i < HIERARCHY.length - 1 && (
                <span className="my-1 text-muted">↓</span>
              )}
            </div>
          );
        })}
      </div>

      <Link
        href="/organizations/cartel"
        className="mt-8 inline-block text-accent hover:underline"
      >
        View Cartel organization →
      </Link>
    </div>
  );
}
