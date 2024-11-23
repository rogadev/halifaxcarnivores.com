import { prisma } from '$lib/server/prisma';
import type { Plant } from '@prisma/client';
import type { DisplayedPlantItem } from '$lib/types';

export const load = async () => {
  const availablePlants = await prisma.plant.findMany({
    where: {
      isPublished: true,
      isDiscontinued: false,
      OR: [
        // Priority 1: Plants on sale with stock
        {
          isOnSale: true,
          qtyAvailable: { gt: 0 }
        },
        // Priority 2: Regular plants with stock
        {
          isOnSale: false,
          qtyAvailable: { gt: 0 }
        },
        // Priority 3: Plants being acclimated (coming soon)
        {
          qtyAcclimating: { gt: 0 }
        }
      ]
    },
    orderBy: [
      { isOnSale: 'desc' },
      { updatedAt: 'desc' },
      { popularityScore: 'desc' }
    ]
  });

  /** Combines plant taxonomic properties into a single name string */
  const extractName = (plant: Plant) => [plant.genus, plant.species, plant.cultivar, plant.variety]
    .filter(Boolean)
    .join(' ');

  const plants: DisplayedPlantItem[] = availablePlants.map((plant) => {
    return {
      id: plant.id,
      displayName: plant.displayName || extractName(plant),
      description: plant.description,
      featuredImage: plant.featuredImage,
      price: plant.price?.toNumber() ?? null,
      salePrice: plant.salePrice?.toNumber() ?? null,
      isOnSale: plant.isOnSale,
      isComingSoon: plant.qtyAvailable === 0 && plant.qtyAcclimating > 0,
      isNewItem: isNewArrival(plant.createdAt),
      size: plant.size,
      currentSize: plant.currentSize,
      qtyAvailable: plant.qtyAvailable
    };
  });

  return { plants };
};

/** Helper function to determine if a plant is a new arrival (within last 30 days) */
function isNewArrival(createdAt: Date): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return createdAt >= thirtyDaysAgo;
} 
