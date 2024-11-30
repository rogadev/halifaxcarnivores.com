import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/plants - Fetch plants with flexible querying options
 * 
 * Query Parameters:
 * - No parameters: Returns all plants
 * - limit: Returns first n plants (e.g., ?limit=10)
 * - skip & take: Returns paginated results (e.g., ?skip=10&take=5)
 * 
 * @example
 * // Get all plants
 * GET /api/plants
 * 
 * // Get first 10 plants
 * GET /api/plants?limit=10
 * 
 * // Get 5 plants starting from the 10th plant
 * GET /api/plants?skip=10&take=5
 * 
 * @returns {Object} 
 * {
 *   success: boolean,
 *   data: Plant[]
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { limit, skip, take } = query;

    // Base query options
    const queryOptions: any = {
      orderBy: {
        id: 'asc'
      }
    };

    // Handle pagination and limit scenarios
    if (limit) {
      queryOptions.take = parseInt(limit as string);
    } else if (skip && take) {
      queryOptions.skip = parseInt(skip as string);
      queryOptions.take = parseInt(take as string);
    }

    const plants = await prisma.plant.findMany(queryOptions);

    return {
      success: true,
      data: plants
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch plants'
    });
  }
});
