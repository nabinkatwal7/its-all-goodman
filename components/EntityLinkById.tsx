import { getEntityById } from "@/lib/content/loader";
import { getNeighbors } from "@/lib/graph/getNeighbors";
import { EntityLink } from "@/components/EntityLink";
import type { Entity } from "@/lib/schemas/entity";

export function EntityLinkById({
  id,
  ...props
}: { id: string } & Omit<React.ComponentProps<typeof EntityLink>, "entity" | "neighborTitles">) {
  const entity = getEntityById(id);
  if (!entity) return <span className="text-muted">{id}</span>;
  const neighborTitles = getNeighbors(id, 3).map((n) => n.title);
  return <EntityLink entity={entity} neighborTitles={neighborTitles} {...props} />;
}

export function EntityLinks({ entities }: { entities: Entity[] }) {
  return (
    <>
      {entities.map((e) => (
        <EntityLink key={e.id} entity={e} />
      ))}
    </>
  );
}
