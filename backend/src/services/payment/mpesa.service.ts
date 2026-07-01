import axios from "axios";
import { env } from "@/config/env";

const BASE_URL =
  env.mpesa.env === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const credentials = Buffer.from(`${env.mpesa.consumerKey}:${env.mpesa.consumerSecret}`).toString("base64");

  const { data } = await axios.get(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (Number(data.expires_in) - 60) * 1000,
  };

  return cachedToken.token;
}

function timestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(
    now.getMinutes()
  )}${pad(now.getSeconds())}`;
}

/**
 * Initiates an STK Push (Lipa Na M-Pesa Online) request, prompting the donor's phone
 * to enter their M-Pesa PIN and confirm the payment.
 */
export async function initiateStkPush(params: {
  phoneNumber: string; // format: 2547XXXXXXXX
  amountKes: number;
  accountReference: string; // e.g. campaign slug or event slug
  transactionDesc: string;
}) {
  const accessToken = await getAccessToken();
  const ts = timestamp();
  const password = Buffer.from(`${env.mpesa.shortcode}${env.mpesa.passkey}${ts}`).toString("base64");

  const { data } = await axios.post(
    `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: env.mpesa.shortcode,
      Password: password,
      Timestamp: ts,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(params.amountKes),
      PartyA: params.phoneNumber,
      PartyB: env.mpesa.shortcode,
      PhoneNumber: params.phoneNumber,
      CallBackURL: env.mpesa.callbackUrl,
      AccountReference: params.accountReference,
      TransactionDesc: params.transactionDesc,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return {
    merchantRequestId: data.MerchantRequestID as string,
    checkoutRequestId: data.CheckoutRequestID as string,
    responseDescription: data.ResponseDescription as string,
  };
}

/** Shape of the payload Safaricom POSTs to MPESA_CALLBACK_URL once a customer completes/cancels STK push. */
export interface MpesaCallbackPayload {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: { Name: string; Value: string | number }[];
      };
    };
  };
}

export function parseStkCallback(payload: MpesaCallbackPayload) {
  const cb = payload.Body.stkCallback;
  const items = cb.CallbackMetadata?.Item ?? [];
  const get = (name: string) => items.find((i) => i.Name === name)?.Value;

  return {
    checkoutRequestId: cb.CheckoutRequestID,
    success: cb.ResultCode === 0,
    resultDescription: cb.ResultDesc,
    amount: get("Amount") as number | undefined,
    mpesaReceiptNumber: get("MpesaReceiptNumber") as string | undefined,
    phoneNumber: get("PhoneNumber") as string | undefined,
  };
}
