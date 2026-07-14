"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { getEntityById } from "@/lib/content/loader";
import { entityHref, type Entity } from "@/lib/schemas/entity";
import { getNeighbors } from "@/lib/graph/getNeighbors";
import { useUniverse } from "@/components/providers/UniverseProvider";
import { Portrait, CharacterPortrait } from "@/components/Portrait";
import { TYPE_LABELS, cn } from "@/lib/utils";
import type { Character } from "@/lib/schemas/entity";

type EntityLinkProps = {
  entity: Entity;
  className?: string;
  children?: ReactNode;
  showType?: boolean;
};

export function EntityLink({ entity, className, children, showType }: EntityLinkProps) {
  const { openSidePanel } = useUniverse();
  const [hover, setHover] = useState(false);
  const href = entityHref(entity);
  const neighbors = getNeighbors(entity.id, 3);

  const handleClick = (e: MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      openSidePanel(href);
    }
  };

  return (
    <span
      className="relative inline"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          "text-accent underline-offset-2 hover:underline",
          className,
        )}
      >
        {children ?? entity.title}
        {showType && (
          <span className="ml-1 text-xs text-muted">({TYPE_LABELS[entity.type]})</span>
        )}
      </Link>

      {hover && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border bg-card p-3 shadow-xl">
          <div className="flex items-center gap-3">
            {entity.type === "character" ? (
              <CharacterPortrait character={entity as Character} size="sm" />
            ) : (
              <Portrait name={entity.title} size="sm" />
            )}
            <div>
              <p className="font-semibold">{entity.title}</p>
              <p className="text-xs text-muted">{TYPE_LABELS[entity.type]}</p>
              {"status" in entity && entity.status && (
                <p className="text-xs capitalize text-muted">{entity.status}</p>
              )}
            </div>
          </div>
          {entity.summary && (
            <p className="mt-2 line-clamp-2 text-xs text-muted">{entity.summary}</p>
          )}
          {neighbors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {neighbors.slice(0, 3).map((n) => (
                <span
                  key={n.id}
                  className="rounded bg-background px-1.5 py-0.5 text-xs"
                >
                  {n.title}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-[10px] text-muted">Ctrl+Click to open in panel</p>
        </div>
      )}
    </span>
  );
}

export function EntityLinkById({ id, ...props }: { id: string } & Omit<EntityLinkProps, "entity">) {
  const entity = getEntityById(id);
  if (!entity) return <span className="text-muted">{id}</span>;
  return <EntityLink entity={entity} {...props} />;
}
