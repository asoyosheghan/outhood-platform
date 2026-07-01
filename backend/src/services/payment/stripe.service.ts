import Stripe from "stripe";
import { env } from "@/config/env";

const stripe = env.stripe.secretKey ? new Stripe(env.stripe.secretKey, { apiVersion: "2024-06-20" }) : null;

function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.");
  }
  return stripe;
}

/**
 * Creates a Stripe PaymentIntent for a donation or event registration.
 * Amount is expected in KES; Stripe requires the smallest currency unit, but KES has no
 * minor unit in Stripe's zero-decimal currency list, so we pass the amount as-is.
 */
export async function createPaymentIntent(params: {
  amountKes: number;
  metadata: Record<string, string>;
  receiptEmail?: string;
}) {
  const client = requireStripe();

  const intent = await client.paymentIntents.create({
    amount: params.amountKes,
    currency: "kes",
    metadata: params.metadata,
    receipt_email: params.receiptEmail,
    automatic_payment_methods: { enabled: true },
  });

  return { clientSecret: intent.client_secret, paymentIntentId: intent.id };
}

export function constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
  const client = requireStripe();
  return client.webhooks.constructEvent(rawBody, signature, env.stripe.webhookSecret);
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  const client = requireStripe();
  return client.paymentIntents.retrieve(paymentIntentId);
}
