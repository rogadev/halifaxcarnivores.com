import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
  const prisma = new PrismaClient();

  try {
    const stockCount = await prisma.plant.aggregate({
      _sum: {
        qtyAvailable: true
      },
      where: {
        qtyAvailable: {
          gt: 0
        }
      }
    });

    return {
      count: stockCount._sum.qtyAvailable ?? 0
    };
  } catch (error) {
    console.error('Error fetching stock count:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch stock count'
    });
  } finally {
    await prisma.$disconnect();
  }
}); 
