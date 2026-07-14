export const TYPE_COLORS: Record<string, string> = {
  character: "#2d5016",
  episode: "#c4a035",
  location: "#8b4513",
  organization: "#1a365d",
  business: "#d4a017",
  death: "#7f1d1d",
  quote: "#4a5568",
  object: "#ec4899",
  vehicle: "#64748b",
  weapon: "#991b1b",
  drug: "#059669",
  event: "#7c3aed",
  symbol: "#a855f7",
  case: "#0369a1",
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? "#64748b";
}
