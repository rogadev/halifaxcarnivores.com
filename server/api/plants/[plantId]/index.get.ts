import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  try {
    const plantId = Number(getRouterParam(event, 'plantId'));

    if (isNaN(plantId)) {
      throw createError({
        statusCode: 400,
        message: 'Plant ID is required'
      });
    }

    const plant = await prisma.plant.findUnique({
      where: {
        id: plantId
      },
      include: {
        images: true
      }
    });

    if (!plant) {
      throw createError({
        statusCode: 404,
        message: 'Plant not found'
      });
    }

    return plant;
  } catch (error) {
    console.error('Error fetching plant:', error);
    throw createError({
      statusCode: 500,
      message: 'Error fetching plant'
    });
  } finally {
    await prisma.$disconnect();
  }
});
