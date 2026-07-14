"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { entityHref, type Entity } from "@/lib/schemas/entity";
import { useUniverse } from "@/components/providers/UniverseProvider";
import { Portrait, CharacterPortrait } from "@/components/Portrait";
import { TYPE_LABELS, cn } from "@/lib/utils";
import type { Character } from "@/lib/schemas/entity";

type EntityLinkProps = {
  entity: Entity;
  className?: string;
  children?: ReactNode;
  showType?: boolean;
  neighborTitles?: string[];
};

export function EntityLink({
  entity,
  className,
  children,
  showType,
  neighborTitles = [],
}: EntityLinkProps) {
  const { openSidePanel } = useUniverse();
  const [hover, setHover] = useState(false);
  const href = entityHref(entity);

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
        className={cn("text-accent underline-offset-2 hover:underline", className)}
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
          {neighborTitles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {neighborTitles.slice(0, 3).map((title) => (
                <span key={title} className="rounded bg-background px-1.5 py-0.5 text-xs">
                  {title}
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
