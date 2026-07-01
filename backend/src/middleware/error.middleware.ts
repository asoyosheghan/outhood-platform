import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError";
import { env } from "@/config/env";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  console.error("[Unhandled Error]", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong on our end. Please try again shortly.",
    ...(env.isProduction ? {} : { stack: err instanceof Error ? err.stack : undefined }),
  });
}
