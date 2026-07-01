import { z } from "zod";

const campaignStatusEnum = z.enum(["UPCOMING", "ACTIVE", "COMPLETED"]);

export const createCampaignSchema = z.object({
  title: z.string().min(3).max(140),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  summary: z.string().min(10).max(280),
  description: z.string().min(20),
  coverImage: z.string().url(),
  beneficiary: z.string().min(2),
  goalKes: z.number().int().positive(),
  status: campaignStatusEnum.optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial();

export const listCampaignsQuerySchema = z.object({
  status: campaignStatusEnum.optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});
