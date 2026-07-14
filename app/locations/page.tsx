import { getEntitiesByType } from "@/lib/content/loader";
import { LocationMap, LocationList } from "@/components/locations/LocationMap";

export const metadata = { title: "Locations" };

export default function LocationsPage() {
  const locations = getEntitiesByType("location").map((l) => ({
    id: l.id,
    title: l.title,
    slug: l.slug,
    lat: l.lat,
    lng: l.lng,
    summary: l.summary,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold">Location Explorer</h1>
      <p className="mt-2 text-muted">Interactive map of Albuquerque and beyond</p>
      <div className="mt-6">
        <LocationMap locations={locations} />
      </div>
      <LocationList locations={locations} />
    </div>
  );
}
