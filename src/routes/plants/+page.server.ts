import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { Plant } from '@prisma/client';

export const load: PageServerLoad = async () => {
  try {
    const plants = await prisma.plant.findMany({
      where: {
        isPublished: true,
        isDiscontinued: false
      }
    });

    // Convert Decimal fields to numbers for serialization
    const serializedPlants = plants.map(plant => ({
      ...plant,
      price: plant.price ? Number(plant.price) : null,
      salePrice: plant.salePrice ? Number(plant.salePrice) : null,
    }));

    return {
      plants: serializedPlants
    };
  } catch (e) {
    error(500, (e as Error).message);
  }
}; 
