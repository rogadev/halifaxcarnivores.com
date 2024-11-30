import { PrismaClient, type Image } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get random featured image from the Image table using Prisma
    const image = await prisma.image.findMany({
      where: {
        isFeaturedImage: true
      },
      orderBy: {
        id: 'asc'
      },
      take: 1,
      skip: Math.floor(Math.random() * await prisma.image.count({
        where: {
          isFeaturedImage: true
        }
      }))
    });

    if (!image[0]) {
      throw createError({
        statusCode: 404,
        message: 'No images found'
      });
    }

    return image[0];
  } catch (error) {
    console.error('Error fetching random image:', error);
    throw createError({
      statusCode: 500,
      message: 'Error fetching random image'
    });
  }
}); 
