import { z } from "zod";
import { Router } from "express";
import { prisma } from "@/config/prisma";
import { asyncHandler } from "@/utils/asyncHandler";
import { validate } from "@/middleware/validate.middleware";
import { authenticate, authorize } from "@/middleware/auth.middleware";

const subscribeSchema = z.object({ email: z.string().email() });

const router = Router();

router.post(
  "/subscribe",
  validate({ body: subscribeSchema }),
  asyncHandler(async (req, res) => {
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: req.body.email },
      update: { unsubscribedAt: null },
      create: { email: req.body.email },
    });
    res.status(200).json({ success: true, subscriber });
  })
);

router.post(
  "/unsubscribe",
  validate({ body: subscribeSchema }),
  asyncHandler(async (req, res) => {
    await prisma.newsletterSubscriber.updateMany({
      where: { email: req.body.email },
      data: { unsubscribedAt: new Date() },
    });
    res.status(200).json({ success: true, message: "Unsubscribed successfully" });
  })
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (_req, res) => {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { unsubscribedAt: null },
      orderBy: { subscribedAt: "desc" },
    });
    res.status(200).json({ success: true, subscribers });
  })
);

export default router;
