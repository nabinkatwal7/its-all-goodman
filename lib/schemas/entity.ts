import { z } from "zod";

export const seriesSchema = z.enum([
  "breaking-bad",
  "better-call-saul",
  "el-camino",
]);
export type Series = z.infer<typeof seriesSchema>;

export const entityTypeSchema = z.enum([
  "character",
  "episode",
  "location",
  "organization",
  "business",
  "event",
  "death",
  "quote",
  "vehicle",
  "weapon",
  "drug",
  "object",
  "symbol",
  "case",
]);
export type EntityType = z.infer<typeof entityTypeSchema>;

export const relationshipKindSchema = z.enum([
  "friend",
  "enemy",
  "family",
  "partner",
  "business",
  "employer",
  "employee",
  "victim",
  "student",
  "ally",
  "rival",
]);
export type RelationshipKind = z.infer<typeof relationshipKindSchema>;

export const relationshipSchema = z.object({
  targetId: z.string(),
  kind: relationshipKindSchema,
  label: z.string().optional(),
});

export const spoilerMaxSeasonSchema = z.record(z.string(), z.number());

export const baseEntitySchema = z.object({
  id: z.string(),
  type: entityTypeSchema,
  slug: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  series: z.array(seriesSchema).default([]),
  tags: z.array(z.string()).default([]),
  relatedIds: z.array(z.string()).default([]),
  spoilerMaxSeason: spoilerMaxSeasonSchema.optional(),
  addedAt: z.string().optional(),
});

export const characterStatsSchema = z.object({
  kills: z.number().optional(),
  moneyEarned: z.number().optional(),
  netWorth: z.number().optional(),
  intelligence: z.number().min(0).max(10).optional(),
  manipulation: z.number().min(0).max(10).optional(),
  chemistry: z.number().min(0).max(10).optional(),
  combat: z.number().min(0).max(10).optional(),
  leadership: z.number().min(0).max(10).optional(),
});

export const lifeEventSchema = z.object({
  year: z.number(),
  label: z.string(),
  entityId: z.string().optional(),
});

export const killRecordSchema = z.object({
  victimId: z.string(),
  method: z.string(),
  episodeId: z.string(),
  reason: z.string().optional(),
});

export const evolutionStageSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
});

export const characterSchema = baseEntitySchema.extend({
  type: z.literal("character"),
  name: z.string(),
  nicknames: z.array(z.string()).default([]),
  status: z.enum(["alive", "deceased", "unknown"]).default("unknown"),
  occupation: z.string().optional(),
  appearsIn: z.array(seriesSchema).default([]),
  firstAppearance: z.string().optional(),
  lastAppearance: z.string().optional(),
  age: z.number().optional(),
  residence: z.string().optional(),
  portraitColor: z.string().default("#2d5016"),
  relationships: z.array(relationshipSchema).default([]),
  aliases: z.array(z.string()).default([]),
  organizationIds: z.array(z.string()).default([]),
  businessIds: z.array(z.string()).default([]),
  crimes: z.array(z.string()).default([]),
  kills: z.array(killRecordSchema).default([]),
  quoteIds: z.array(z.string()).default([]),
  episodeIds: z.array(z.string()).default([]),
  mentionedInEpisodeIds: z.array(z.string()).default([]),
  trivia: z.array(z.string()).default([]),
  stats: characterStatsSchema.optional(),
  lifeEvents: z.array(lifeEventSchema).default([]),
  evolutionStages: z.array(evolutionStageSchema).default([]),
  familyIds: z.array(z.string()).default([]),
  biographyMdx: z.string().optional(),
});

export const sceneBeatSchema = z.object({
  timestamp: z.string(),
  label: z.string(),
  description: z.string().optional(),
});

export const episodeSchema = baseEntitySchema.extend({
  type: z.literal("episode"),
  code: z.string(),
  season: z.number(),
  episodeNumber: z.number(),
  runtime: z.number().optional(),
  director: z.string().optional(),
  writer: z.string().optional(),
  imdbRating: z.number().optional(),
  synopsis: z.string().optional(),
  characterIds: z.array(z.string()).default([]),
  deathIds: z.array(z.string()).default([]),
  locationIds: z.array(z.string()).default([]),
  quoteIds: z.array(z.string()).default([]),
  objectIds: z.array(z.string()).default([]),
  timelineYear: z.number().optional(),
  references: z.array(z.string()).default([]),
  callbacks: z.array(z.string()).default([]),
  foreshadowing: z.array(z.string()).default([]),
  continuity: z.array(z.string()).default([]),
  behindTheScenes: z.array(z.string()).default([]),
  bestScenes: z.array(z.string()).default([]),
  sceneTimeline: z.array(sceneBeatSchema).default([]),
  consequences: z.array(z.string()).default([]),
});

export const locationSchema = baseEntitySchema.extend({
  type: z.literal("location"),
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional(),
  history: z.array(z.string()).default([]),
  eventIds: z.array(z.string()).default([]),
  characterIds: z.array(z.string()).default([]),
  episodeIds: z.array(z.string()).default([]),
  organizationIds: z.array(z.string()).default([]),
});

export const organizationSchema = baseEntitySchema.extend({
  type: z.literal("organization"),
  memberIds: z.array(z.string()).default([]),
  businessIds: z.array(z.string()).default([]),
  locationIds: z.array(z.string()).default([]),
  eventIds: z.array(z.string()).default([]),
  history: z.array(z.string()).default([]),
  timelineEvents: z.array(lifeEventSchema).default([]),
  parentOrgId: z.string().optional(),
  hierarchyOrder: z.number().optional(),
});

export const businessSchema = baseEntitySchema.extend({
  type: z.literal("business"),
  ownerIds: z.array(z.string()).default([]),
  employeeIds: z.array(z.string()).default([]),
  locationId: z.string().optional(),
  history: z.array(z.string()).default([]),
  timelineEvents: z.array(lifeEventSchema).default([]),
});

export const eventSchema = baseEntitySchema.extend({
  type: z.literal("event"),
  year: z.number(),
  participantIds: z.array(z.string()).default([]),
  locationId: z.string().optional(),
  episodeId: z.string().optional(),
});

export const deathSchema = baseEntitySchema.extend({
  type: z.literal("death"),
  victimId: z.string(),
  killerId: z.string().optional(),
  weaponId: z.string().optional(),
  episodeId: z.string(),
  method: z.string(),
  reason: z.string().optional(),
  accidental: z.boolean().default(false),
  suicide: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const quoteSchema = baseEntitySchema.extend({
  type: z.literal("quote"),
  text: z.string(),
  speakerId: z.string(),
  episodeId: z.string(),
  context: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const vehicleSchema = baseEntitySchema.extend({
  type: z.literal("vehicle"),
  ownerId: z.string().optional(),
  episodeIds: z.array(z.string()).default([]),
  history: z.array(z.string()).default([]),
});

export const weaponSchema = baseEntitySchema.extend({
  type: z.literal("weapon"),
  usageHistory: z.array(z.string()).default([]),
  episodeIds: z.array(z.string()).default([]),
});

export const drugSchema = baseEntitySchema.extend({
  type: z.literal("drug"),
  chemicalNotes: z.string().optional(),
  episodeIds: z.array(z.string()).default([]),
});

export const objectSchema = baseEntitySchema.extend({
  type: z.literal("object"),
  meaning: z.string().optional(),
  symbolism: z.string().optional(),
  episodeIds: z.array(z.string()).default([]),
  timelineEvents: z.array(lifeEventSchema).default([]),
});

export const symbolSchema = baseEntitySchema.extend({
  type: z.literal("symbol"),
  color: z.string().optional(),
  appearances: z.array(z.string()).default([]),
});

export const caseSchema = baseEntitySchema.extend({
  type: z.literal("case"),
  clientIds: z.array(z.string()).default([]),
  lawyerIds: z.array(z.string()).default([]),
  locationId: z.string().optional(),
  outcome: z.string().optional(),
});

export const entitySchema = z.discriminatedUnion("type", [
  characterSchema,
  episodeSchema,
  locationSchema,
  organizationSchema,
  businessSchema,
  eventSchema,
  deathSchema,
  quoteSchema,
  vehicleSchema,
  weaponSchema,
  drugSchema,
  objectSchema,
  symbolSchema,
  caseSchema,
]);

export type Entity = z.infer<typeof entitySchema>;
export type Character = z.infer<typeof characterSchema>;
export type Episode = z.infer<typeof episodeSchema>;
export type Location = z.infer<typeof locationSchema>;
export type Organization = z.infer<typeof organizationSchema>;
export type Business = z.infer<typeof businessSchema>;
export type Death = z.infer<typeof deathSchema>;
export type Quote = z.infer<typeof quoteSchema>;

export function entityHref(entity: Entity): string {
  switch (entity.type) {
    case "character":
      return `/characters/${entity.slug}`;
    case "episode":
      return `/episodes/${entity.series[0] ?? "breaking-bad"}/${entity.slug}`;
    case "location":
      return `/locations/${entity.slug}`;
    case "organization":
      return `/organizations/${entity.slug}`;
    case "business":
      return `/businesses/${entity.slug}`;
    case "death":
      return `/deaths/${entity.slug}`;
    case "quote":
      return `/quotes/${entity.slug}`;
    case "vehicle":
      return `/vehicles/${entity.slug}`;
    case "weapon":
      return `/weapons/${entity.slug}`;
    case "drug":
      return `/drugs/${entity.slug}`;
    case "object":
      return `/objects/${entity.slug}`;
    case "symbol":
      return `/symbolism/${entity.slug}`;
    case "event":
      return `/events/${entity.slug}`;
    case "case":
      return `/legal/${entity.slug}`;
  }
}
