import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import * as campaignsController from "./campaigns.controller";
import { createCampaignSchema, updateCampaignSchema, listCampaignsQuerySchema } from "./campaigns.validation";

const router = Router();

router.get("/", validate({ query: listCampaignsQuerySchema }), campaignsController.listCampaigns);
router.get("/:slug", campaignsController.getCampaign);

router.post(
  "/",
  authenticate,
  authorize("ORGANIZER", "ADMIN", "SUPER_ADMIN"),
  validate({ body: createCampaignSchema }),
  campaignsController.createCampaign
);
router.patch(
  "/:id",
  authenticate,
  authorize("ORGANIZER", "ADMIN", "SUPER_ADMIN"),
  validate({ body: updateCampaignSchema }),
  campaignsController.updateCampaign
);
router.delete("/:id", authenticate, authorize("ADMIN", "SUPER_ADMIN"), campaignsController.deleteCampaign);

export default router;
