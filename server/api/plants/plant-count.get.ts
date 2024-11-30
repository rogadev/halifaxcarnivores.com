import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  try {
    const count = await prisma.plant.count({
      where: {
        isDiscontinued: false
      }
    });

    return { count };
  } catch (error) {
    console.error('Failed to fetch plant count:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch plant count'
    });
  } finally {
    await prisma.$disconnect();
  }
}); 
