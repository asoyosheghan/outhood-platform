import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes";
import userRoutes from "@/modules/users/users.routes";
import eventRoutes from "@/modules/events/events.routes";
import campaignRoutes from "@/modules/campaigns/campaigns.routes";
import donationRoutes from "@/modules/donations/donations.routes";
import resourceRoutes from "@/modules/resources/resources.routes";
import blogRoutes from "@/modules/blog/blog.routes";
import communityRoutes from "@/modules/community/community.routes";
import newsletterRoutes from "@/modules/newsletter/newsletter.routes";
import contactRoutes from "@/modules/contact/contact.routes";
import notificationRoutes from "@/modules/notifications/notifications.routes";
import adminRoutes from "@/modules/admin/admin.routes";

const router = Router();

router.get("/health", (_req, res) => res.status(200).json({ success: true, status: "ok" }));

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/donations", donationRoutes);
router.use("/resources", resourceRoutes);
router.use("/blog", blogRoutes);
router.use("/community", communityRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/contact", contactRoutes);
router.use("/notifications", notificationRoutes);
router.use("/admin", adminRoutes);

export default router;
