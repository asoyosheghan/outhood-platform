import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.status(200).json({ success: true, notifications });
  })
);

router.patch(
  "/:id/read",
  authenticate,
  asyncHandler(async (req, res) => {
    const notification = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!notification || notification.userId !== req.user!.id) {
      throw ApiError.notFound("Notification not found");
    }
    const updated = await prisma.notification.update({ where: { id: req.params.id }, data: { read: true } });
    res.status(200).json({ success: true, notification: updated });
  })
);

router.post(
  "/read-all",
  authenticate,
  asyncHandler(async (req, res) => {
    await prisma.notification.updateMany({ where: { userId: req.user!.id, read: false }, data: { read: true } });
    res.status(200).json({ success: true, message: "All notifications marked as read" });
  })
);

export default router;
