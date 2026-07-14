import type { EntityType } from "@/lib/schemas/entity";

export const TYPE_LABELS: Record<EntityType, string> = {
  character: "Character",
  episode: "Episode",
  location: "Location",
  organization: "Organization",
  business: "Business",
  event: "Event",
  death: "Death",
  quote: "Quote",
  vehicle: "Vehicle",
  weapon: "Weapon",
  drug: "Drug",
  object: "Object",
  symbol: "Symbol",
  case: "Case",
};

export const SERIES_LABELS: Record<string, string> = {
  "breaking-bad": "Breaking Bad",
  "better-call-saul": "Better Call Saul",
  "el-camino": "El Camino",
};

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
