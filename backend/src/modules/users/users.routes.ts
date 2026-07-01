import { z } from "zod";
import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";

// ── Validation ──────────────────────────────────
const updateProfileSchema = z.object({
  firstName: z.string().min(2).max(60).optional(),
  lastName: z.string().min(2).max(60).optional(),
  phone: z.string().min(7).max(20).optional(),
  bio: z.string().max(500).optional(),
  county: z.string().max(60).optional(),
  avatarUrl: z.string().url().optional(),
});

const updateRoleSchema = z.object({
  role: z.enum(["GUEST", "MEMBER", "VOLUNTEER", "ORGANIZER", "ADMIN", "SUPER_ADMIN"]),
});

const listUsersQuerySchema = z.object({
  role: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(25),
});

// ── Service ──────────────────────────────────────
function publicUser(user: Record<string, unknown> & { passwordHash: string }) {
  const { passwordHash, ...rest } = user;
  return rest;
}

async function updateOwnProfile(userId: string, data: z.infer<typeof updateProfileSchema>) {
  const user = await prisma.user.update({ where: { id: userId }, data });
  return publicUser(user);
}

async function listUsers(params: { role?: string; page: number; limit: number }) {
  const where = params.role ? { role: params.role as any } : {};
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    }),
    prisma.user.count({ where }),
  ]);
  return { users: users.map(publicUser), pagination: { page: params.page, limit: params.limit, total } };
}

async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw ApiError.notFound("User not found");
  return publicUser(user);
}

async function updateUserRole(id: string, role: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw ApiError.notFound("User not found");
  const updated = await prisma.user.update({ where: { id }, data: { role: role as any } });
  return publicUser(updated);
}

async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw ApiError.notFound("User not found");
  await prisma.user.delete({ where: { id } });
}

// ── Routes ───────────────────────────────────────
const router = Router();

router.patch(
  "/me",
  authenticate,
  validate({ body: updateProfileSchema }),
  asyncHandler(async (req, res) => {
    const user = await updateOwnProfile(req.user!.id, req.body);
    res.status(200).json({ success: true, user });
  })
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate({ query: listUsersQuerySchema }),
  asyncHandler(async (req, res) => {
    const result = await listUsers(req.query as any);
    res.status(200).json({ success: true, ...result });
  })
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).json({ success: true, user });
  })
);

router.patch(
  "/:id/role",
  authenticate,
  authorize("SUPER_ADMIN"),
  validate({ body: updateRoleSchema }),
  asyncHandler(async (req, res) => {
    const user = await updateUserRole(req.params.id, req.body.role);
    res.status(200).json({ success: true, user });
  })
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  asyncHandler(async (req, res) => {
    await deleteUser(req.params.id);
    res.status(204).send();
  })
);

export default router;
