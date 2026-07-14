import Link from "next/link";
import { EntityLink } from "@/components/EntityLink";
import { EntityLinkById } from "@/components/EntityLinkById";
import { getNeighbors } from "@/lib/graph/getNeighbors";
import type { Entity } from "@/lib/schemas/entity";
import { entityHref } from "@/lib/schemas/entity";
import { TYPE_LABELS, cn } from "@/lib/utils";

type EntityPageProps = {
  entity: Entity;
  children?: React.ReactNode;
  sections?: { title: string; content: React.ReactNode }[];
};

export function EntityPage({ entity, children, sections = [] }: EntityPageProps) {
  const neighbors = getNeighbors(entity.id, 16);

  return (
    <article>
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-sm font-medium uppercase tracking-wider text-muted">
          {TYPE_LABELS[entity.type]}
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight">{entity.title}</h1>
        {entity.summary && (
          <p className="mt-3 max-w-2xl text-lg text-muted">{entity.summary}</p>
        )}
        {entity.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entity.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-heisenberg/10 px-3 py-0.5 text-xs text-heisenberg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {children}

      {sections.map(
        (section) =>
          section.content && (
            <section key={section.title} className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
              {section.content}
            </section>
          ),
      )}

      {neighbors.length > 0 && (
        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Connected to</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {neighbors.map((n) => (
              <Link
                key={n.id}
                href={entityHref(n)}
                className={cn(
                  "group rounded-lg border border-border p-4 transition-colors hover:border-accent hover:bg-background",
                )}
              >
                <span className="font-medium group-hover:text-accent">{n.title}</span>
                <p className="mt-1 text-xs text-muted">{TYPE_LABELS[n.type]}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <section className="mb-8">
      <h2 className="mb-4 border-l-4 border-heisenberg pl-3 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function DataGrid({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map(({ label, value }) =>
        value ? (
          <div key={label} className="rounded-lg bg-card p-3">
            <dt className="text-xs font-medium uppercase text-muted">{label}</dt>
            <dd className="mt-1">{value}</dd>
          </div>
        ) : null,
      )}
    </dl>
  );
}

export { EntityLinkById } from "@/components/EntityLinkById";
