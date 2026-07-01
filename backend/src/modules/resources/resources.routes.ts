import { z } from "zod";
import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";

const createResourceSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(10).max(400),
  type: z.enum(["PDF", "GUIDE", "TEMPLATE"]),
  fileUrl: z.string().url(),
  fileSizeKb: z.number().int().positive(),
  category: z.string().min(2),
});

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json({ success: true, resources });
  })
);

router.post(
  "/:id/download",
  asyncHandler(async (req, res) => {
    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: { downloadCount: { increment: 1 } },
    });
    res.status(200).json({ success: true, fileUrl: resource.fileUrl });
  })
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate({ body: createResourceSchema }),
  asyncHandler(async (req, res) => {
    const resource = await prisma.resource.create({ data: req.body });
    res.status(201).json({ success: true, resource });
  })
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (req, res) => {
    const resource = await prisma.resource.findUnique({ where: { id: req.params.id } });
    if (!resource) throw ApiError.notFound("Resource not found");
    await prisma.resource.delete({ where: { id: req.params.id } });
    res.status(204).send();
  })
);

export default router;
