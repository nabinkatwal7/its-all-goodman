"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SpoilerLevel } from "@/lib/spoiler";

type NavEntry = { href: string; title: string };

export type UniverseMode = "breaking-bad" | "better-call-saul" | "el-camino";

type UniverseContextValue = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  universe: UniverseMode;
  setUniverse: (u: UniverseMode) => void;
  spoilerLevel: SpoilerLevel;
  setSpoilerLevel: (level: SpoilerLevel) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  visitedIds: string[];
  markVisited: (id: string) => void;
  navHistory: NavEntry[];
  pushNav: (entry: NavEntry) => void;
  navBack: () => NavEntry | null;
  navForward: () => NavEntry | null;
  sidePanelHref: string | null;
  openSidePanel: (href: string) => void;
  closeSidePanel: () => void;
  achievements: Record<string, boolean>;
  unlockAchievement: (id: string) => void;
  watchedBB: boolean;
  watchedBCS: boolean;
  setWatchedBB: (v: boolean) => void;
  setWatchedBCS: (v: boolean) => void;
};

const UniverseContext = createContext<UniverseContextValue | null>(null);

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function UniverseProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [spoilerLevel, setSpoilerLevelState] = useState<SpoilerLevel>("everything");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [navHistory, setNavHistory] = useState<NavEntry[]>([]);
  const [navIndex, setNavIndex] = useState(-1);
  const [sidePanelHref, setSidePanelHref] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Record<string, boolean>>({});
  const [watchedBB, setWatchedBBState] = useState(false);
  const [watchedBCS, setWatchedBCSState] = useState(false);
  const [universe, setUniverseState] = useState<UniverseMode>("breaking-bad");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTheme(loadJson("bbu-theme", "dark"));
    setSpoilerLevelState(loadJson("bbu-spoiler", "everything"));
    setFavorites(loadJson("bbu-favorites", []));
    setVisitedIds(loadJson("bbu-visited", []));
    setAchievements(loadJson("bbu-achievements", {}));
    setWatchedBBState(loadJson("bbu-watched-bb", false));
    setWatchedBCSState(loadJson("bbu-watched-bcs", false));
    setUniverseState(loadJson<UniverseMode>("bbu-universe", "breaking-bad"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.universe = universe;
    document.body.classList.toggle("scanlines", universe === "el-camino");
    localStorage.setItem("bbu-theme", JSON.stringify(theme));
  }, [theme, universe, hydrated]);

  const persist = useCallback((key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const setSpoilerLevel = useCallback(
    (level: SpoilerLevel) => {
      setSpoilerLevelState(level);
      persist("bbu-spoiler", level);
    },
    [persist],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        persist("bbu-favorites", next);
        return next;
      });
    },
    [persist],
  );

  const markVisited = useCallback(
    (id: string) => {
      setVisitedIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        persist("bbu-visited", next);
        if (next.length >= 100) {
          setAchievements((a) => {
            const updated = { ...a, found100: true };
            persist("bbu-achievements", updated);
            return updated;
          });
        }
        return next;
      });
    },
    [persist],
  );

  const pushNav = useCallback((entry: NavEntry) => {
    setNavHistory((prev) => {
      const trimmed = prev.slice(0, navIndex + 1);
      return [...trimmed, entry];
    });
    setNavIndex((i) => i + 1);
  }, [navIndex]);

  const navBack = useCallback(() => {
    if (navIndex <= 0) return null;
    const newIndex = navIndex - 1;
    setNavIndex(newIndex);
    return navHistory[newIndex] ?? null;
  }, [navIndex, navHistory]);

  const navForward = useCallback(() => {
    if (navIndex >= navHistory.length - 1) return null;
    const newIndex = navIndex + 1;
    setNavIndex(newIndex);
    return navHistory[newIndex] ?? null;
  }, [navIndex, navHistory]);

  const openSidePanel = useCallback((href: string) => setSidePanelHref(href), []);
  const closeSidePanel = useCallback(() => setSidePanelHref(null), []);

  const unlockAchievement = useCallback(
    (id: string) => {
      setAchievements((prev) => {
        if (prev[id]) return prev;
        const next = { ...prev, [id]: true };
        persist("bbu-achievements", next);
        return next;
      });
    },
    [persist],
  );

  const setWatchedBB = useCallback(
    (v: boolean) => {
      setWatchedBBState(v);
      persist("bbu-watched-bb", v);
      if (v) unlockAchievement("watched-bb");
    },
    [persist, unlockAchievement],
  );

  const setWatchedBCS = useCallback(
    (v: boolean) => {
      setWatchedBCSState(v);
      persist("bbu-watched-bcs", v);
      if (v) unlockAchievement("watched-bcs");
    },
    [persist, unlockAchievement],
  );

  const setUniverse = useCallback(
    (u: UniverseMode) => {
      setUniverseState(u);
      persist("bbu-universe", u);
    },
    [persist],
  );

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      universe,
      setUniverse,
      spoilerLevel,
      setSpoilerLevel,
      favorites,
      toggleFavorite,
      visitedIds,
      markVisited,
      navHistory: navHistory.slice(0, navIndex + 1),
      pushNav,
      navBack,
      navForward,
      sidePanelHref,
      openSidePanel,
      closeSidePanel,
      achievements,
      unlockAchievement,
      watchedBB,
      watchedBCS,
      setWatchedBB,
      setWatchedBCS,
    }),
    [
      theme,
      toggleTheme,
      universe,
      setUniverse,
      spoilerLevel,
      setSpoilerLevel,
      favorites,
      toggleFavorite,
      visitedIds,
      markVisited,
      navHistory,
      navIndex,
      pushNav,
      navBack,
      navForward,
      sidePanelHref,
      openSidePanel,
      closeSidePanel,
      achievements,
      unlockAchievement,
      watchedBB,
      watchedBCS,
      setWatchedBB,
      setWatchedBCS,
    ],
  );

  return (
    <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>
  );
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error("useUniverse must be used within UniverseProvider");
  return ctx;
}
