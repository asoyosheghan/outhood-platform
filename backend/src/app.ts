import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "@/config/env";
import { apiRateLimiter } from "@/middleware/rateLimiter.middleware";
import { errorHandler, notFoundHandler } from "@/middleware/error.middleware";
import { stripeWebhook } from "@/modules/donations/donations.controller";
import apiRoutes from "@/routes";

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: env.isProduction ? undefined : false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [env.clientUrl, "http://localhost:3000"];
      const isVercelPreview = /^https:\/\/outhood-platform-[a-z0-9]+-shevin-tech\.vercel\.app$/.test(origin || "");

      if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(compression());
app.use(morgan(env.isProduction ? "combined" : "dev"));
app.use(cookieParser());

// Stripe webhook MUST receive the raw request body (for signature verification),
// so it's mounted here, before the global JSON body parser below.
app.post(`${env.apiBasePath}/donations/stripe/webhook`, express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(env.apiBasePath, apiRateLimiter, apiRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "Outhood API is running", docs: `${env.apiBasePath}/health` });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
