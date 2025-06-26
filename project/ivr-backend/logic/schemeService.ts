import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchSchemes() {
  try {
    const schemes = await prisma.scheme.findMany();
    return schemes;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return [];
  }
}
