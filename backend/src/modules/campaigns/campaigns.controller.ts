import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import * as campaignsService from "./campaigns.service";

export const listCampaigns = asyncHandler(async (req: Request, res: Response) => {
  const result = await campaignsService.listCampaigns(req.query as any);
  res.status(200).json({ success: true, ...result });
});

export const getCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await campaignsService.getCampaignBySlug(req.params.slug);
  res.status(200).json({ success: true, campaign });
});

export const createCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await campaignsService.createCampaign(req.user!.id, req.body);
  res.status(201).json({ success: true, campaign });
});

export const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await campaignsService.updateCampaign(req.params.id, req.body);
  res.status(200).json({ success: true, campaign });
});

export const deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
  await campaignsService.deleteCampaign(req.params.id);
  res.status(204).send();
});
