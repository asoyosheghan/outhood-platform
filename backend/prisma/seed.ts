import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@outhood.africa" },
    update: {},
    create: {
      firstName: "Outhood",
      lastName: "Admin",
      email: "admin@outhood.africa",
      passwordHash,
      role: "SUPER_ADMIN",
      membershipStatus: "ACTIVE",
    },
  });

  await prisma.campaign.upsert({
    where: { slug: "watoto-wa-tumaini-roof-repair" },
    update: {},
    create: {
      slug: "watoto-wa-tumaini-roof-repair",
      title: "Watoto Wa Tumaini Roof Repair",
      summary: "Replacing a leaking roof before the long rains reach 42 children at this Nairobi home.",
      description:
        "Watoto Wa Tumaini Children's Home has a severely damaged roof that leaks heavily during the rainy season. This campaign funds full roof replacement and minor structural repairs.",
      coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80",
      beneficiary: "Watoto Wa Tumaini Children's Home",
      goalKes: 850000,
      raisedKes: 612000,
      status: "ACTIVE",
      createdById: admin.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "lake-naivasha-sunrise-trip" },
    update: {},
    create: {
      slug: "lake-naivasha-sunrise-trip",
      title: "Lake Naivasha Sunrise Road Trip",
      category: "ROAD_TRIP",
      summary: "A two-day escape with kayaking, a bonfire night, and a sunrise hike over the escarpment.",
      description:
        "Pack your bag and join the convoy out of Nairobi for a weekend at Lake Naivasha. All transport, camping gear, and meals included.",
      coverImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=900&q=80",
      location: "Lake Naivasha, Nakuru County",
      startDate: new Date("2026-07-18"),
      endDate: new Date("2026-07-19"),
      priceKes: 6500,
      capacity: 40,
      featured: true,
      status: "PUBLISHED",
      createdById: admin.id,
    },
  });

  console.log("Seed complete. Admin login: admin@outhood.africa / ChangeMe123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
