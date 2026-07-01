import { z } from "zod";
import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validate.middleware";

const createPostSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10).max(300),
  content: z.string().min(50),
  coverImage: z.string().url(),
  category: z.string().min(2),
  readingTimeMinutes: z.number().int().positive().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

const updatePostSchema = createPostSchema.partial();

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { firstName: true, lastName: true, avatarUrl: true } } },
    });
    res.status(200).json({ success: true, posts });
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { firstName: true, lastName: true, avatarUrl: true } } },
    });
    if (!post) throw ApiError.notFound("Post not found");
    res.status(200).json({ success: true, post });
  })
);

router.post(
  "/",
  authenticate,
  authorize("ORGANIZER", "ADMIN", "SUPER_ADMIN"),
  validate({ body: createPostSchema }),
  asyncHandler(async (req, res) => {
    const existing = await prisma.blogPost.findUnique({ where: { slug: req.body.slug } });
    if (existing) throw ApiError.conflict("A post with this slug already exists");

    const post = await prisma.blogPost.create({
      data: {
        ...req.body,
        authorId: req.user!.id,
        publishedAt: req.body.status === "PUBLISHED" ? new Date() : null,
      },
    });
    res.status(201).json({ success: true, post });
  })
);

router.patch(
  "/:id",
  authenticate,
  authorize("ORGANIZER", "ADMIN", "SUPER_ADMIN"),
  validate({ body: updatePostSchema }),
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!post) throw ApiError.notFound("Post not found");

    const data = { ...req.body } as Record<string, unknown>;
    if (req.body.status === "PUBLISHED" && post.status !== "PUBLISHED") {
      data.publishedAt = new Date();
    }

    const updated = await prisma.blogPost.update({ where: { id: req.params.id }, data });
    res.status(200).json({ success: true, post: updated });
  })
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!post) throw ApiError.notFound("Post not found");
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.status(204).send();
  })
);

export default router;
