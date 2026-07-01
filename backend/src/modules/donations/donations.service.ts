import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import * as stripeService from "@/services/payment/stripe.service";
import * as mpesaService from "@/services/payment/mpesa.service";
import type { z } from "zod";
import type { initiateDonationSchema } from "./donations.validation";

type InitiateDonationInput = z.infer<typeof initiateDonationSchema>;

export async function initiateDonation(input: InitiateDonationInput, userId?: string) {
  const campaign = await prisma.campaign.findUnique({ where: { slug: input.campaignSlug } });
  if (!campaign) throw ApiError.notFound("Campaign not found");
  if (campaign.status !== "ACTIVE") throw ApiError.badRequest("This campaign is not currently accepting donations");

  const donation = await prisma.donation.create({
    data: {
      campaignId: campaign.id,
      userId,
      donorName: input.donorName,
      donorEmail: input.donorEmail,
      amountKes: input.amountKes,
      method: input.method,
      message: input.message,
      anonymous: input.anonymous,
      paymentStatus: "PENDING",
    },
  });

  if (input.method === "CARD") {
    const { clientSecret, paymentIntentId } = await stripeService.createPaymentIntent({
      amountKes: input.amountKes,
      metadata: { donationId: donation.id, campaignSlug: campaign.slug },
      receiptEmail: input.donorEmail,
    });

    await prisma.donation.update({ where: { id: donation.id }, data: { transactionRef: paymentIntentId } });

    return { donationId: donation.id, method: "CARD" as const, clientSecret };
  }

  // M-Pesa STK Push
  if (!input.phoneNumber) {
    throw ApiError.badRequest("A phone number is required for M-Pesa donations");
  }

  const { checkoutRequestId } = await mpesaService.initiateStkPush({
    phoneNumber: input.phoneNumber,
    amountKes: input.amountKes,
    accountReference: campaign.slug,
    transactionDesc: `Donation to ${campaign.title}`,
  });

  await prisma.donation.update({ where: { id: donation.id }, data: { transactionRef: checkoutRequestId } });

  return { donationId: donation.id, method: "MPESA" as const, checkoutRequestId };
}

/** Called from the M-Pesa callback route once Safaricom confirms the STK push outcome. */
export async function handleMpesaCallback(checkoutRequestId: string, success: boolean, mpesaReceiptNumber?: string) {
  const donation = await prisma.donation.findFirst({ where: { transactionRef: checkoutRequestId } });
  if (!donation) return; // Unknown transaction — log and ignore rather than throw, per M-Pesa callback contract

  await prisma.$transaction(async (tx) => {
    await tx.donation.update({
      where: { id: donation.id },
      data: {
        paymentStatus: success ? "PAID" : "FAILED",
        transactionRef: mpesaReceiptNumber ?? donation.transactionRef,
      },
    });

    if (success) {
      await tx.campaign.update({
        where: { id: donation.campaignId },
        data: { raisedKes: { increment: donation.amountKes } },
      });
    }
  });
}

/** Called from the Stripe webhook route once a PaymentIntent succeeds or fails. */
export async function handleStripeWebhookEvent(paymentIntentId: string, succeeded: boolean) {
  const donation = await prisma.donation.findFirst({ where: { transactionRef: paymentIntentId } });
  if (!donation) return;

  await prisma.$transaction(async (tx) => {
    await tx.donation.update({
      where: { id: donation.id },
      data: { paymentStatus: succeeded ? "PAID" : "FAILED" },
    });

    if (succeeded) {
      await tx.campaign.update({
        where: { id: donation.campaignId },
        data: { raisedKes: { increment: donation.amountKes } },
      });
    }
  });
}

export async function listMyDonations(userId: string) {
  return prisma.donation.findMany({
    where: { userId },
    include: { campaign: { select: { title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}
