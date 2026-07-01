import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import * as donationsService from "./donations.service";
import * as stripeService from "@/services/payment/stripe.service";
import * as mpesaService from "@/services/payment/mpesa.service";

export const initiateDonation = asyncHandler(async (req: Request, res: Response) => {
  const result = await donationsService.initiateDonation(req.body, req.user?.id);
  res.status(201).json({ success: true, ...result });
});

export const listMyDonations = asyncHandler(async (req: Request, res: Response) => {
  const donations = await donationsService.listMyDonations(req.user!.id);
  res.status(200).json({ success: true, donations });
});

/** Safaricom POSTs here once an STK push is accepted/declined/cancelled by the donor. */
export const mpesaCallback = asyncHandler(async (req: Request, res: Response) => {
  const parsed = mpesaService.parseStkCallback(req.body);
  await donationsService.handleMpesaCallback(parsed.checkoutRequestId, parsed.success, parsed.mpesaReceiptNumber);

  // Safaricom expects this exact acknowledgement shape regardless of outcome
  res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
});

/** Stripe webhook — verifies signature before trusting the payload. */
export const stripeWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  const event = stripeService.constructWebhookEvent(req.body, signature);

  if (event.type === "payment_intent.succeeded" || event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as { id: string };
    await donationsService.handleStripeWebhookEvent(intent.id, event.type === "payment_intent.succeeded");
  }

  res.status(200).json({ received: true });
});
