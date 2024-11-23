import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { DisplayedPlantItem } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const plant = await prisma.plant.findUnique({
    where: {
      id: parseInt(params.id),
      isPublished: true,
      isDiscontinued: false
    }
  });

  if (!plant) {
    error(404, 'Plant not found');
  }

  const displayedPlant: DisplayedPlantItem = {
    id: plant.id,
    displayName: plant.displayName,
    description: plant.description,
    featuredImage: plant.featuredImage,
    price: plant.price?.toNumber() ?? null,
    salePrice: plant.salePrice?.toNumber() ?? null,
    isOnSale: plant.isOnSale,
    qtyAvailable: plant.qtyAvailable,
    careLight: plant.careLight,
    careWater: plant.careWater,
    careHumidity: plant.careHumidity,
    careTemperature: plant.careTemperature,
    size: plant.size,
    currentSize: plant.currentSize,
    maxSize: plant.maxSize,
    petFriendly: plant.petFriendly,
    // Derived fields
    isComingSoon: plant.qtyAvailable === 0 && plant.qtyAcclimating > 0,
    isNewItem: isNewArrival(plant.createdAt)
  };

  return {
    plant: displayedPlant
  };
};

/** Helper function to determine if a plant is a new arrival (within last 30 days) */
function isNewArrival(createdAt: Date): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return createdAt >= thirtyDaysAgo;
}


