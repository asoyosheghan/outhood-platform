import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { authenticate } from "@/middleware/auth.middleware";
import { authRateLimiter } from "@/middleware/rateLimiter.middleware";
import * as authController from "./auth.controller";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.validation";

const router = Router();

router.post("/register", authRateLimiter, validate({ body: registerSchema }), authController.register);
router.post("/login", authRateLimiter, validate({ body: loginSchema }), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);
router.post(
  "/forgot-password",
  authRateLimiter,
  validate({ body: forgotPasswordSchema }),
  authController.forgotPassword
);
router.post("/reset-password", validate({ body: resetPasswordSchema }), authController.resetPassword);

export default router;
