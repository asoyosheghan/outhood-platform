import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import type { Prisma } from "@prisma/client";

export async function listCampaigns(params: { status?: string; page: number; limit: number }) {
  const where: Prisma.CampaignWhereInput = params.status ? { status: params.status as any } : {};

  const [campaigns, total] = await Promise.all([
    prisma.campaign.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    }),
    prisma.campaign.count({ where }),
  ]);

  return { campaigns, pagination: { page: params.page, limit: params.limit, total } };
}

export async function getCampaignBySlug(slug: string) {
  const campaign = await prisma.campaign.findUnique({ where: { slug } });
  if (!campaign) throw ApiError.notFound("Campaign not found");
  return campaign;
}

export async function createCampaign(createdById: string, data: Prisma.CampaignUncheckedCreateInput) {
  const existing = await prisma.campaign.findUnique({ where: { slug: data.slug } });
  if (existing) throw ApiError.conflict("A campaign with this slug already exists");
  return prisma.campaign.create({ data: { ...data, createdById } });
}

export async function updateCampaign(id: string, data: Prisma.CampaignUpdateInput) {
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) throw ApiError.notFound("Campaign not found");
  return prisma.campaign.update({ where: { id }, data });
}

export async function deleteCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) throw ApiError.notFound("Campaign not found");
  await prisma.campaign.delete({ where: { id } });
}
