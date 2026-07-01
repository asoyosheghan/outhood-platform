import { z } from "zod";

const eventCategoryEnum = z.enum(["ROAD_TRIP", "SOCIAL", "CORPORATE", "COMMUNITY", "CHARITY"]);
const eventStatusEnum = z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]);

export const createEventSchema = z.object({
  title: z.string().min(3).max(140),
  slug: z
    .string()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  category: eventCategoryEnum,
  summary: z.string().min(10).max(280),
  description: z.string().min(20),
  coverImage: z.string().url(),
  location: z.string().min(2),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  priceKes: z.number().int().nonnegative().optional(),
  capacity: z.number().int().positive(),
  featured: z.boolean().optional(),
  status: eventStatusEnum.optional(),
});

export const updateEventSchema = createEventSchema.partial();

export const listEventsQuerySchema = z.object({
  category: eventCategoryEnum.optional(),
  status: eventStatusEnum.optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

export const slugParamSchema = z.object({ slug: z.string().min(1) });
export const idParamSchema = z.object({ id: z.string().uuid() });
