import app from "./app";
import { env } from "@/config/env";
import { prisma } from "@/config/prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log("✓ Database connected");

    app.listen(env.port, () => {
      console.log(`✓ Outhood API listening on port ${env.port} [${env.nodeEnv}]`);
      console.log(`  → http://localhost:${env.port}${env.apiBasePath}/health`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

main();
