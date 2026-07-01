import { z } from "zod";
import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";
import { authRateLimiter } from "@/middleware/rateLimiter.middleware";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(160),
  message: z.string().min(20).max(2000),
});

const router = Router();

router.post(
  "/",
  authRateLimiter,
  validate({ body: contactSchema }),
  asyncHandler(async (req, res) => {
    const message = await prisma.contactMessage.create({ data: req.body });
    // In production: trigger a Resend email notification to the team inbox here.
    res.status(201).json({ success: true, message: "Message sent successfully", id: message.id });
  })
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (_req, res) => {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json({ success: true, messages });
  })
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate({ body: z.object({ status: z.enum(["NEW", "READ", "RESPONDED"]) }) }),
  asyncHandler(async (req, res) => {
    const message = await prisma.contactMessage.findUnique({ where: { id: req.params.id } });
    if (!message) throw ApiError.notFound("Message not found");
    const updated = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    res.status(200).json({ success: true, message: updated });
  })
);

export default router;
