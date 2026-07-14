import Link from "next/link";
import { entityHref, type Entity } from "@/lib/schemas/entity";
import { TYPE_LABELS } from "@/lib/utils";

type DatabaseListProps = {
  title: string;
  entities: Entity[];
  description?: string;
};

export function DatabaseList({ title, entities, description }: DatabaseListProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="mt-2 text-muted">{description}</p>}
      <p className="mt-1 text-sm text-muted">{entities.length} entries</p>

      <ul className="mt-6 divide-y divide-border">
        {entities.map((e) => (
          <li key={e.id} className="py-4">
            <Link href={entityHref(e)} className="group block">
              <div className="flex items-center justify-between">
                <span className="font-medium group-hover:text-accent">{e.title}</span>
                <span className="text-xs text-muted">{TYPE_LABELS[e.type]}</span>
              </div>
              {e.summary && (
                <p className="mt-1 line-clamp-2 text-sm text-muted">{e.summary}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
