import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import * as eventsService from "./events.service";

export const listEvents = asyncHandler(async (req: Request, res: Response) => {
  const result = await eventsService.listEvents(req.query as any);
  res.status(200).json({ success: true, ...result });
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await eventsService.getEventBySlug(req.params.slug);
  res.status(200).json({ success: true, event });
});

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await eventsService.createEvent(req.user!.id, req.body);
  res.status(201).json({ success: true, event });
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await eventsService.updateEvent(req.params.id, req.body);
  res.status(200).json({ success: true, event });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  await eventsService.deleteEvent(req.params.id);
  res.status(204).send();
});

export const registerForEvent = asyncHandler(async (req: Request, res: Response) => {
  const registration = await eventsService.registerForEvent(req.params.id, req.user!.id);
  res.status(201).json({ success: true, registration });
});

export const listMyRegistrations = asyncHandler(async (req: Request, res: Response) => {
  const registrations = await eventsService.listMyRegistrations(req.user!.id);
  res.status(200).json({ success: true, registrations });
});

export const cancelRegistration = asyncHandler(async (req: Request, res: Response) => {
  await eventsService.cancelRegistration(req.params.id, req.user!.id);
  res.status(200).json({ success: true, message: "Registration cancelled" });
});
