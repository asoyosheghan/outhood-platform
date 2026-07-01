import { Router } from "express";
import { prisma } from "@/config/prisma";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate, authorize } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate, authorize("ADMIN", "SUPER_ADMIN"));

router.get(
  "/overview",
  asyncHandler(async (_req, res) => {
    const [totalUsers, activeEvents, activeCampaigns, totalRaisedAgg, unreadMessages, pendingApplications] =
      await Promise.all([
        prisma.user.count(),
        prisma.event.count({ where: { status: "PUBLISHED" } }),
        prisma.campaign.count({ where: { status: "ACTIVE" } }),
        prisma.campaign.aggregate({ _sum: { raisedKes: true } }),
        prisma.contactMessage.count({ where: { status: "NEW" } }),
        prisma.communityApplication.count({ where: { status: "PENDING" } }),
      ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeEvents,
        activeCampaigns,
        totalRaisedKes: totalRaisedAgg._sum.raisedKes ?? 0,
        unreadMessages,
        pendingApplications,
      },
    });
  })
);

export default router;
