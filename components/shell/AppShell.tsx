"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { GlobalSearch } from "@/components/shell/GlobalSearch";
import { SidePanel } from "@/components/shell/SidePanel";
import { useUniverse } from "@/components/providers/UniverseProvider";
import { SPOILER_LEVELS } from "@/lib/spoiler";
import type { SearchResult } from "@/lib/search/index";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/characters/walter-white", label: "Characters" },
  { href: "/timeline", label: "Timeline" },
  { href: "/graph", label: "Graph" },
  { href: "/locations", label: "Locations" },
  { href: "/quotes", label: "Quotes" },
  { href: "/deaths", label: "Deaths" },
  { href: "/stats", label: "Stats" },
];

type AppShellProps = {
  children: React.ReactNode;
  searchItems: SearchResult[];
};

export function AppShell({ children, searchItems }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    theme,
    toggleTheme,
    spoilerLevel,
    setSpoilerLevel,
    navBack,
    navForward,
    pushNav,
    navHistory,
    sidePanelHref,
    closeSidePanel,
  } = useUniverse();

  useEffect(() => {
    const title = document.title.split(" · ")[0];
    if (title) pushNav({ href: pathname, title });
  }, [pathname]); // ponytail: intentionally omit pushNav to avoid re-push loops

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
            <span className="text-heisenberg">Breaking Bad</span>{" "}
            <span className="text-muted">Universe</span>
          </Link>

          <div className="min-w-[200px] flex-1">
            <GlobalSearch items={searchItems} compact />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const entry = navBack();
                if (entry) router.push(entry.href);
              }}
              disabled={navHistory.length <= 1}
              className="rounded px-2 py-1 text-sm text-muted hover:bg-background disabled:opacity-30"
              title="Back in graph"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                const entry = navForward();
                if (entry) router.push(entry.href);
              }}
              className="rounded px-2 py-1 text-sm text-muted hover:bg-background"
              title="Forward in graph"
            >
              →
            </button>
            <Link
              href="/random"
              className="rounded bg-pollos/20 px-3 py-1 text-sm font-medium text-pollos hover:bg-pollos/30"
            >
              Random
            </Link>
            <select
              value={spoilerLevel}
              onChange={(e) => setSpoilerLevel(e.target.value as typeof spoilerLevel)}
              className="rounded border border-border bg-background px-2 py-1 text-xs"
              title="Spoiler mode"
            >
              {SPOILER_LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded px-2 py-1 text-sm hover:bg-background"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                pathname.startsWith(link.href.split("/").slice(0, 2).join("/"))
                  ? "bg-heisenberg/20 text-heisenberg"
                  : "text-muted hover:bg-background hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {navHistory.length > 1 && (
        <div className="border-b border-border bg-background/50 px-4 py-1.5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 text-xs text-muted">
            {navHistory.slice(-5).map((entry, i) => (
              <span key={`${entry.href}-${i}`} className="flex items-center gap-1">
                {i > 0 && <span>/</span>}
                <Link href={entry.href} className="hover:text-accent">
                  {entry.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>

      <footer className="border-t border-border py-4 text-center text-xs text-muted">
        Breaking Bad Universe · Living knowledge graph · Fan project
      </footer>

      {sidePanelHref && (
        <SidePanel href={sidePanelHref} onClose={closeSidePanel} />
      )}
    </div>
  );
}
