import { z } from "zod";

export const initiateDonationSchema = z.object({
  campaignSlug: z.string().min(1),
  donorName: z.string().min(2).max(100),
  donorEmail: z.string().email(),
  amountKes: z.number().int().positive().max(10_000_000),
  method: z.enum(["MPESA", "CARD"]),
  phoneNumber: z
    .string()
    .regex(/^254[17]\d{8}$/, "Phone number must be in the format 2547XXXXXXXX")
    .optional(),
  message: z.string().max(500).optional(),
  anonymous: z.boolean().optional().default(false),
});

export const mpesaCallbackSchema = z.object({
  Body: z.object({
    stkCallback: z.object({
      MerchantRequestID: z.string(),
      CheckoutRequestID: z.string(),
      ResultCode: z.number(),
      ResultDesc: z.string(),
      CallbackMetadata: z
        .object({
          Item: z.array(z.object({ Name: z.string(), Value: z.union([z.string(), z.number()]) })),
        })
        .optional(),
    }),
  }),
});
