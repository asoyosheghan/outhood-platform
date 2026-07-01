import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "@prisma/client";
import { verifyAccessToken } from "@/utils/jwt";
import { ApiError } from "@/utils/ApiError";
import { prisma } from "@/config/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: UserRole; email: string };
    }
  }
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Missing or malformed authorization header");
    }

    const token = header.slice("Bearer ".length);
    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, email: true },
    });

    if (!user) {
      throw ApiError.unauthorized("User no longer exists");
    }

    req.user = user;
    next();
  } catch (err) {
    next(ApiError.unauthorized("Invalid or expired access token"));
  }
}

/** Allows a request to proceed whether or not a valid token is present, attaching req.user if so. */
export async function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();

  try {
    const payload = verifyAccessToken(header.slice("Bearer ".length));
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, email: true },
    });
    if (user) req.user = user;
  } catch {
    // Ignore invalid tokens on optional auth routes
  }
  next();
}

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized("Authentication required"));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden("You don't have permission to perform this action"));
    }
    next();
  };
}
