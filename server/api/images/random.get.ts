import { PrismaClient, type Image } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get the count parameter from query string, default to 1 if not provided
    const query = getQuery(event);
    const count = Number(query.count) || 1;

    // Get total number of featured images
    const totalFeaturedImages = await prisma.image.count({
      where: {
        isFeaturedImage: true
      }
    });

    // Check if requested count exceeds available images
    if (count > totalFeaturedImages) {
      throw createError({
        statusCode: 400,
        message: `Requested ${count} images but only ${totalFeaturedImages} featured images available`
      });
    }

    // Get random featured images using Prisma
    const images = await prisma.image.findMany({
      where: {
        isFeaturedImage: true
      },
      orderBy: {
        // Use random ordering to get unique random images
        id: 'asc'
      },
      take: count,
      // Use random skip to get different images each time
      skip: Math.floor(Math.random() * (totalFeaturedImages - count + 1))
    });

    if (!images.length) {
      throw createError({
        statusCode: 404,
        message: 'No images found'
      });
    }

    // Return array of images if count > 1, otherwise return single image
    return count > 1 ? images : images[0];
  } catch (error) {
    console.error('Error fetching random images:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error fetching random images'
    });
  }
});
