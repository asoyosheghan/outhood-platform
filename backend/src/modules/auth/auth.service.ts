import crypto from "crypto";
import { prisma } from "@/config/prisma";
import { hashPassword, comparePassword } from "@/utils/password";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@/utils/jwt";
import { ApiError } from "@/utils/ApiError";
import { env } from "@/config/env";
import type { z } from "zod";
import type { registerSchema, loginSchema } from "./auth.validation";

const REFRESH_EXPIRY_DAYS = 30;

function publicUser(user: { passwordHash: string; [key: string]: unknown }) {
  const { passwordHash, ...rest } = user;
  return rest;
}

async function issueTokenPair(userId: string, role: any) {
  const accessToken = signAccessToken({ sub: userId, role });
  const refreshToken = signRefreshToken(userId);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
}

export async function registerUser(input: z.infer<typeof registerSchema>) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw ApiError.conflict("An account with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
    },
  });

  const tokens = await issueTokenPair(user.id, user.role);
  return { user: publicUser(user), ...tokens };
}

export async function loginUser(input: z.infer<typeof loginSchema>) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isValid = await comparePassword(input.password, user.passwordHash);
  if (!isValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const tokens = await issueTokenPair(user.id, user.role);
  return { user: publicUser(user), ...tokens };
}

export async function refreshAccessToken(refreshToken: string) {
  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token expired or revoked");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    throw ApiError.unauthorized("User no longer exists");
  }

  // Rotate refresh token
  await prisma.refreshToken.delete({ where: { token: refreshToken } });
  const tokens = await issueTokenPair(user.id, user.role);

  return { user: publicUser(user), ...tokens };
}

export async function logoutUser(refreshToken: string) {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw ApiError.notFound("User not found");
  return publicUser(user);
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  // Always behave the same way whether or not the user exists, to avoid leaking registered emails
  if (!user) return;

  const resetToken = crypto.randomBytes(32).toString("hex");
  // In production: persist a hashed version of resetToken with an expiry on the user record
  // or a dedicated PasswordResetToken model, then email the raw token via Resend.
  console.log(`[DEV ONLY] Password reset token for ${email}: ${resetToken}`);
}

export async function resetPassword(token: string, newPassword: string) {
  // Placeholder: in production, look up the hashed token, verify expiry, and update the user.
  // Left intentionally explicit so this is implemented against a real token store before launch.
  throw ApiError.badRequest("Password reset is not yet wired to a persistent token store.");
}
