import { z } from "zod";
import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";

const applicationSchema = z.object({
  roleApplied: z.string().min(2).max(80),
  motivation: z.string().min(20).max(1000),
});

const reviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
});

const router = Router();

// Community groups (read-only directory for now)
router.get(
  "/groups",
  asyncHandler(async (_req, res) => {
    const groups = await prisma.communityGroup.findMany({ orderBy: { memberCount: "desc" } });
    res.status(200).json({ success: true, groups });
  })
);

// Volunteer / membership applications
router.post(
  "/applications",
  authenticate,
  validate({ body: applicationSchema }),
  asyncHandler(async (req, res) => {
    const application = await prisma.communityApplication.create({
      data: { ...req.body, userId: req.user!.id },
    });
    res.status(201).json({ success: true, application });
  })
);

router.get(
  "/applications",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (req, res) => {
    const applications = await prisma.communityApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    });
    res.status(200).json({ success: true, applications });
  })
);

router.patch(
  "/applications/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate({ body: reviewSchema }),
  asyncHandler(async (req, res) => {
    const application = await prisma.communityApplication.findUnique({ where: { id: req.params.id } });
    if (!application) throw ApiError.notFound("Application not found");

    const updated = await prisma.communityApplication.update({
      where: { id: req.params.id },
      data: { status: req.body.status, reviewedById: req.user!.id, reviewedAt: new Date() },
    });

    if (req.body.status === "APPROVED") {
      await prisma.user.update({ where: { id: application.userId }, data: { role: "VOLUNTEER" } });
    }

    res.status(200).json({ success: true, application: updated });
  })
);

export default router;
