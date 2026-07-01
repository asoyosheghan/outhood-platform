import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import type { Prisma } from "@prisma/client";

interface ListEventsParams {
  category?: string;
  status?: string;
  featured?: boolean;
  page: number;
  limit: number;
}

export async function listEvents(params: ListEventsParams) {
  const where: Prisma.EventWhereInput = {
    ...(params.category ? { category: params.category as any } : {}),
    status: (params.status as any) ?? "PUBLISHED",
    ...(params.featured !== undefined ? { featured: params.featured } : {}),
  };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      include: { _count: { select: { registrations: true } } },
    }),
    prisma.event.count({ where }),
  ]);

  return {
    events: events.map((e) => ({ ...e, registeredCount: e._count.registrations })),
    pagination: { page: params.page, limit: params.limit, total, totalPages: Math.ceil(total / params.limit) },
  };
}

export async function getEventBySlug(slug: string) {
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) throw ApiError.notFound("Event not found");
  return { ...event, registeredCount: event._count.registrations };
}

export async function createEvent(createdById: string, data: Prisma.EventUncheckedCreateInput) {
  const existing = await prisma.event.findUnique({ where: { slug: data.slug } });
  if (existing) throw ApiError.conflict("An event with this slug already exists");

  return prisma.event.create({ data: { ...data, createdById } });
}

export async function updateEvent(id: string, data: Prisma.EventUpdateInput) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) throw ApiError.notFound("Event not found");
  return prisma.event.update({ where: { id }, data });
}

export async function deleteEvent(id: string) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) throw ApiError.notFound("Event not found");
  await prisma.event.delete({ where: { id } });
}

export async function registerForEvent(eventId: string, userId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) throw ApiError.notFound("Event not found");
  if (event.status !== "PUBLISHED") throw ApiError.badRequest("This event is not open for registration");
  if (event._count.registrations >= event.capacity) throw ApiError.badRequest("This event is fully booked");

  const existing = await prisma.eventRegistration.findUnique({
    where: { eventId_userId: { eventId, userId } },
  });
  if (existing) throw ApiError.conflict("You're already registered for this event");

  return prisma.eventRegistration.create({
    data: {
      eventId,
      userId,
      status: event.priceKes ? "PENDING" : "CONFIRMED",
      paymentStatus: event.priceKes ? "UNPAID" : "UNPAID",
    },
  });
}

export async function listMyRegistrations(userId: string) {
  return prisma.eventRegistration.findMany({
    where: { userId },
    include: { event: true },
    orderBy: { registeredAt: "desc" },
  });
}

export async function cancelRegistration(eventId: string, userId: string) {
  const registration = await prisma.eventRegistration.findUnique({
    where: { eventId_userId: { eventId, userId } },
  });
  if (!registration) throw ApiError.notFound("Registration not found");

  await prisma.eventRegistration.update({
    where: { id: registration.id },
    data: { status: "CANCELLED" },
  });
}
