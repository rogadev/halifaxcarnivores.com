import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  try {
    const plants = await prisma.plant.findMany({
      include: {
        images: true
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    console.log(plants[0].images.length);

    return plants;
  } finally {
    await prisma.$disconnect();
  }
}); 
