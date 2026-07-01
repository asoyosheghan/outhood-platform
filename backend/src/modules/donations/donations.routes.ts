import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { authenticate, optionalAuthenticate } from "@/middleware/auth.middleware";
import * as donationsController from "./donations.controller";
import { initiateDonationSchema } from "./donations.validation";

const router = Router();

// Donations can be made by guests or logged-in members
router.post(
  "/",
  optionalAuthenticate,
  validate({ body: initiateDonationSchema }),
  donationsController.initiateDonation
);

router.get("/me", authenticate, donationsController.listMyDonations);

// Payment provider webhooks — M-Pesa callback is JSON and fine here.
// NOTE: the Stripe webhook is intentionally NOT mounted here — it requires the raw
// request body for signature verification and is wired directly in app.ts, ahead of
// the global express.json() middleware. See app.ts for details.
router.post("/mpesa/callback", donationsController.mpesaCallback);

export default router;
