const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRawUnsafe(
    "DELETE FROM kendaraan"
  );

  console.log("Deleted rows:", result);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });