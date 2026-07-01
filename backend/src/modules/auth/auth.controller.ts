import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { ApiError } from "@/utils/ApiError";
import * as authService from "./auth.service";

const REFRESH_COOKIE = "outhood_refresh_token";
const isProd = process.env.NODE_ENV === "production";

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/api/v1/auth",
  });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(req.body);
  setRefreshCookie(res, refreshToken);
  res.status(201).json({ success: true, user, accessToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
  setRefreshCookie(res, refreshToken);
  res.status(200).json({ success: true, user, accessToken });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE] || req.body.refreshToken;
  if (!token) throw ApiError.unauthorized("No refresh token provided");

  const { user, accessToken, refreshToken } = await authService.refreshAccessToken(token);
  setRefreshCookie(res, refreshToken);
  res.status(200).json({ success: true, user, accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE] || req.body.refreshToken;
  if (token) await authService.logoutUser(token);
  res.clearCookie(REFRESH_COOKIE, { path: "/api/v1/auth" });
  res.status(200).json({ success: true, message: "Logged out" });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getCurrentUser(req.user!.id);
  res.status(200).json({ success: true, user });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.requestPasswordReset(req.body.email);
  res.status(200).json({
    success: true,
    message: "If that email is registered, a reset link has been sent.",
  });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.newPassword);
  res.status(200).json({ success: true, message: "Password updated successfully." });
});
