import { PrismaClient } from '@prisma/client';

/**
 * Fetches a paginated list of plants with optional filtering capabilities.
 * 
 * @route GET /api/index
 * 
 * @queryParam {number} [page=1] - The page number for pagination
 * @queryParam {number} [limit=8] - Number of items per page
 * @queryParam {boolean} [published] - Filter by publication status
 *    - If true, returns only published plants
 *    - If false, returns only unpublished plants
 *    - If omitted, returns both published and unpublished plants
 * @queryParam {boolean} [discontinued] - Filter by discontinuation status
 *    - If true, returns only discontinued plants
 *    - If false, returns only active plants
 *    - If omitted, returns both discontinued and active plants
 * 
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *    - data: Array of plant objects, each containing:
 *      - id: number
 *      - genus: string
 *      - species: string | null
 *      - cultivar: string | null
 *      - variety: string | null
 *      - sizeOrVariant: string | null
 *      - displayName: string
 *      - price: Decimal
 *      - previousPrice: Decimal | null
 *      - isPublished: boolean
 *      - isNewArrival: boolean
 *      - isDiscontinued: boolean
 *      - qtyAvailable: number
 *      - images: Array of related image objects, each containing:
 *        - url: string
 *        - isFeaturedImage: boolean
 * 
 * @example
 * // Fetch first page of published, non-discontinued plants
 * GET /api/index?page=1&limit=10&published=true&discontinued=false
 * 
 * @throws Will throw an error if database connection fails
 */
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 8;
  const skip = (page - 1) * limit;

  // New query parameters with optional filtering
  const publishedStatus = query.published?.toString().toLowerCase();
  const discontinuedStatus = query.discontinued?.toString().toLowerCase();

  try {
    // Build where clause dynamically
    const whereClause: any = {};

    // Handle published status
    if (publishedStatus === 'true') {
      whereClause.isPublished = true;
    } else if (publishedStatus === 'false') {
      whereClause.isPublished = false;
    }

    // Handle discontinued status
    if (discontinuedStatus === 'true') {
      whereClause.isDiscontinued = true;
    } else if (discontinuedStatus === 'false') {
      whereClause.isDiscontinued = false;
    }

    const plants = await prisma.plant.findMany({
      take: limit,
      skip,
      where: whereClause,
      include: {
        images: true
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });

    return {
      data: plants
    };
  } finally {
    await prisma.$disconnect();
  }
}); 
