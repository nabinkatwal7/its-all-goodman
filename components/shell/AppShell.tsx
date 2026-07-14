"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GlobalSearch } from "@/components/shell/GlobalSearch";
import { SidePanel } from "@/components/shell/SidePanel";
import { DesertHud } from "@/components/desert/DesertHud";
import { useUniverse } from "@/components/providers/UniverseProvider";
import { SPOILER_LEVELS } from "@/lib/spoiler";
import type { SearchResult } from "@/lib/search/index";
import { cn } from "@/lib/utils";

const DesertWorld = dynamic(
  () => import("@/components/desert/DesertWorld").then((m) => m.DesertWorld),
  { ssr: false },
);

const DesertOverlays = dynamic(
  () => import("@/components/desert/DesertOverlays").then((m) => m.DesertOverlays),
  { ssr: false },
);

const NAV_LINKS = [
  { href: "/graph", label: "Graph" },
  { href: "/timeline", label: "Timeline" },
  { href: "/locations", label: "Map" },
  { href: "/characters/walter-white", label: "Characters" },
  { href: "/quotes", label: "Quotes" },
  { href: "/cartel", label: "Cartel" },
  { href: "/random", label: "?" },
];

type AppShellProps = {
  children: React.ReactNode;
  searchItems: SearchResult[];
};

export function AppShell({ children, searchItems }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const {
    universe,
    setUniverse,
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
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <DesertWorld />
      <DesertOverlays />

      <header
        className={cn(
          "sticky top-0 z-40 transition-all",
          isHome
            ? "border-b border-transparent bg-gradient-to-b from-black/40 to-transparent"
            : "border-b border-border/30 bg-black/30 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link href="/" className="font-display shrink-0 text-2xl tracking-wider">
            <span className="text-heisenberg">BB</span>
            <span className="text-pollos">·</span>
            <span className="text-foreground">U</span>
          </Link>

          {!isHome && (
            <div className="hidden min-w-[180px] flex-1 md:block">
              <GlobalSearch items={searchItems} compact />
            </div>
          )}

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const entry = navBack();
                if (entry) router.push(entry.href);
              }}
              disabled={navHistory.length <= 1}
              className="rounded px-2 py-1 text-muted hover:text-accent disabled:opacity-20"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                const entry = navForward();
                if (entry) router.push(entry.href);
              }}
              className="rounded px-2 py-1 text-muted hover:text-accent"
            >
              →
            </button>

            <select
              value={universe}
              onChange={(e) => setUniverse(e.target.value as typeof universe)}
              className="hidden rounded border border-border/50 bg-black/40 px-2 py-1 font-display text-sm tracking-wide sm:block"
            >
              <option value="breaking-bad">Breaking Bad</option>
              <option value="better-call-saul">Better Call Saul</option>
              <option value="el-camino">El Camino</option>
            </select>

            <select
              value={spoilerLevel}
              onChange={(e) => setSpoilerLevel(e.target.value as typeof spoilerLevel)}
              className="max-w-[90px] rounded border border-border/50 bg-black/40 px-1 py-1 text-[10px] sm:max-w-none sm:text-xs"
            >
              {SPOILER_LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label.replace("Breaking Bad ", "BB ").replace("Better Call Saul ", "BCS ")}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded border border-border/50 px-2 py-1 font-display text-sm md:hidden"
            >
              MENU
            </button>
          </div>
        </div>

        <nav className="mx-auto hidden max-w-7xl gap-1 overflow-x-auto px-4 pb-2 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-sm px-3 py-1 font-display text-sm tracking-wider transition-colors",
                pathname.startsWith(link.href.split("/").slice(0, 2).join("/"))
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {menuOpen && (
          <nav className="border-t border-border/30 bg-black/50 px-4 py-3 md:hidden">
            <div className="mb-3">
              <GlobalSearch items={searchItems} compact />
            </div>
            <div className="flex flex-wrap gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-sm border border-border/50 px-3 py-1 font-display text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {navHistory.length > 1 && !isHome && (
        <div className="relative z-10 border-b border-border/20 bg-black/20 px-4 py-1 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 text-xs text-muted">
            {navHistory.slice(-5).map((entry, i) => (
              <span key={`${entry.href}-${i}`} className="flex items-center gap-1">
                {i > 0 && <span>·</span>}
                <Link href={entry.href} className="hover:text-accent">
                  {entry.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}

      <main className={cn("relative z-10 flex-1", isHome ? "px-0" : "mx-auto w-full max-w-7xl px-4 py-8")}>
        {isHome ? <div className="relative">{children}</div> : <DesertHud>{children}</DesertHud>}
      </main>

        <p className="font-display text-sm tracking-[0.25em] text-muted">
          {isHome ? "THE DESERT REMEMBERS EVERYTHING" : "IT'S ALL GOOD MAN · 34.5199° N 105.8701° W"}
        </p>
      </footer>

      {sidePanelHref && <SidePanel href={sidePanelHref} onClose={closeSidePanel} />}
    </div>
  );
}
