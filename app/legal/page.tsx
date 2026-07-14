import Link from "next/link";
import { EntityLinkById } from "@/components/EntityLinkById";
import { getEntitiesByType } from "@/lib/content/loader";

export const metadata = { title: "Legal World" };

export default function LegalPage() {
  const lawyers = getEntitiesByType("character").filter(
    (c) => c.tags.includes("lawyer") || c.organizationIds.includes("hhmm"),
  );
  const cases = getEntitiesByType("case");

  return (
    <div>
      <h1 className="text-3xl font-bold">Legal World</h1>
      <p className="mt-2 text-muted">Jimmy, Kim, HHM, Mesa Verde, courthouse, cases</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Key figures</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {lawyers.map((l) => (
            <Link key={l.id} href={`/characters/${l.slug}`} className="rounded-lg border border-border px-4 py-2 hover:border-accent">
              {l.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Organizations</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/organizations/hhmm" className="text-accent hover:underline">HHM</Link>
          <Link href="/organizations/schweikart-cokely" className="text-accent hover:underline">Schweikart & Cokely</Link>
          <Link href="/organizations/davis-main" className="text-accent hover:underline">Davis & Main</Link>
          <Link href="/businesses/mesa-verde" className="text-accent hover:underline">Mesa Verde</Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Cases</h2>
        <ul className="mt-3 space-y-2">
          {cases.map((c) => (
            <li key={c.id} className="rounded border border-border p-3">
              <Link href={`/legal/${c.slug}`} className="font-medium hover:text-accent">{c.title}</Link>
              {c.outcome && <p className="text-sm text-muted">{c.outcome}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
