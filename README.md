# Breaking Bad Universe

A living knowledge graph for the Breaking Bad / Better Call Saul / El Camino universe.

## Features

- **Knowledge graph** — characters, episodes, locations, orgs, and cross-links
- **Universe graph** — Obsidian-style interactive graph (React Flow)
- **Timeline explorer** — horizontal scroll from 1958 to Gene
- **Location map** — MapLibre + OpenStreetMap pins for Albuquerque
- **Deep profiles** — Walt-level character pages with stats, kills, evolution slider
- **Databases** — quotes, deaths, vehicles, weapons, drugs, objects, symbolism
- **Compare & stats** — side-by-side character comparison, dashboard
- **Achievements** — localStorage badges for exploration
- **Spoiler mode** — season-by-season cutoff
- **Side panel** — Ctrl+Click any link to browse without leaving the page

## Stack

Next.js 16 · TypeScript · Tailwind CSS · Zod · React Flow · MapLibre · Fuse.js · Framer Motion

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Entity data lives in `content/` as typed JSON. Edit or add files, then rebuild.

```bash
node scripts/seed-content.mjs   # regenerate sample content
npm run build
```

Biographies: `content/biographies/*.md`

## Project structure

```
app/           # routes
components/    # UI, graph, shell
content/       # JSON entity data
lib/schemas/   # Zod validation
lib/graph/     # graph builder
lib/search/    # Fuse index
```
