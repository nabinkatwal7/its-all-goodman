import { getAllEntities, getEntityById } from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";
import { TimelineExplorer } from "@/components/timeline/TimelineExplorer";

export const metadata = { title: "Timeline Explorer" };

function buildTimelineEvents() {
  const events: {
    year: number;
    label: string;
    href?: string;
    series?: string;
    entityId?: string;
  }[] = [
    { year: 1958, label: "Birth of Walter White", entityId: "walter-white" },
    { year: 1960, label: "Birth of Jesse Pinkman", entityId: "jesse-pinkman" },
    { year: 1985, label: "Gray Matter founded", entityId: "gray-matter" },
    { year: 2002, label: "Jimmy becomes lawyer", entityId: "saul-goodman" },
    { year: 2003, label: "Chicanery hearing", entityId: "bcs-chicanery", series: "better-call-saul" },
    { year: 2008, label: "Breaking Bad begins", entityId: "bb-pilot", series: "breaking-bad" },
    { year: 2010, label: "Ozymandias", entityId: "ozymandias", series: "breaking-bad" },
    { year: 2010, label: "El Camino", entityId: "ec-el-camino", series: "el-camino" },
    { year: 2012, label: "Gene timeline (Omaha)", entityId: "saul-goodman" },
  ];

  for (const e of getAllEntities()) {
    if (e.type === "event" && "year" in e) {
      events.push({ year: e.year, label: e.title, entityId: e.id });
    }
    if (e.type === "character") {
      for (const le of e.lifeEvents) {
        events.push({
          year: le.year,
          label: `${e.name}: ${le.label}`,
          entityId: le.entityId ?? e.id,
        });
      }
    }
  }

  return events
    .sort((a, b) => a.year - b.year)
    .map((ev) => {
      const entity = ev.entityId ? getEntityById(ev.entityId) : null;
      return {
        year: ev.year,
        label: ev.label,
        href: entity ? entityHref(entity) : undefined,
        series: ev.series,
        entityId: ev.entityId,
      };
    });
}

export default function TimelinePage() {
  const events = buildTimelineEvents();
  const characters = getAllEntities()
    .filter((e) => e.type === "character")
    .map((c) => ({ id: c.id, title: c.title }));

  return <TimelineExplorer events={events} characters={characters} />;
}
