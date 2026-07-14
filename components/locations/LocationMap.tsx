"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";

type MapLocation = {
  id: string;
  title: string;
  slug: string;
  lat: number;
  lng: number;
  summary?: string;
};

export function LocationMap({ locations }: { locations: MapLocation[] }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap",
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
      center: [-106.6504, 35.0844],
      zoom: 10,
    });

    mapRef.current = map;

    for (const loc of locations) {
      const el = document.createElement("a");
      el.href = `/locations/${loc.slug}`;
      el.className = "flex h-8 w-8 items-center justify-center rounded-full bg-heisenberg text-xs font-bold text-white shadow-lg";
      el.textContent = "📍";

      new maplibregl.Marker({ element: el })
        .setLngLat([loc.lng, loc.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<strong>${loc.title}</strong><br/><a href="/locations/${loc.slug}">View →</a>`,
          ),
        )
        .addTo(map);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [locations]);

  return (
    <div ref={mapContainer} className="h-[500px] w-full rounded-xl border border-border" />
  );
}

export function LocationList({ locations }: { locations: MapLocation[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {locations.map((loc) => (
        <li key={loc.id}>
          <Link
            href={`/locations/${loc.slug}`}
            className="block rounded-lg border border-border p-4 hover:border-accent"
          >
            <p className="font-medium">{loc.title}</p>
            {loc.summary && <p className="mt-1 text-sm text-muted">{loc.summary}</p>}
            <p className="mt-1 font-mono text-xs text-muted">
              {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
